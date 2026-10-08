<template>
  <div class="tool-page">
    <ToolHeader />
    <div class="io-grid">
      <div class="io-item">
        <label>jsapi_ticket</label>
        <input v-model="ticket" type="text" placeholder="输入 jsapi_ticket" />
      </div>
      <div class="io-item">
        <label>页面 URL (注意去掉 # 后内容)</label>
        <input v-model="url" type="text" placeholder="https://example.com/page" />
      </div>
      <div class="io-item">
        <label>noncestr (自动生成)</label>
        <input v-model="noncestr" type="text" />
      </div>
      <div class="io-item">
        <label>timestamp</label>
        <input v-model="timestamp" type="text" readonly />
      </div>
    </div>
    <div class="action-bar">
      <button class="btn btn-primary" @click="sign" :disabled="!ticket || !url">生成签名</button>
      <button class="btn" @click="copy" v-if="signature">复制</button>
    </div>
    <div v-if="signature" class="card">
      <div class="card-header"><span class="card-title">签名结果</span></div>
      <pre class="code-block">signature: {{ signature }}

jsapi_ticket={{ ticket }}
noncestr={{ noncestr }}
timestamp={{ timestamp }}
url={{ url }}</pre>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'

const ticket = ref('')
const url = ref('')
const noncestr = ref(Math.random().toString(36).slice(2, 15))
const timestamp = ref(String(Math.floor(Date.now() / 1000)))
const signature = ref('')

async function sha1(str) {
  const buf = await crypto.subtle.digest('SHA-1', new TextEncoder().encode(str))
  return [...new Uint8Array(buf)].map(b => b.toString(16).padStart(2, '0')).join('')
}

async function sign() {
  const str = `jsapi_ticket=${ticket.value}&noncestr=${noncestr.value}&timestamp=${timestamp.value}&url=${url.value}`
  signature.value = await sha1(str)
}

function copy() { navigator.clipboard.writeText(signature.value) }
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
