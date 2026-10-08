<template>
  <div class="tool-page">
    <div class="page-header">
      <h1>🔑 淘宝 OAuth2.0 测试工具</h1>
      <p>淘宝 OAuth2.0 授权流程在线调试</p>
    </div>
    <div class="config-grid">
      <div class="config-item">
        <label>App Key</label>
        <input v-model="appKey" type="text" placeholder="输入 App Key" class="full-input" />
      </div>
      <div class="config-item">
        <label>App Secret</label>
        <input v-model="appSecret" type="password" placeholder="输入 App Secret" class="full-input" />
      </div>
      <div class="config-item">
        <label>授权码 (Code)</label>
        <input v-model="code" type="text" placeholder="输入授权码" class="full-input" />
      </div>
      <div class="config-item">
        <label>回调地址</label>
        <input v-model="redirectUri" type="text" placeholder="https://example.com/callback" class="full-input" />
      </div>
    </div>
    <div class="action-bar">
      <button class="btn btn-primary" @click="getAccessToken" :disabled="loading">
        {{ loading ? '请求中...' : '获取 Access Token' }}
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

const appKey = ref('')
const appSecret = ref('')
const code = ref('')
const redirectUri = ref('https://example.com/callback')
const loading = ref(false)
const response = ref('')

async function getAccessToken() {
  if (!appKey.value || !code.value) return
  loading.value = true
  response.value = ''
  try {
    response.value = JSON.stringify({
      access_token: 'mock_access_token_' + Date.now(),
      expires_in: 2592000,
      refresh_token: 'mock_refresh_token_' + Date.now(),
      taobao_user_id: 'mock_user_id',
      taobao_user_nick: 'mock_user'
    }, null, 2)
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
