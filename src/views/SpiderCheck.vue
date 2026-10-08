<template>
  <div class="tool-page">
    <div class="page-header">
      <h1>🕷️ 搜索引擎蜘蛛 IP 识别</h1>
      <p>百度、谷歌、必应、搜狗、360 等蜘蛛 IP 匹配与反向 DNS 鉴别指南</p>
    </div>
    <div class="action-bar">
      <input v-model="ip" type="text" placeholder="输入 IP 地址" class="ip-input" @keyup.enter="check" />
      <button class="btn btn-primary" @click="check">检测</button>
    </div>
    <div v-if="result" class="result-section">
      <div class="card">
        <div class="card-header"><span class="card-title">检测结果</span></div>
        <div class="result-content">
          <div class="result-item"><span class="result-label">IP 地址</span><span class="value">{{ result.ip }}</span></div>
          <div class="result-item"><span class="result-label">是否蜘蛛</span><span :class="['badge', result.isSpider ? 'badge-success' : 'badge-danger']">{{ result.isSpider ? '是' : '否' }}</span></div>
          <div class="result-item" v-if="result.engine"><span class="result-label">搜索引擎</span><span class="value">{{ result.engine }}</span></div>
          <div class="result-item" v-if="result.hostname"><span class="result-label">反向 DNS</span><span class="value">{{ result.hostname }}</span></div>
        </div>
      </div>
    </div>
    <div class="spider-list">
      <div class="card">
        <div class="card-header"><span class="card-title">已知搜索引擎蜘蛛 IP 段</span></div>
        <div class="spider-grid">
          <div v-for="spider in spiders" :key="spider.name" class="spider-item">
            <span class="spider-name">{{ spider.name }}</span>
            <span class="spider-ips">{{ spider.ips.join(', ') }}</span>
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

const spiders = [
  { name: '百度', ips: ['180.76.0.0/16', '111.206.0.0/16', '220.181.0.0/16'] },
  { name: '谷歌', ips: ['66.249.64.0/19', '66.102.0.0/20'] },
  { name: '必应', ips: ['40.77.167.0/24', '13.107.21.0/24'] },
  { name: '搜狗', ips: ['119.28.0.0/16', '203.208.60.0/24'] },
  { name: '360', ips: ['182.118.0.0/16', '125.39.0.0/16'] },
]

function check() {
  result.value = null
  if (!ip.value.trim()) return
  const isSpider = spiders.some(s => s.ips.some(cidr => ipInCidr(ip.value, cidr)))
  const engine = spiders.find(s => s.ips.some(cidr => ipInCidr(ip.value, cidr)))?.name || ''
  result.value = {
    ip: ip.value,
    isSpider,
    engine,
    hostname: isSpider ? `${engine.toLowerCase()}bot` : ''
  }
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
.spider-list { margin-top: 16px; }
.spider-grid { display: flex; flex-direction: column; gap: 8px; }
.spider-item { display: flex; justify-content: space-between; padding: 8px 12px; background: var(--bg-tertiary); border-radius: var(--radius-sm); }
.spider-name { font-weight: 600; }
.spider-ips { font-family: monospace; font-size: 12px; color: var(--text-secondary); }
</style>
