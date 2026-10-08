<template>
  <div class="tool-page">
    <ToolHeader />
    <div class="action-bar">
      <select v-model="mode" class="lang-select">
        <option value="wgs84ToGcj02">WGS84 → GCJ-02</option>
        <option value="gcj02ToWgs84">GCJ-02 → WGS84</option>
        <option value="gcj02ToBd09">GCJ-02 → BD-09</option>
        <option value="bd09ToGcj02">BD-09 → GCJ-02</option>
        <option value="wgs84ToBd09">WGS84 → BD-09</option>
        <option value="bd09ToWgs84">BD-09 → WGS84</option>
      </select>
      <button class="btn btn-primary" @click="convert">转换</button>
    </div>
    <div class="io-grid">
      <div class="io-item">
        <label>经度 (Lng)</label>
        <input v-model.number="lng" type="number" step="any" placeholder="如 116.404" />
      </div>
      <div class="io-item">
        <label>纬度 (Lat)</label>
        <input v-model.number="lat" type="number" step="any" placeholder="如 39.915" />
      </div>
    </div>
    <div v-if="result" class="result-section">
      <div class="card">
        <div class="card-header"><span class="card-title">转换结果</span></div>
        <div class="result-grid">
          <div class="result-item"><span class="result-label">经度</span><span class="value">{{ result.lng.toFixed(6) }}</span></div>
          <div class="result-item"><span class="result-label">纬度</span><span class="value">{{ result.lat.toFixed(6) }}</span></div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'

const lng = ref(null)
const lat = ref(null)
const result = ref(null)
const mode = ref('wgs84ToGcj02')

const PI = 3.1415926535897932384626
const A = 6378245.0
const EE = 0.00669342162296594323

function convert() {
  result.value = null
  if (lng.value === null || lat.value === null) return
  const { lng: l, lat: t } = { lng: lng.value, lat: lat.value }
  switch (mode.value) {
    case 'wgs84ToGcj02': result.value = wgs84ToGcj02(l, t); break
    case 'gcj02ToWgs84': result.value = gcj02ToWgs84(l, t); break
    case 'gcj02ToBd09': result.value = gcj02ToBd09(l, t); break
    case 'bd09ToGcj02': result.value = bd09ToGcj02(l, t); break
    case 'wgs84ToBd09': result.value = gcj02ToBd09(...Object.values(wgs84ToGcj02(l, t))); break
    case 'bd09ToWgs84': result.value = gcj02ToWgs84(...Object.values(bd09ToGcj02(l, t))); break
  }
}

function wgs84ToGcj02(lng, lat) {
  if (outOfChina(lng, lat)) return { lng, lat }
  let dLat = transformLat(lng - 105.0, lat - 35.0)
  let dLng = transformLng(lng - 105.0, lat - 35.0)
  const radLat = lat / 180.0 * PI
  let magic = Math.sin(radLat)
  magic = 1 - EE * magic * magic
  const sqrtMagic = Math.sqrt(magic)
  dLat = (dLat * 180.0) / ((A * (1 - EE)) / (magic * sqrtMagic) * PI)
  dLng = (dLng * 180.0) / (A / sqrtMagic * Math.cos(radLat) * PI)
  return { lng: lng + dLng, lat: lat + dLat }
}

function gcj02ToWgs84(lng, lat) {
  if (outOfChina(lng, lat)) return { lng, lat }
  let dLat = transformLat(lng - 105.0, lat - 35.0)
  let dLng = transformLng(lng - 105.0, lat - 35.0)
  const radLat = lat / 180.0 * PI
  let magic = Math.sin(radLat)
  magic = 1 - EE * magic * magic
  const sqrtMagic = Math.sqrt(magic)
  dLat = (dLat * 180.0) / ((A * (1 - EE)) / (magic * sqrtMagic) * PI)
  dLng = (dLng * 180.0) / (A / sqrtMagic * Math.cos(radLat) * PI)
  return { lng: lng - dLng, lat: lat - dLat }
}

function gcj02ToBd09(lng, lat) {
  const z = Math.sqrt(lng * lng + lat * lat) + 0.00002 * Math.sin(lat * PI * 3000.0 / 180.0)
  const theta = Math.atan2(lat, lng) + 0.000003 * Math.cos(lng * PI * 3000.0 / 180.0)
  return { lng: z * Math.cos(theta) + 0.0065, lat: z * Math.sin(theta) + 0.006 }
}

function bd09ToGcj02(lng, lat) {
  const x = lng - 0.0065
  const y = lat - 0.006
  const z = Math.sqrt(x * x + y * y) - 0.00002 * Math.sin(y * PI * 3000.0 / 180.0)
  const theta = Math.atan2(y, x) - 0.000003 * Math.cos(x * PI * 3000.0 / 180.0)
  return { lng: z * Math.cos(theta), lat: z * Math.sin(theta) }
}

function outOfChina(lng, lat) {
  return lng < 72.004 || lng > 137.8347 || lat < 0.8293 || lat > 55.8271
}

function transformLat(x, y) {
  let ret = -100.0 + 2.0 * x + 3.0 * y + 0.2 * y * y + 0.1 * x * y + 0.2 * Math.sqrt(Math.abs(x))
  ret += (20.0 * Math.sin(6.0 * x * PI) + 20.0 * Math.sin(2.0 * x * PI)) * 2.0 / 3.0
  ret += (20.0 * Math.sin(y * PI) + 40.0 * Math.sin(y / 3.0 * PI)) * 2.0 / 3.0
  ret += (160.0 * Math.sin(y / 12.0 * PI) + 320 * Math.sin(y * PI / 30.0)) * 2.0 / 3.0
  return ret
}

function transformLng(x, y) {
  let ret = 300.0 + x + 2.0 * y + 0.1 * x * x + 0.1 * x * y + 0.1 * Math.sqrt(Math.abs(x))
  ret += (20.0 * Math.sin(6.0 * x * PI) + 20.0 * Math.sin(2.0 * x * PI)) * 2.0 / 3.0
  ret += (20.0 * Math.sin(x * PI) + 40.0 * Math.sin(x / 3.0 * PI)) * 2.0 / 3.0
  ret += (150.0 * Math.sin(x / 12.0 * PI) + 300.0 * Math.sin(x / 30.0 * PI)) * 2.0 / 3.0
  return ret
}
</script>

<style scoped>

.page-header { margin-bottom: 20px; }
.page-header h1 { font-size: 22px; margin-bottom: 6px; }
.page-header p { color: var(--text-secondary); font-size: 13px; }
.lang-select { width: 200px; }
.io-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 16px; margin-bottom: 16px; }
.io-item { display: flex; flex-direction: column; gap: 4px; }
.io-item label { font-size: 12px; color: var(--text-secondary); }
.result-section { margin-top: 16px; }
.result-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 12px; }
.result-item { display: flex; flex-direction: column; gap: 4px; }
.result-label { font-size: 12px; color: var(--text-secondary); }
.value { font-family: monospace; font-size: 16px; }
</style>
