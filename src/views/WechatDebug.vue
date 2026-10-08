<template>
  <div class="tool-page">
    <div class="page-header">
      <h1>💬 微信接口调试工具</h1>
      <p>微信 access_token 获取与接口调试</p>
    </div>
    <div class="config-grid">
      <div class="config-item">
        <label>AppID</label>
        <input v-model="appId" type="text" placeholder="输入 AppID" />
      </div>
      <div class="config-item">
        <label>AppSecret</label>
        <input v-model="appSecret" type="password" placeholder="输入 AppSecret" />
      </div>
      <div class="config-item">
        <label>接口地址</label>
        <input v-model="apiUrl" type="text" placeholder="https://api.weixin.qq.com/..." />
      </div>
      <div class="config-item">
        <label>额外参数 (JSON)</label>
        <input v-model="extra" type="text" placeholder='{"openid":"oXXX"}' />
      </div>
    </div>
    <div class="action-bar">
      <button class="btn btn-primary" @click="getToken" :disabled="loading">
        {{ loading ? '请求中...' : '获取 access_token' }}
      </button>
      <button class="btn" @click="callApi">调用接口</button>
    </div>
    <div v-if="response" class="card">
      <div class="card-header"><span class="card-title">响应结果</span></div>
      <pre class="code-block">{{ response }}</pre>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'

const appId = ref('')
const appSecret = ref('')
const apiUrl = ref('https://api.weixin.qq.com/cgi-bin/token')
const extra = ref('{}')
const loading = ref(false)
const response = ref('')

async function getToken() {
  if (!appId.value || !appSecret.value) return
  loading.value = true
  response.value = ''
  try {
    const url = `https://api.weixin.qq.com/cgi-bin/token?grant_type=client_credential&appid=${appId.value}&secret=${appSecret.value}`
    const res = await fetch(url)
    response.value = JSON.stringify(await res.json(), null, 2)
  } catch (e) {
    response.value = '请求失败: ' + e.message + '\n（可能受 CORS 限制）'
  }
  loading.value = false
}

async function callApi() {
  if (!apiUrl.value) return
  loading.value = true
  response.value = ''
  try {
    const params = JSON.parse(extra.value || '{}')
    const qs = new URLSearchParams(params).toString()
    const res = await fetch(qs ? `${apiUrl.value}?${qs}` : apiUrl.value)
    response.value = JSON.stringify(await res.json(), null, 2)
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
.card { margin-top: 16px; }
.code-block { background: var(--bg-tertiary); padding: 14px; border-radius: var(--radius); font-family: monospace; font-size: 12px; white-space: pre-wrap; max-height: 400px; overflow-y: auto; }
</style>
