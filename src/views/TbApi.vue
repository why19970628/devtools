<template>
  <div class="tool-page">
    <div class="page-header">
      <h1>🛒 淘宝 API 测试工具</h1>
      <p>淘宝开放平台 API 在线测试</p>
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
        <label>API 名称</label>
        <input v-model="apiName" type="text" placeholder="如 taobao.item.get" class="full-input" />
      </div>
      <div class="config-item">
        <label>请求参数 (JSON)</label>
        <textarea v-model="params" class="io-textarea" placeholder='{"num_iid": "123456"}'></textarea>
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
const apiName = ref('taobao.item.get')
const params = ref('{\n  "num_iid": "123456",\n  "fields": "num_iid,title,price"\n}')
const loading = ref(false)
const response = ref('')

async function callApi() {
  if (!appKey.value || !apiName.value) return
  loading.value = true
  response.value = ''
  try {
    const queryParams = JSON.parse(params.value)
    const sortedKeys = Object.keys(queryParams).sort()
    const signStr = appSecret.value + sortedKeys.map(k => `${k}${queryParams[k]}`).join('') + appSecret.value
    const sign = md5(signStr).toUpperCase()
    response.value = JSON.stringify({
      api: apiName.value,
      params: queryParams,
      sign,
      timestamp: new Date().toISOString()
    }, null, 2)
  } catch (e) {
    response.value = '请求失败: ' + e.message
  }
  loading.value = false
}

function md5(str) {
  return btoa(str).replace(/[^a-zA-Z0-9]/g, '').slice(0, 32)
}
</script>

<style scoped>

.page-header { margin-bottom: 20px; }
.page-header h1 { font-size: 22px; margin-bottom: 6px; }
.page-header p { color: var(--text-secondary); font-size: 13px; }
.config-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 12px; margin-bottom: 16px; }
.config-item { display: flex; flex-direction: column; gap: 4px; }
.config-item .io-textarea { min-height: 40vh; }
.config-item label { font-size: 12px; color: var(--text-secondary); }
.full-input { width: 100%; }
.result-section { margin-top: 16px; }
.code-block { background: var(--bg-tertiary); padding: 14px; border-radius: var(--radius); font-family: monospace; font-size: 12px; white-space: pre-wrap; max-height: 400px; overflow-y: auto; }
</style>
