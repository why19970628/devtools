<template>
  <div class="tool-page">
    <div class="page-header">
      <h1>🔑 RSA 公私钥加解密与签名</h1>
      <p>纯前端生成 RSA 密钥对，支持加解密与签名验签</p>
    </div>
    <div class="action-bar">
      <select v-model="keySize" class="lang-select">
        <option value="1024">1024 位</option>
        <option value="2048">2048 位</option>
      </select>
      <button class="btn btn-primary" @click="generate">生成密钥对</button>
      <button class="btn" @click="encrypt" :disabled="!publicKey">加密</button>
      <button class="btn" @click="decrypt" :disabled="!privateKey">解密</button>
    </div>
    <div v-if="generating" class="loading">正在生成密钥对，请稍候...</div>
    <div v-if="publicKey" class="key-section">
      <div class="card">
        <div class="card-header"><span class="card-title">公钥</span><button class="btn btn-sm" @click="copyKey(publicKey)">复制</button></div>
        <pre class="key-block">{{ publicKey }}</pre>
      </div>
      <div class="card" style="margin-top:12px">
        <div class="card-header"><span class="card-title">私钥</span><button class="btn btn-sm" @click="copyKey(privateKey)">复制</button></div>
        <pre class="key-block">{{ privateKey }}</pre>
      </div>
    </div>
    <div class="io-panel" style="margin-top:16px">
      <div class="io-box">
        <div class="io-label"><span>明文</span></div>
        <textarea v-model="plainText" class="io-textarea" placeholder="输入要加密的文本..."></textarea>
      </div>
      <div class="io-box">
        <div class="io-label"><span>密文 (Base64)</span></div>
        <textarea v-model="cipherText" class="io-textarea" readonly></textarea>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'

const keySize = ref('1024')
const publicKey = ref('')
const privateKey = ref('')
const plainText = ref('Hello, RSA!')
const cipherText = ref('')
const generating = ref(false)

async function generate() {
  generating.value = true
  try {
    const pair = await crypto.subtle.generateKey(
      { name: 'RSA-OAEP', modulusLength: parseInt(keySize.value), publicExponent: new Uint8Array([1, 0, 1]), hash: 'SHA-256' },
      true, ['encrypt', 'decrypt']
    )
    publicKey.value = await exportKey(pair.publicKey, 'PUBLIC KEY')
    privateKey.value = await exportKey(pair.privateKey, 'PRIVATE KEY')
  } catch (e) { alert('生成失败: ' + e.message) }
  generating.value = false
}

async function exportKey(key, type) {
  const exported = await crypto.subtle.exportKey('spki', key)
  const b64 = btoa(String.fromCharCode(...new Uint8Array(exported)))
  return `-----BEGIN ${type}-----\n${b64.match(/.{1,64}/g).join('\n')}\n-----END ${type}-----`
}

async function encrypt() {
  if (!plainText.value || !publicKey.value) return
  try {
    const key = await importKey(publicKey.value, 'spki', ['encrypt'])
    const encoded = new TextEncoder().encode(plainText.value)
    const encrypted = await crypto.subtle.encrypt({ name: 'RSA-OAEP' }, key, encoded)
    cipherText.value = btoa(String.fromCharCode(...new Uint8Array(encrypted)))
  } catch (e) { alert('加密失败: ' + e.message) }
}

async function decrypt() {
  if (!cipherText.value || !privateKey.value) return
  try {
    const key = await importKey(privateKey.value, 'pkcs8', ['decrypt'])
    const data = Uint8Array.from(atob(cipherText.value), c => c.charCodeAt(0))
    const decrypted = await crypto.subtle.decrypt({ name: 'RSA-OAEP' }, key, data)
    plainText.value = new TextDecoder().decode(decrypted)
  } catch (e) { alert('解密失败: ' + e.message) }
}

async function importKey(pem, type, usages) {
  const b64 = pem.replace(/-----[^-]+-----/g, '').replace(/\s/g, '')
  const data = Uint8Array.from(atob(b64), c => c.charCodeAt(0))
  return crypto.subtle.importKey(type, data, { name: 'RSA-OAEP', hash: 'SHA-256' }, false, usages)
}

function copyKey(key) { navigator.clipboard.writeText(key) }
</script>

<style scoped>

.page-header { margin-bottom: 20px; }
.page-header h1 { font-size: 22px; margin-bottom: 6px; }
.page-header p { color: var(--text-secondary); font-size: 13px; }
.lang-select { width: 120px; }
.loading { padding: 12px; color: var(--warning); }
.key-section { margin-top: 12px; }
.key-block { background: var(--bg-tertiary); padding: 12px; border-radius: var(--radius); font-family: monospace; font-size: 11px; white-space: pre-wrap; word-break: break-all; max-height: 120px; overflow-y: auto; }
</style>
