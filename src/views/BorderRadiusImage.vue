<template>
  <div class="tool-page">
    <div class="page-header">
      <h1>🔘 在线生成圆角图片与头像</h1>
      <p>图片快速裁切为自定义圆角矩形或圆形头像，输出透明通道 PNG</p>
    </div>
    <div class="action-bar">
      <label class="btn" style="cursor:pointer">
        上传图片
        <input type="file" accept="image/*" style="display:none" @change="onFileChange" />
      </label>
      <div class="config-item">
        <label>圆角半径</label>
        <input v-model.number="radius" type="number" min="0" class="config-input" @input="draw" />
      </div>
      <div class="config-item">
        <label><input type="checkbox" v-model="circle" @change="draw" /> 圆形</label>
      </div>
      <button class="btn" @click="download" v-if="canvasRef">下载 PNG</button>
    </div>
    <div v-if="imageUrl" class="preview-section">
      <canvas ref="canvasRef" width="300" height="300"></canvas>
    </div>
    <div v-else class="empty-state">
      <p>请上传图片</p>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'

const imageUrl = ref('')
const radius = ref(20)
const circle = ref(false)
const canvasRef = ref(null)
let img = null

function onFileChange(e) {
  const file = e.target.files[0]
  if (!file) return
  imageUrl.value = URL.createObjectURL(file)
  img = new Image()
  img.onload = () => draw()
  img.src = imageUrl.value
}

function draw() {
  if (!img || !canvasRef.value) return
  const canvas = canvasRef.value
  const ctx = canvas.getContext('2d')
  ctx.clearRect(0, 0, canvas.width, canvas.height)
  const size = Math.min(img.width, img.height)
  const x = (img.width - size) / 2
  const y = (img.height - size) / 2

  ctx.save()
  ctx.beginPath()
  if (circle.value) {
    ctx.arc(canvas.width / 2, canvas.height / 2, size / 2, 0, Math.PI * 2)
  } else {
    ctx.roundRect(0, 0, canvas.width, canvas.height, radius.value)
  }
  ctx.clip()
  ctx.drawImage(img, x, y, size, size, 0, 0, canvas.width, canvas.height)
  ctx.restore()
}

function download() {
  const canvas = canvasRef.value
  if (!canvas) return
  const link = document.createElement('a')
  link.download = 'rounded.png'
  link.href = canvas.toDataURL('image/png')
  link.click()
}
</script>

<style scoped>

.page-header { margin-bottom: 20px; }
.page-header h1 { font-size: 22px; margin-bottom: 6px; }
.page-header p { color: var(--text-secondary); font-size: 13px; }
.config-item { display: flex; align-items: center; gap: 8px; }
.config-item label { font-size: 13px; }
.config-input { width: 80px; }
.preview-section { display: flex; justify-content: center; padding: 20px; background: var(--bg-secondary); border-radius: var(--radius); }
.empty-state { text-align: center; padding: 40px; color: var(--text-secondary); }
</style>
