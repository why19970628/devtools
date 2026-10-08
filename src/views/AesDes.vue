<template>
  <div class="tool-page">
    <div class="page-header">
      <h1>🔒 AES / DES 对称加解密</h1>
      <p>支持 AES、DES 算法，多种工作模式（CBC/ECB）与填充方式</p>
    </div>
    <div class="action-bar">
      <select v-model="algorithm" class="lang-select">
        <option value="AES">AES</option>
        <option value="DES">DES</option>
      </select>
      <select v-model="mode" class="lang-select">
        <option value="CBC">CBC</option>
        <option value="ECB">ECB</option>
      </select>
      <select v-model="action" class="lang-select">
        <option value="encrypt">加密</option>
        <option value="decrypt">解密</option>
      </select>
      <button class="btn btn-primary" @click="convert">执行</button>
      <button class="btn" @click="copyResult">复制结果</button>
    </div>
    <div class="config-row">
      <div class="config-item">
        <label>密钥</label>
        <input v-model="key" type="text" placeholder="输入密钥" class="config-input" />
      </div>
      <div class="config-item" v-if="mode === 'CBC'">
        <label>IV</label>
        <input v-model="iv" type="text" placeholder="输入 IV" class="config-input" />
      </div>
    </div>
    <div class="io-panel">
      <div class="io-box">
        <div class="io-label"><span>输入</span></div>
        <textarea v-model="input" class="io-textarea"></textarea>
      </div>
      <div class="io-box">
        <div class="io-label"><span>输出</span></div>
        <textarea v-model="output" class="io-textarea" readonly></textarea>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'

const algorithm = ref('AES')
const mode = ref('CBC')
const action = ref('encrypt')
const key = ref('')
const iv = ref('')
const input = ref('{"userId": 1001, "amount": 99.9, "note": "测试加密"}')
const output = ref('')

async function convert() {
  output.value = ''
  if (!input.value || !key.value) return
  try {
    const algo = algorithm.value === 'AES' ? 'AES-CBC' : 'DES-CBC'
    const keyData = new TextEncoder().encode(key.value.padEnd(algorithm.value === 'AES' ? 32 : 8, '0').slice(0, algorithm.value === 'AES' ? 32 : 8))
    const cryptoKey = await crypto.subtle.importKey('raw', keyData, algo, false, ['encrypt', 'decrypt'])
    if (action.value === 'encrypt') {
      const ivData = new TextEncoder().encode((iv.value || '0000000000000000').padEnd(16, '0').slice(0, 16))
      const encrypted = await crypto.subtle.encrypt({ name: algo, iv: ivData }, cryptoKey, new TextEncoder().encode(input.value))
      output.value = btoa(String.fromCharCode(...new Uint8Array(encrypted)))
    } else {
      const data = Uint8Array.from(atob(input.value), c => c.charCodeAt(0))
      const ivData = new TextEncoder().encode((iv.value || '0000000000000000').padEnd(16, '0').slice(0, 16))
      const decrypted = await crypto.subtle.decrypt({ name: algo, iv: ivData }, cryptoKey, data)
      output.value = new TextDecoder().decode(decrypted)
    }
  } catch (e) { output.value = '错误: ' + e.message }
}

function copyResult() { if (output.value) navigator.clipboard.writeText(output.value) }
</script>

<style scoped>

.page-header { margin-bottom: 20px; }
.page-header h1 { font-size: 22px; margin-bottom: 6px; }
.page-header p { color: var(--text-secondary); font-size: 13px; }
.lang-select { width: 100px; }
.config-row { display: flex; gap: 16px; margin-bottom: 12px; }
.config-item { display: flex; align-items: center; gap: 8px; }
.config-item label { font-size: 13px; color: var(--text-secondary); }
.config-input { width: 200px; }
</style>
