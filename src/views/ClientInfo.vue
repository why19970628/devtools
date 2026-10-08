<template>
  <div class="tool-page">
    <div class="page-header">
      <h1>🖥️ 浏览器与客户端详细信息</h1>
      <p>操作系统、屏幕物理/逻辑分辨率、DPR、网络及 WebGL GPU 硬件信息检测</p>
    </div>
    <div class="info-grid">
      <div class="info-card">
        <div class="card-header"><span class="card-title">系统信息</span></div>
        <div class="info-list">
          <div class="info-item"><span class="info-label">操作系统</span><span class="info-value">{{ info.os }}</span></div>
          <div class="info-item"><span class="info-label">浏览器</span><span class="info-value">{{ info.browser }}</span></div>
          <div class="info-item"><span class="info-label">语言</span><span class="info-value">{{ info.language }}</span></div>
          <div class="info-item"><span class="info-label">Cookies</span><span class="info-value">{{ info.cookies ? '启用' : '禁用' }}</span></div>
        </div>
      </div>
      <div class="info-card">
        <div class="card-header"><span class="card-title">屏幕信息</span></div>
        <div class="info-list">
          <div class="info-item"><span class="info-label">物理分辨率</span><span class="info-value">{{ info.screenPhysical }}</span></div>
          <div class="info-item"><span class="info-label">逻辑分辨率</span><span class="info-value">{{ info.screenLogical }}</span></div>
          <div class="info-item"><span class="info-label">DPR</span><span class="info-value">{{ info.dpr }}x</span></div>
          <div class="info-item"><span class="info-label">色深</span><span class="info-value">{{ info.colorDepth }} bit</span></div>
        </div>
      </div>
      <div class="info-card">
        <div class="card-header"><span class="card-title">GPU 信息</span></div>
        <div class="info-list">
          <div class="info-item"><span class="info-label">GPU 厂商</span><span class="info-value">{{ info.gpuVendor }}</span></div>
          <div class="info-item"><span class="info-label">GPU 型号</span><span class="info-value">{{ info.gpuRenderer }}</span></div>
        </div>
      </div>
      <div class="info-card">
        <div class="card-header"><span class="card-title">网络信息</span></div>
        <div class="info-list">
          <div class="info-item"><span class="info-label">网络类型</span><span class="info-value">{{ info.connection }}</span></div>
          <div class="info-item"><span class="info-label">下行速度</span><span class="info-value">{{ info.downlink }}</span></div>
          <div class="info-item"><span class="info-label">RTT</span><span class="info-value">{{ info.rtt }}</span></div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'

const info = ref({
  os: '',
  browser: '',
  language: '',
  cookies: false,
  screenPhysical: '',
  screenLogical: '',
  dpr: 1,
  colorDepth: 24,
  gpuVendor: '',
  gpuRenderer: '',
  connection: '',
  downlink: '',
  rtt: ''
})

onMounted(() => {
  info.value.os = detectOS()
  info.value.browser = detectBrowser()
  info.value.language = navigator.language
  info.value.cookies = navigator.cookieEnabled
  info.value.screenPhysical = `${screen.width * devicePixelRatio}x${screen.height * devicePixelRatio}`
  info.value.screenLogical = `${screen.width}x${screen.height}`
  info.value.dpr = devicePixelRatio
  info.value.colorDepth = screen.colorDepth
  info.value.gpuVendor = getGPUInfo().vendor
  info.value.gpuRenderer = getGPUInfo().renderer
  info.value.connection = navigator.connection?.effectiveType || '未知'
  info.value.downlink = navigator.connection?.downlink ? `${navigator.connection.downlink} Mbps` : '未知'
  info.value.rtt = navigator.connection?.rtt ? `${navigator.connection.rtt} ms` : '未知'
})

function detectOS() {
  const ua = navigator.userAgent
  if (ua.includes('Windows')) return 'Windows'
  if (ua.includes('Mac OS')) return 'macOS'
  if (ua.includes('Linux')) return 'Linux'
  if (ua.includes('Android')) return 'Android'
  if (ua.includes('iOS')) return 'iOS'
  return '未知'
}

function detectBrowser() {
  const ua = navigator.userAgent
  if (ua.includes('Edg')) return 'Edge'
  if (ua.includes('Chrome')) return 'Chrome'
  if (ua.includes('Firefox')) return 'Firefox'
  if (ua.includes('Safari')) return 'Safari'
  if (ua.includes('Opera')) return 'Opera'
  return '未知'
}

function getGPUInfo() {
  try {
    const canvas = document.createElement('canvas')
    const gl = canvas.getContext('webgl') || canvas.getContext('experimental-webgl')
    if (!gl) return { vendor: '未知', renderer: '未知' }
    const debugInfo = gl.getExtension('WEBGL_debug_renderer_info')
    if (debugInfo) {
      return {
        vendor: gl.getParameter(debugInfo.UNMASKED_VENDOR_WEBGL),
        renderer: gl.getParameter(debugInfo.UNMASKED_RENDERER_WEBGL)
      }
    }
    return { vendor: '未知', renderer: '未知' }
  } catch (e) {
    return { vendor: '未知', renderer: '未知' }
  }
}
</script>

<style scoped>

.page-header { margin-bottom: 20px; }
.page-header h1 { font-size: 22px; margin-bottom: 6px; }
.page-header p { color: var(--text-secondary); font-size: 13px; }
.info-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 16px; }
.info-list { display: flex; flex-direction: column; gap: 8px; }
.info-item { display: flex; justify-content: space-between; font-size: 13px; }
.info-label { color: var(--text-secondary); }
.info-value { font-family: monospace; }
</style>
