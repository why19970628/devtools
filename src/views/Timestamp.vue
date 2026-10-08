<template>
  <div class="tool-page">
    <div class="page-header">
      <h1>⏱️ Unix 时间戳互转</h1>
      <p>秒/毫秒时间戳与北京时间、UTC互转，支持当前实时时钟</p>
    </div>
    <div class="action-bar">
      <button class="btn" @click="setNow">当前时间</button>
      <button class="btn btn-primary" @click="convert">转换</button>
    </div>
    <div class="timestamp-display">
      <div class="card">
        <div class="card-header"><span class="card-title">实时时钟</span></div>
        <div class="clock">{{ currentTime }}</div>
      </div>
    </div>
    <div class="io-panel" style="margin-top:16px">
      <div class="io-box">
        <div class="io-label"><span>时间戳 (秒)</span></div>
        <input v-model="timestampSec" type="text" placeholder="如 1700000000" class="full-input" @input="convertFromSec" />
      </div>
      <div class="io-box">
        <div class="io-label"><span>时间戳 (毫秒)</span></div>
        <input v-model="timestampMs" type="text" placeholder="如 1700000000000" class="full-input" @input="convertFromMs" />
      </div>
    </div>
    <div class="result-section">
      <div class="card">
        <div class="card-header"><span class="card-title">转换结果</span></div>
        <div class="result-grid">
          <div class="result-item"><span class="result-label">北京时间</span><span class="value">{{ beijingTime }}</span></div>
          <div class="result-item"><span class="result-label">UTC 时间</span><span class="value">{{ utcTime }}</span></div>
          <div class="result-item"><span class="result-label">ISO 8601</span><span class="value">{{ isoTime }}</span></div>
          <div class="result-item"><span class="result-label">相对时间</span><span class="value">{{ relativeTime }}</span></div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, onUnmounted } from 'vue'

const timestampSec = ref('')
const timestampMs = ref('')
const beijingTime = ref('')
const utcTime = ref('')
const isoTime = ref('')
const relativeTime = ref('')
const currentTime = ref('')
let timer = null

onMounted(() => {
  updateClock()
  timer = setInterval(updateClock, 1000)
})

onUnmounted(() => clearInterval(timer))

function updateClock() {
  const now = new Date()
  currentTime.value = now.toLocaleString('zh-CN', { timeZone: 'Asia/Shanghai', hour12: false })
}

function setNow() {
  const now = Date.now()
  timestampSec.value = Math.floor(now / 1000).toString()
  timestampMs.value = now.toString()
  convert()
}

function convertFromSec() {
  if (!timestampSec.value.trim()) return
  const sec = parseInt(timestampSec.value)
  if (isNaN(sec)) return
  timestampMs.value = (sec * 1000).toString()
  convert()
}

function convertFromMs() {
  if (!timestampMs.value.trim()) return
  const ms = parseInt(timestampMs.value)
  if (isNaN(ms)) return
  timestampSec.value = Math.floor(ms / 1000).toString()
  convert()
}

function convert() {
  const ms = parseInt(timestampMs.value) || parseInt(timestampSec.value) * 1000
  if (isNaN(ms)) return
  const date = new Date(ms)
  beijingTime.value = date.toLocaleString('zh-CN', { timeZone: 'Asia/Shanghai', hour12: false })
  utcTime.value = date.toUTCString()
  isoTime.value = date.toISOString()
  relativeTime.value = getRelativeTime(date)
}

function getRelativeTime(date) {
  const diff = Date.now() - date.getTime()
  const abs = Math.abs(diff)
  const sec = Math.floor(abs / 1000)
  const min = Math.floor(sec / 60)
  const hour = Math.floor(min / 60)
  const day = Math.floor(hour / 24)
  const suffix = diff > 0 ? '前' : '后'
  if (sec < 60) return `${sec} 秒${suffix}`
  if (min < 60) return `${min} 分钟${suffix}`
  if (hour < 24) return `${hour} 小时${suffix}`
  return `${day} 天${suffix}`
}
</script>

<style scoped>

.page-header { margin-bottom: 20px; }
.page-header h1 { font-size: 22px; margin-bottom: 6px; }
.page-header p { color: var(--text-secondary); font-size: 13px; }
.timestamp-display { margin-bottom: 16px; }
.clock { font-size: 24px; font-weight: 700; font-family: monospace; color: var(--accent); }
.full-input { width: 100%; }
.result-section { margin-top: 16px; }
.result-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 12px; }
.result-item { display: flex; flex-direction: column; gap: 4px; }
.result-label { font-size: 12px; color: var(--text-secondary); }
.value { font-family: monospace; font-size: 14px; }
</style>
