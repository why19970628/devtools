<template>
  <div class="tool-page">
    <div class="page-header">
      <h1>🌓 图片反相反色在线工具</h1>
      <p>纯前端本地 Canvas 极速像素颜色反转，生成底片负片效果并支持下载</p>
    </div>
    <div class="action-bar">
      <label class="btn" style="cursor:pointer">
        上传图片
        <input type="file" accept="image/*" style="display:none" @change="onFileChange" />
      </label>
      <button class="btn btn-primary" @click="invert" v-if="originalUrl">反色</button>
      <button class="btn" @click="download" v-if="invertedUrl">下载</button>
    </div>
    <div v-if="originalUrl" class="compare-panel">
      <div class="compare-item">
        <span class="io-label">原图</span>
        <img :src="originalUrl" alt="Original" />
      </div>
      <div class="compare-item" v-if="invertedUrl">
        <span class="io-label">反色</span>
        <img :src="invertedUrl" alt="Inverted" />
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
const invertedUrl = ref('')
const canvasRef = ref(null)

function onFileChange(e) {
  const file = e.target.files[0]
  if (!file) return
  originalUrl.value = URL.createObjectURL(file)
  invertedUrl.value = ''
}

function invert() {
  const img = new Image()
  img.onload = () => {
    const canvas = document.createElement('canvas')
    canvas.width = img.width
    canvas.height = img.height
    const ctx = canvas.getContext('2d')
    ctx.drawImage(img, 0, 0)
    const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height)
    const data = imageData.data
    for (let i = 0; i < data.length; i += 4) {
      data[i] = 255 - data[i]
      data[i + 1] = 255 - data[i + 1]
      data[i + 2] = 255 - data[i + 2]
    }
    ctx.putImageData(imageData, 0, 0)
    invertedUrl.value = canvas.toDataURL('image/png')
  }
  img.src = originalUrl.value
}

function download() {
  const a = document.createElement('a')
  a.href = invertedUrl.value
  a.download = 'inverted.png'
  a.click()
}
</script>

<style scoped>

.page-header { margin-bottom: 20px; }
.page-header h1 { font-size: 22px; margin-bottom: 6px; }
.page-header p { color: var(--text-secondary); font-size: 13px; }
.compare-panel { display: grid; grid-template-columns: 1fr 1fr; gap: 16px; }
.compare-item { display: flex; flex-direction: column; gap: 8px; }
.compare-item img { max-width: 100%; border-radius: var(--radius); border: 1px solid var(--border-color); }
.empty-state { text-align: center; padding: 40px; color: var(--text-secondary); }
</style>
