<template>
  <div class="tool-page">
    <ToolHeader />
    <div class="action-bar">
      <input v-model="md5hash" type="text" placeholder="输入 MD5 哈希值" class="hash-input" @keyup.enter="query" />
      <button class="btn btn-primary" @click="query" :disabled="loading">
        {{ loading ? '查询中...' : '查询' }}
      </button>
    </div>
    <div v-if="result" class="result-section">
      <div class="card">
        <div class="card-header"><span class="card-title">查询结果</span></div>
        <div class="result-content">
          <div class="result-item"><span class="result-label">MD5</span><span class="value">{{ result.hash }}</span></div>
          <div class="result-item"><span class="result-label">明文</span><span :class="['badge', result.found ? 'badge-success' : 'badge-danger']">{{ result.plain || '未找到' }}</span></div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'

const md5hash = ref('')
const loading = ref(false)
const result = ref(null)

async function query() {
  if (!md5hash.value.trim()) return
  loading.value = true
  result.value = null
  try {
    const res = await fetch(`https://api.somd5.com/v1/decrypt?hash=${md5hash.value}`)
    const data = await res.json()
    result.value = {
      hash: md5hash.value,
      found: data.found,
      plain: data.plain
    }
  } catch (e) {
    result.value = { hash: md5hash.value, found: false, plain: '' }
  }
  loading.value = false
}
</script>

<style scoped>

.page-header { margin-bottom: 20px; }
.page-header h1 { font-size: 22px; margin-bottom: 6px; }
.page-header p { color: var(--text-secondary); font-size: 13px; }
.hash-input { width: 300px; font-family: monospace; }
.result-section { margin-top: 16px; }
.result-content { display: flex; flex-direction: column; gap: 12px; }
.result-item { display: flex; justify-content: space-between; align-items: center; }
.result-label { font-size: 13px; color: var(--text-secondary); }
.value { font-family: monospace; }
</style>
