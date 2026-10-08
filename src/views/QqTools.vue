<template>
  <div class="tool-page">
    <div class="page-header">
      <h1>🐧 QQ 互联 API 调试工具</h1>
      <p>QQ 互联 API 在线调试</p>
    </div>
    <div class="config-grid">
      <div class="config-item">
        <label>App ID</label>
        <input v-model="appId" type="text" placeholder="输入 App ID" class="full-input" />
      </div>
      <div class="config-item">
        <label>Access Token</label>
        <input v-model="accessToken" type="text" placeholder="输入 Access Token" class="full-input" />
      </div>
      <div class="config-item">
        <label>OpenID</label>
        <input v-model="openId" type="text" placeholder="输入 OpenID" class="full-input" />
      </div>
      <div class="config-item">
        <label>API 地址</label>
        <input v-model="apiUrl" type="text" placeholder="https://graph.qq.com/..." class="full-input" />
      </div>
    </div>
    <div class="action-bar">
      <button class="btn btn-primary" @click="callApi" :disabled="loading">
        {{ loading ? '请求中...' : '发送请求' }}
      </button>
    </div>
    <div v-if="response" class="result-section">
      <div class="card">
        <div class="card-header"><span class="card-title">响应结果</span></div>
        <pre class="code-block">{{ response }}</pre>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'

const appId = ref('')
const accessToken = ref('')
const openId = ref('')
const apiUrl = ref('https://graph.qq.com/user/get_user_info')
const loading = ref(false)
const response = ref('')

async function callApi() {
  if (!apiUrl.value) return
  loading.value = true
  response.value = ''
  try {
    const url = new URL(apiUrl.value)
    url.searchParams.set('access_token', accessToken.value)
    url.searchParams.set('openid', openId.value)
    url.searchParams.set('oauth_consumer_key', appId.value)
    const res = await fetch(url.toString())
    const data = await res.json()
    response.value = JSON.stringify(data, null, 2)
  } catch (e) {
    response.value = '请求失败: ' + e.message
  }
  loading.value = false
}
</script>

<style scoped>

.page-header { margin-bottom: 20px; }
.page-header h1 { font-size: 22px; margin-bottom: 6px; }
.page-header p { color: var(--text-secondary); font-size: 13px; }
.config-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 12px; margin-bottom: 16px; }
.config-item { display: flex; flex-direction: column; gap: 4px; }
.config-item label { font-size: 12px; color: var(--text-secondary); }
.full-input { width: 100%; }
.result-section { margin-top: 16px; }
.code-block { background: var(--bg-tertiary); padding: 14px; border-radius: var(--radius); font-family: monospace; font-size: 12px; white-space: pre-wrap; max-height: 400px; overflow-y: auto; }
</style>
