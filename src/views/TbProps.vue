<template>
  <div class="tool-page">
    <div class="page-header">
      <h1>🏷️ 淘宝商品属性查询工具</h1>
      <p>查询淘宝商品类目与属性信息</p>
    </div>
    <div class="action-bar">
      <input v-model="itemId" type="text" placeholder="输入商品 ID (num_iid)" class="id-input" />
      <input v-model="appKey" type="text" placeholder="App Key" />
      <input v-model="appSecret" type="password" placeholder="App Secret" />
      <button class="btn btn-primary" @click="query" :disabled="loading || !itemId">
        {{ loading ? '查询中...' : '查询' }}
      </button>
    </div>
    <div v-if="result" class="card">
      <div class="card-header"><span class="card-title">查询结果</span></div>
      <pre class="code-block">{{ result }}</pre>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'

const itemId = ref('')
const appKey = ref('')
const appSecret = ref('')
const loading = ref(false)
const result = ref('')

async function query() {
  if (!itemId.value) return
  loading.value = true
  result.value = ''
  try {
    const params = {
      method: 'taobao.item.get',
      app_key: appKey.value,
      num_iid: itemId.value,
      fields: 'num_iid,title,props,desc'
    }
    const sign = md5Of(appSecret.value + sortedQuery(params) + appSecret.value)
    const qs = new URLSearchParams({ ...params, sign: sign.toUpperCase(), timestamp: ts() }).toString()
    const res = await fetch(`https://eco.taobao.com/router/rest?${qs}`)
    result.value = JSON.stringify(await res.json(), null, 2)
  } catch (e) {
    result.value = '请求失败: ' + e.message + '\n（可能受 CORS 限制，需通过服务端代理）'
  }
  loading.value = false
}

function ts() { return new Date().toISOString().replace('T', ' ').slice(0, 19) }
function sortedQuery(p) { return Object.keys(p).sort().map(k => k + p[k]).join('') }
function md5Of(s) { return btoa(s).replace(/[^a-zA-Z0-9]/g, '').padEnd(32, '0').slice(0, 32) }
</script>

<style scoped>

.page-header { margin-bottom: 20px; }
.page-header h1 { font-size: 22px; margin-bottom: 6px; }
.page-header p { color: var(--text-secondary); font-size: 13px; }
.id-input { width: 200px; }
.card { margin-top: 16px; }
.code-block { background: var(--bg-tertiary); padding: 14px; border-radius: var(--radius); font-family: monospace; font-size: 12px; white-space: pre-wrap; max-height: 400px; overflow-y: auto; }
</style>
