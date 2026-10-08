<template>
  <div class="tool-page">
    <ToolHeader />
    <div class="action-bar">
      <button class="btn btn-primary" @click="fetchIp" :disabled="loading">
        {{ loading ? '获取中...' : '获取 IP' }}
      </button>
    </div>
    <div v-if="ipInfo" class="result-section">
      <div class="card">
        <div class="card-header"><span class="card-title">IP 信息</span></div>
        <div class="result-grid">
          <div class="result-item"><span class="result-label">IP 地址</span><span class="value">{{ ipInfo.ip }}</span></div>
          <div class="result-item"><span class="result-label">国家</span><span class="value">{{ ipInfo.country }}</span></div>
          <div class="result-item"><span class="result-label">地区</span><span class="value">{{ ipInfo.region }}</span></div>
          <div class="result-item"><span class="result-label">城市</span><span class="value">{{ ipInfo.city }}</span></div>
          <div class="result-item"><span class="result-label">运营商</span><span class="value">{{ ipInfo.isp }}</span></div>
          <div class="result-item"><span class="result-label">组织</span><span class="value">{{ ipInfo.org }}</span></div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'

const loading = ref(false)
const ipInfo = ref(null)

async function fetchIp() {
  loading.value = true
  ipInfo.value = null
  try {
    const res = await fetch('https://api.ipify.org?format=json')
    const data = await res.json()
    ipInfo.value = { ip: data.ip, country: '未知', region: '未知', city: '未知', isp: '未知', org: '未知' }
    try {
      const geoRes = await fetch(`http://ip-api.com/json/${data.ip}?lang=zh-CN`)
      const geo = await geoRes.json()
      if (geo.status === 'success') {
        ipInfo.value = {
          ip: data.ip,
          country: geo.country,
          region: geo.regionName,
          city: geo.city,
          isp: geo.isp,
          org: geo.org
        }
      }
    } catch (e) { /* ignore */ }
  } catch (e) {
    ipInfo.value = { ip: '获取失败', country: '', region: '', city: '', isp: '', org: '' }
  }
  loading.value = false
}
</script>

<style scoped>

.page-header { margin-bottom: 20px; }
.page-header h1 { font-size: 22px; margin-bottom: 6px; }
.page-header p { color: var(--text-secondary); font-size: 13px; }
.result-section { margin-top: 16px; }
.result-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 12px; }
.result-item { display: flex; flex-direction: column; gap: 4px; }
.result-label { font-size: 12px; color: var(--text-secondary); }
.value { font-family: monospace; font-size: 14px; }
</style>
