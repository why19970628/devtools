<template>
  <div class="tool-page">
    <div class="page-header">
      <h1>💳 微信支付 JSAPI 签名工具</h1>
      <p>根据 prepay_id 计算微信支付 JSAPI 调起支付参数 paySign (v2 SHA1)</p>
    </div>
    <div class="io-grid">
      <div class="io-item">
        <label>appId</label>
        <input v-model="appId" type="text" placeholder="wx 开头的 AppID" />
      </div>
      <div class="io-item">
        <label>prepay_id</label>
        <input v-model="prepayId" type="text" placeholder="wx2014... (prepay_id)" />
      </div>
      <div class="io-item">
        <label>API 密钥 (key, 32位)</label>
        <input v-model="apiKey" type="password" placeholder="商户平台设置的 API 密钥" />
      </div>
      <div class="io-item">
        <label>timestamp</label>
        <input v-model="timestamp" type="text" readonly />
      </div>
      <div class="io-item">
        <label>nonceStr (自动生成)</label>
        <input v-model="nonceStr" type="text" />
      </div>
      <div class="io-item">
        <label>package</label>
        <input :value="pkg" type="text" readonly />
      </div>
    </div>
    <div class="action-bar">
      <button class="btn btn-primary" @click="sign" :disabled="!appId || !prepayId || !apiKey">生成 paySign</button>
      <button class="btn" @click="copy" v-if="paySign">复制</button>
    </div>
    <div v-if="paySign" class="card">
      <div class="card-header"><span class="card-title">调起支付参数</span></div>
      <pre class="code-block">{{ resultJson }}</pre>
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'

const appId = ref('')
const prepayId = ref('')
const apiKey = ref('')
const nonceStr = ref(Math.random().toString(36).slice(2, 15))
const timestamp = ref(String(Math.floor(Date.now() / 1000)))
const paySign = ref('')

const pkg = computed(() => `prepay_id=${prepayId.value}`)

const resultJson = computed(() => JSON.stringify({
  appId: appId.value,
  timeStamp: timestamp.value,
  nonceStr: nonceStr.value,
  package: pkg.value,
  signType: 'MD5',
  paySign: paySign.value,
}, null, 2))

async function sign() {
  const str = `${appId.value}&${timestamp.value}&${nonceStr.value}&${pkg.value}&${apiKey.value}`
  const buf = await crypto.subtle.digest('SHA-1', new TextEncoder().encode(str))
  paySign.value = [...new Uint8Array(buf)].map(b => b.toString(16).padStart(2, '0')).join('').toUpperCase()
}

function copy() { navigator.clipboard.writeText(resultJson.value) }
</script>

<style scoped>

.page-header { margin-bottom: 20px; }
.page-header h1 { font-size: 22px; margin-bottom: 6px; }
.page-header p { color: var(--text-secondary); font-size: 13px; }
.io-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 12px; margin-bottom: 16px; }
.io-item { display: flex; flex-direction: column; gap: 4px; }
.io-item label { font-size: 12px; color: var(--text-secondary); }
.code-block { background: var(--bg-tertiary); padding: 14px; border-radius: var(--radius); font-family: monospace; font-size: 12px; white-space: pre-wrap; word-break: break-all; }
</style>
