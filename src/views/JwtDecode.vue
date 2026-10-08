<template>
  <div class="tool-page">
    <div class="page-header">
      <h1>🎫 JWT 在线解码</h1>
      <p>JSON Web Token (JWT) 头部与 Payload 荷载高亮解析</p>
    </div>
    <div class="action-bar">
      <button class="btn btn-primary" @click="decode">解码</button>
      <button class="btn" @click="loadExample">加载示例</button>
    </div>
    <div v-if="error" class="error-msg">{{ error }}</div>
    <div v-if="header" class="jwt-sections">
      <div class="card">
        <div class="card-header"><span class="card-title">Header</span><span class="badge badge-info">头部</span></div>
        <pre class="code-block">{{ JSON.stringify(header, null, 2) }}</pre>
      </div>
      <div class="card" style="margin-top:12px">
        <div class="card-header"><span class="card-title">Payload</span><span class="badge badge-success">荷载</span></div>
        <pre class="code-block">{{ JSON.stringify(payload, null, 2) }}</pre>
      </div>
      <div class="card" style="margin-top:12px">
        <div class="card-header"><span class="card-title">Signature</span><span class="badge">签名</span></div>
        <pre class="code-block signature">{{ signature }}</pre>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'

const input = ref('')
const header = ref(null)
const payload = ref(null)
const signature = ref('')
const error = ref('')

function decode() {
  header.value = null
  payload.value = null
  signature.value = ''
  error.value = ''
  if (!input.value.trim()) { error.value = '请输入 JWT Token'; return }
  const parts = input.value.trim().split('.')
  if (parts.length !== 3) { error.value = 'JWT 格式错误，需要 3 段'; return }
  try {
    header.value = JSON.parse(atob(parts[0]))
    payload.value = JSON.parse(atob(parts[1]))
    signature.value = parts[2]
  } catch (e) { error.value = '解码失败: ' + e.message }
}

function loadExample() {
  input.value = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiaWF0IjoxNTE2MjM5MDIyfQ.SflKxwRJSMeKKF2QT4fwpMeJf36POk6yJV_adQssw5c'
  decode()
}
</script>

<style scoped>

.page-header { margin-bottom: 20px; }
.page-header h1 { font-size: 22px; margin-bottom: 6px; }
.page-header p { color: var(--text-secondary); font-size: 13px; }
.error-msg { color: var(--danger); padding: 10px; }
.code-block { background: var(--bg-tertiary); padding: 14px; border-radius: var(--radius); font-family: monospace; font-size: 13px; white-space: pre-wrap; word-break: break-all; }
.signature { color: var(--warning); }
</style>
