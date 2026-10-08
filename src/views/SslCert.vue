<template>
  <div class="tool-page">
    <ToolHeader />
    <div class="action-bar">
      <input v-model="domain" type="text" placeholder="输入域名，如 example.com" class="domain-input" @keyup.enter="query" />
      <button class="btn btn-primary" @click="query" :disabled="loading">
        {{ loading ? '查询中...' : '查询' }}
      </button>
    </div>
    <div v-if="result" class="result-section">
      <div class="card">
        <div class="card-header"><span class="card-title">证书信息</span></div>
        <div class="result-grid">
          <div class="result-item"><span class="result-label">域名</span><span class="value">{{ result.domain }}</span></div>
          <div class="result-item"><span class="result-label">颁发机构</span><span class="value">{{ result.issuer }}</span></div>
          <div class="result-item"><span class="result-label">生效时间</span><span class="value">{{ result.validFrom }}</span></div>
          <div class="result-item"><span class="result-label">到期时间</span><span class="value">{{ result.validTo }}</span></div>
          <div class="result-item"><span class="result-label">剩余天数</span><span :class="['badge', result.daysLeft > 30 ? 'badge-success' : result.daysLeft > 7 ? 'badge-warning' : 'badge-danger']">{{ result.daysLeft }} 天</span></div>
          <div class="result-item"><span class="result-label">序列号</span><span class="value">{{ result.serialNumber }}</span></div>
        </div>
      </div>
    </div>
    <div v-if="error" class="error-msg">{{ error }}</div>
  </div>
</template>

<script setup>
import { ref } from 'vue'

const domain = ref('')
const loading = ref(false)
const result = ref(null)
const error = ref('')

async function query() {
  if (!domain.value.trim()) return
  loading.value = true
  result.value = null
  error.value = ''
  try {
    const res = await fetch(`https://api.certspotter.com/v1/issuances?domain=${domain.value}&include_subdomains=true&expand=dns_names`)
    if (!res.ok) throw new Error('查询失败')
    const data = await res.json()
    if (data.length === 0) {
      error.value = '未找到证书信息'
    } else {
      const cert = data[0]
      const validTo = new Date(cert.not_after)
      const daysLeft = Math.ceil((validTo - Date.now()) / (1000 * 60 * 60 * 24))
      result.value = {
        domain: domain.value,
        issuer: cert.issuer,
        validFrom: new Date(cert.not_before).toLocaleDateString(),
        validTo: validTo.toLocaleDateString(),
        daysLeft,
        serialNumber: cert.serial_number
      }
    }
  } catch (e) {
    error.value = '查询失败: ' + e.message
  }
  loading.value = false
}
</script>

<style scoped>

.page-header { margin-bottom: 20px; }
.page-header h1 { font-size: 22px; margin-bottom: 6px; }
.page-header p { color: var(--text-secondary); font-size: 13px; }
.domain-input { width: 250px; }
.result-section { margin-top: 16px; }
.result-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 12px; }
.result-item { display: flex; flex-direction: column; gap: 4px; }
.result-label { font-size: 12px; color: var(--text-secondary); }
.value { font-family: monospace; font-size: 14px; }
.error-msg { color: var(--danger); padding: 10px; }
</style>
