<template>
  <div class="tool-page">
    <ToolHeader />
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
        <label>Access Token</label>
        <input v-model="accessToken" type="text" placeholder="输入 Access Token" class="full-input" />
      </div>
      <div class="config-item">
        <label>API 地址</label>
        <input v-model="apiUrl" type="text" placeholder="https://api.weibo.com/2/..." class="full-input" />
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

const appKey = ref('')
const appSecret = ref('')
const accessToken = ref('')
const apiUrl = ref('https://api.weibo.com/2/statuses/home_timeline.json')
const loading = ref(false)
const response = ref('')

async function callApi() {
  if (!apiUrl.value) return
  loading.value = true
  response.value = ''
  try {
    response.value = JSON.stringify({
      statuses: [],
      total_number: 0
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
