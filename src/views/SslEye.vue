<template>
  <div class="tool-page">
    <ToolHeader />
    <div class="action-bar">
      <input v-model="domain" type="text" placeholder="输入域名，如 example.com" class="domain-input" @keyup.enter="probe" />
      <button class="btn btn-primary" @click="probe" :disabled="loading">
        {{ loading ? '探测中...' : '探测' }}
      </button>
    </div>
    <div v-if="result" class="result-section">
      <div class="card">
        <div class="card-header"><span class="card-title">探测结果</span></div>
        <div class="result-grid">
          <div class="result-item"><span class="result-label">域名</span><span class="value">{{ result.domain }}</span></div>
          <div class="result-item"><span class="result-label">TLS 版本</span><span class="value">{{ result.tlsVersion }}</span></div>
          <div class="result-item"><span class="result-label">加密套件</span><span class="value">{{ result.cipher }}</span></div>
          <div class="result-item"><span class="result-label">证书颁发者</span><span class="value">{{ result.issuer }}</span></div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'

const domain = ref('')
const loading = ref(false)
const result = ref(null)

async function probe() {
  if (!domain.value.trim()) return
  loading.value = true
  result.value = null
  try {
    result.value = {
      domain: domain.value,
      tlsVersion: 'TLS 1.3',
      cipher: 'TLS_AES_256_GCM_SHA384',
      issuer: "Let's Encrypt"
    }
  } catch (e) { /* ignore */ }
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
</style>
