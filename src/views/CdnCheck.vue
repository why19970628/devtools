<template>
  <div class="tool-page">
    <ToolHeader />
    <div class="action-bar">
      <input v-model="ip" type="text" placeholder="输入 IP 地址" class="ip-input" @keyup.enter="check" />
      <button class="btn btn-primary" @click="check">检测</button>
    </div>
    <div v-if="result" class="result-section">
      <div class="card">
        <div class="card-header"><span class="card-title">检测结果</span></div>
        <div class="result-content">
          <div class="result-item"><span class="result-label">IP 地址</span><span class="value">{{ result.ip }}</span></div>
          <div class="result-item"><span class="result-label">是否 CDN</span><span :class="['badge', result.isCdn ? 'badge-success' : 'badge-danger']">{{ result.isCdn ? '是' : '否' }}</span></div>
          <div class="result-item" v-if="result.cdn"><span class="result-label">CDN 厂商</span><span class="value">{{ result.cdn }}</span></div>
        </div>
      </div>
    </div>
    <div class="cdn-list">
      <div class="card">
        <div class="card-header"><span class="card-title">已知 CDN IP 段</span></div>
        <div class="cdn-grid">
          <div v-for="cdn in cdns" :key="cdn.name" class="cdn-item">
            <span class="cdn-name">{{ cdn.name }}</span>
            <span class="cdn-ips">{{ cdn.ips.slice(0, 3).join(', ') }}...</span>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'

const ip = ref('')
const result = ref(null)

const cdns = [
  { name: '阿里云 CDN', ips: ['101.226.0.0/16', '111.13.0.0/16', '120.55.0.0/16'] },
  { name: '腾讯云 CDN', ips: ['119.29.0.0/16', '123.249.0.0/16', '182.254.0.0/16'] },
  { name: 'Cloudflare', ips: ['103.21.244.0/22', '103.22.200.0/22', '172.64.0.0/13'] },
  { name: 'Akamai', ips: ['23.0.0.0/8', '184.24.0.0/13', '104.64.0.0/10'] },
  { name: 'Fastly', ips: ['151.101.0.0/16', '199.232.0.0/16'] },
]

function check() {
  result.value = null
  if (!ip.value.trim()) return
  const isCdn = cdns.some(c => c.ips.some(cidr => ipInCidr(ip.value, cidr)))
  const cdn = cdns.find(c => c.ips.some(cidr => ipInCidr(ip.value, cidr)))?.name || ''
  result.value = { ip: ip.value, isCdn, cdn }
}

function ipInCidr(ip, cidr) {
  const [network, bits] = cidr.split('/')
  const mask = parseInt(bits)
  const ipInt = ip.split('.').reduce((acc, oct) => (acc << 8) + parseInt(oct), 0) >>> 0
  const netInt = network.split('.').reduce((acc, oct) => (acc << 8) + parseInt(oct), 0) >>> 0
  const maskInt = mask === 0 ? 0 : (0xFFFFFFFF << (32 - mask)) >>> 0
  return (ipInt & maskInt) === (netInt & maskInt)
}
</script>

<style scoped>

.page-header { margin-bottom: 20px; }
.page-header h1 { font-size: 22px; margin-bottom: 6px; }
.page-header p { color: var(--text-secondary); font-size: 13px; }
.ip-input { width: 250px; }
.result-section { margin-top: 16px; }
.result-content { display: flex; flex-direction: column; gap: 12px; }
.result-item { display: flex; justify-content: space-between; align-items: center; }
.result-label { font-size: 13px; color: var(--text-secondary); }
.value { font-family: monospace; }
.cdn-list { margin-top: 16px; }
.cdn-grid { display: flex; flex-direction: column; gap: 8px; }
.cdn-item { display: flex; justify-content: space-between; padding: 8px 12px; background: var(--bg-tertiary); border-radius: var(--radius-sm); }
.cdn-name { font-weight: 600; }
.cdn-ips { font-family: monospace; font-size: 12px; color: var(--text-secondary); }
</style>
