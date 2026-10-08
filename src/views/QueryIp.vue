<template>
  <div class="tool-page">
    <div class="page-header">
      <h1>🗺️ IP 归属地与运营商查询</h1>
      <p>输入任意 IPv4 地址，即时查询物理地理位置、经纬度、ASN 编号与服务商</p>
    </div>
    <div class="action-bar">
      <input v-model="ip" type="text" placeholder="输入 IP 地址，如 8.8.8.8" class="ip-input" @keyup.enter="query" />
      <button class="btn btn-primary" @click="query" :disabled="loading">
        {{ loading ? '查询中...' : '查询' }}
      </button>
    </div>
    <div v-if="result" class="result-section">
      <div class="card">
        <div class="card-header"><span class="card-title">查询结果</span></div>
        <div class="result-grid">
          <div class="result-item"><span class="result-label">IP 地址</span><span class="value">{{ result.ip }}</span></div>
          <div class="result-item"><span class="result-label">国家</span><span class="value">{{ result.country }}</span></div>
          <div class="result-item"><span class="result-label">地区</span><span class="value">{{ result.region }}</span></div>
          <div class="result-item"><span class="result-label">城市</span><span class="value">{{ result.city }}</span></div>
          <div class="result-item"><span class="result-label">运营商</span><span class="value">{{ result.isp }}</span></div>
          <div class="result-item"><span class="result-label">组织</span><span class="value">{{ result.org }}</span></div>
          <div class="result-item"><span class="result-label">ASN</span><span class="value">{{ result.as }}</span></div>
          <div class="result-item"><span class="result-label">经纬度</span><span class="value">{{ result.lat }}, {{ result.lon }}</span></div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'

const ip = ref('')
const loading = ref(false)
const result = ref(null)

async function query() {
  if (!ip.value.trim()) return
  loading.value = true
  result.value = null
  try {
    const res = await fetch(`http://ip-api.com/json/${ip.value}?lang=zh-CN`)
    const data = await res.json()
    if (data.status === 'success') {
      result.value = {
        ip: data.query,
        country: data.country,
        region: data.regionName,
        city: data.city,
        isp: data.isp,
        org: data.org,
        as: data.as,
        lat: data.lat,
        lon: data.lon
      }
    }
  } catch (e) { /* ignore */ }
  loading.value = false
}
</script>

<style scoped>

.page-header { margin-bottom: 20px; }
.page-header h1 { font-size: 22px; margin-bottom: 6px; }
.page-header p { color: var(--text-secondary); font-size: 13px; }
.ip-input { width: 250px; }
.result-section { margin-top: 16px; }
.result-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 12px; }
.result-item { display: flex; flex-direction: column; gap: 4px; }
.result-label { font-size: 12px; color: var(--text-secondary); }
.value { font-family: monospace; font-size: 14px; }
</style>
