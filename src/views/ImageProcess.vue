<template>
  <div class="tool-page">
    <ToolHeader />
    <div class="action-bar">
      <label class="btn" style="cursor:pointer">
        上传图片
        <input type="file" accept="image/*" style="display:none" @change="onFileChange" />
      </label>
      <select v-model="outputFormat" class="lang-select" @change="process">
        <option value="image/png">PNG</option>
        <option value="image/jpeg">JPEG</option>
        <option value="image/webp">WEBP</option>
      </select>
      <div class="config-item">
        <label>质量</label>
        <input v-model.number="quality" type="number" min="0.1" max="1" step="0.1" class="config-input" @input="process" />
      </div>
      <div class="config-item">
        <label>宽度</label>
        <input v-model.number="targetWidth" type="number" min="1" class="config-input" @input="process" />
      </div>
      <div class="config-item">
        <label>高度</label>
        <input v-model.number="targetHeight" type="number" min="1" class="config-input" @input="process" />
      </div>
      <button class="btn" @click="download" v-if="processedUrl">下载</button>
    </div>
    <div v-if="originalUrl" class="compare-panel">
      <div class="compare-item">
        <span class="io-label">原图 ({{ originalSize }})</span>
        <img :src="originalUrl" alt="Original" />
      </div>
      <div class="compare-item" v-if="processedUrl">
        <span class="io-label">处理后 ({{ processedSize }})</span>
        <img :src="processedUrl" alt="Processed" />
      </div>
    </div>
    <div v-else class="empty-state">
      <p>请上传图片</p>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'

const originalUrl = ref('')
const processedUrl = ref('')
const originalSize = ref('')
const processedSize = ref('')
const outputFormat = ref('image/jpeg')
const quality = ref(0.8)
const targetWidth = ref(null)
const targetHeight = ref(null)
let img = null

function onFileChange(e) {
  const file = e.target.files[0]
  if (!file) return
  originalUrl.value = URL.createObjectURL(file)
  originalSize.value = formatSize(file.size)
  img = new Image()
  img.onload = () => {
    targetWidth.value = img.width
    targetHeight.value = img.height
    process()
  }
  img.src = originalUrl.value
}

function process() {
  if (!img) return
  const canvas = document.createElement('canvas')
  canvas.width = targetWidth.value || img.width
  canvas.height = targetHeight.value || img.height
  const ctx = canvas.getContext('2d')
  if (outputFormat.value === 'image/jpeg') {
    ctx.fillStyle = '#fff'
    ctx.fillRect(0, 0, canvas.width, canvas.height)
  }
  ctx.drawImage(img, 0, 0, canvas.width, canvas.height)
  processedUrl.value = canvas.toDataURL(outputFormat.value, quality.value)
  processedSize.value = formatSize(Math.round(processedUrl.value.length * 0.75))
}

function formatSize(bytes) {
  if (bytes < 1024) return bytes + ' B'
  if (bytes < 1024 * 1024) return (bytes / 1024).toFixed(1) + ' KB'
  return (bytes / 1024 / 1024).toFixed(2) + ' MB'
}

function download() {
  const a = document.createElement('a')
  a.href = processedUrl.value
  a.download = 'processed.' + outputFormat.value.split('/')[1]
  a.click()
}
</script>

<style scoped>

.page-header { margin-bottom: 20px; }
.page-header h1 { font-size: 22px; margin-bottom: 6px; }
.page-header p { color: var(--text-secondary); font-size: 13px; }
.lang-select { width: 120px; }
.config-item { display: flex; align-items: center; gap: 8px; }
.config-item label { font-size: 13px; }
.config-input { width: 80px; }
.compare-panel { display: grid; grid-template-columns: 1fr 1fr; gap: 16px; }
.compare-item { display: flex; flex-direction: column; gap: 8px; }
.compare-item img { max-width: 100%; border-radius: var(--radius); border: 1px solid var(--border-color); }
.empty-state { text-align: center; padding: 40px; color: var(--text-secondary); }
</style>
