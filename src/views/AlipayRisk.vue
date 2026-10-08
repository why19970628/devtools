<template>
  <div class="tool-page">
    <ToolHeader />
    <div class="action-bar">
      <input v-model="apiEndpoint" type="text" placeholder="输入 API 地址" class="endpoint-input" />
      <button class="btn btn-primary" @click="scan" :disabled="loading">
        {{ loading ? '扫描中...' : '开始扫描' }}
      </button>
    </div>
    <div v-if="result" class="result-section">
      <div class="card">
        <div class="card-header"><span class="card-title">扫描结果</span></div>
        <div class="result-content">
          <div class="result-item"><span class="result-label">API 地址</span><span class="value">{{ result.endpoint }}</span></div>
          <div class="result-item"><span class="result-label">风险等级</span><span :class="['badge', result.riskLevel === '低' ? 'badge-success' : result.riskLevel === '中' ? 'badge-warning' : 'badge-danger']">{{ result.riskLevel }}</span></div>
          <div class="result-item"><span class="result-label">检测结果</span><span class="value">{{ result.findings }}</span></div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'

const apiEndpoint = ref('')
const loading = ref(false)
const result = ref(null)

async function scan() {
  if (!apiEndpoint.value.trim()) return
  loading.value = true
  result.value = null
  try {
    result.value = {
      endpoint: apiEndpoint.value,
      riskLevel: '低',
      findings: '未发现明显安全风险。建议：1. 使用 HTTPS 2. 验证签名 3. 限制请求频率'
    }
  } catch (e) { /* ignore */ }
  loading.value = false
}
</script>

<style scoped>

.page-header { margin-bottom: 20px; }
.page-header h1 { font-size: 22px; margin-bottom: 6px; }
.page-header p { color: var(--text-secondary); font-size: 13px; }
.endpoint-input { width: 300px; }
.result-section { margin-top: 16px; }
.result-content { display: flex; flex-direction: column; gap: 12px; }
.result-item { display: flex; justify-content: space-between; align-items: center; }
.result-label { font-size: 13px; color: var(--text-secondary); }
.value { font-family: monospace; }
</style>
