<template>
  <div class="tool-page">
    <div class="page-header">
      <h1>🎟️ 微信卡券签名工具</h1>
      <p>根据 api_ticket 和卡券信息计算微信卡券 signature</p>
    </div>
    <div class="io-grid">
      <div class="io-item">
        <label>api_ticket</label>
        <input v-model="ticket" type="text" placeholder="输入 api_ticket" />
      </div>
      <div class="io-item">
        <label>card_id</label>
        <input v-model="cardId" type="text" placeholder="输入卡券 card_id" />
      </div>
      <div class="io-item">
        <label>timestamp</label>
        <input v-model="timestamp" type="text" readonly />
      </div>
      <div class="io-item">
        <label>nonce_str (自动生成)</label>
        <input v-model="nonce" type="text" />
      </div>
    </div>
    <div class="action-bar">
      <button class="btn btn-primary" @click="sign" :disabled="!ticket || !cardId">生成签名</button>
      <button class="btn" @click="copy" v-if="signature">复制</button>
    </div>
    <div v-if="signature" class="card">
      <div class="card-header"><span class="card-title">签名结果</span></div>
      <pre class="code-block">signature: {{ signature }}

card_id={{ cardId }}
nonce_str={{ nonce }}
timestamp={{ timestamp }}
api_ticket={{ ticket }}</pre>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'

const ticket = ref('')
const cardId = ref('')
const nonce = ref(Math.random().toString(36).slice(2, 15))
const timestamp = ref(String(Math.floor(Date.now() / 1000)))
const signature = ref('')

async function sha1(str) {
  const buf = await crypto.subtle.digest('SHA-1', new TextEncoder().encode(str))
  return [...new Uint8Array(buf)].map(b => b.toString(16).padStart(2, '0')).join('')
}

async function sign() {
  const str = `card_id=${cardId.value}&card_type=1&location_id=&nonce_str=${nonce.value}&timestamp=${timestamp.value}&api_ticket=${ticket.value}`
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
