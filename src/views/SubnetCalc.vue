<template>
  <div class="tool-page">
    <div class="page-header">
      <h1>💻 IP 与子网掩码计算</h1>
      <p>CIDR 掩码计算、网络地址、广播地址、可用主机数与范围计算</p>
    </div>
    <div class="action-bar">
      <input v-model="ip" type="text" placeholder="IP 地址，如 192.168.1.1" class="ip-input" />
      <input v-model="cidr" type="number" min="0" max="32" placeholder="CIDR，如 24" class="cidr-input" />
      <button class="btn btn-primary" @click="calculate">计算</button>
    </div>
    <div v-if="result" class="result-section">
      <div class="card">
        <div class="card-header"><span class="card-title">计算结果</span></div>
        <div class="result-grid">
          <div class="result-item"><span class="result-label">网络地址</span><span class="value">{{ result.network }}</span></div>
          <div class="result-item"><span class="result-label">广播地址</span><span class="value">{{ result.broadcast }}</span></div>
          <div class="result-item"><span class="result-label">子网掩码</span><span class="value">{{ result.mask }}</span></div>
          <div class="result-item"><span class="result-label">可用主机数</span><span class="value">{{ result.hosts }}</span></div>
          <div class="result-item"><span class="result-label">IP 范围</span><span class="value">{{ result.range }}</span></div>
          <div class="result-item"><span class="result-label">CIDR 表示</span><span class="value">{{ result.cidr }}</span></div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'

const ip = ref('192.168.1.1')
const cidr = ref(24)
const result = ref(null)

function calculate() {
  result.value = null
  if (!ip.value || cidr.value === '') return
  try {
    const ipParts = ip.value.split('.').map(Number)
    if (ipParts.length !== 4 || ipParts.some(p => isNaN(p) || p < 0 || p > 255)) return
    const mask = cidr.value === 0 ? 0 : (0xFFFFFFFF << (32 - cidr.value)) >>> 0
    const ipInt = (ipParts[0] << 24) | (ipParts[1] << 16) | (ipParts[2] << 8) | ipParts[3]
    const network = (ipInt & mask) >>> 0
    const broadcast = (network | (~mask >>> 0)) >>> 0
    const hosts = cidr.value >= 31 ? 0 : (2 ** (32 - cidr.value)) - 2
    result.value = {
      network: intToIp(network),
      broadcast: intToIp(broadcast),
      mask: intToIp(mask),
      hosts,
      hosts: hosts,
      range: hosts > 0 ? `${intToIp(network + 1)} - ${intToIp(broadcast - 1)}` : 'N/A',
      cidr: `${ip.value}/${cidr.value}`
    }
  } catch (e) { /* ignore */ }
}

function intToIp(int) {
  return [(int >>> 24) & 255, (int >>> 16) & 255, (int >>> 8) & 255, int & 255].join('.')
}
</script>

<style scoped>

.page-header { margin-bottom: 20px; }
.page-header h1 { font-size: 22px; margin-bottom: 6px; }
.page-header p { color: var(--text-secondary); font-size: 13px; }
.ip-input { width: 200px; }
.cidr-input { width: 80px; }
.result-section { margin-top: 16px; }
.result-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 12px; }
.result-item { display: flex; flex-direction: column; gap: 4px; }
.result-label { font-size: 12px; color: var(--text-secondary); }
.value { font-family: monospace; font-size: 14px; }
</style>
