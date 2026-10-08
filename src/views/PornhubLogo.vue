<template>
  <div class="tool-page">
    <ToolHeader />
    <div class="action-bar">
      <input v-model="text1" type="text" placeholder="第一段文字" class="text-input" />
      <input v-model="text2" type="text" placeholder="第二段文字" class="text-input" />
      <button class="btn btn-primary" @click="generate">生成</button>
      <button class="btn" @click="download" v-if="canvasRef">下载 PNG</button>
    </div>
    <div class="logo-preview">
      <canvas ref="canvasRef" width="400" height="120"></canvas>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'

const text1 = ref('Porn')
const text2 = ref('hub')
const canvasRef = ref(null)

onMounted(() => generate())

function generate() {
  const canvas = canvasRef.value
  if (!canvas) return
  const ctx = canvas.getContext('2d')
  ctx.fillStyle = '#000'
  ctx.fillRect(0, 0, canvas.width, canvas.height)

  const drawSegment = (text, x, y, w, h, bgColor) => {
    ctx.fillStyle = bgColor
    ctx.beginPath()
    ctx.roundRect(x, y, w, h, 8)
    ctx.fill()
    ctx.fillStyle = '#fff'
    ctx.font = 'bold 48px Arial'
    ctx.textAlign = 'center'
    ctx.textBaseline = 'middle'
    ctx.fillText(text, x + w / 2, y + h / 2)
  }

  const w1 = ctx.measureText(text1.value).width + 40
  drawSegment(text1.value, 20, 30, w1, 60, '#000')
  drawSegment(text2.value, 30 + w1, 30, ctx.measureText(text2.value).width + 40, 60, '#FF9900')
}

function download() {
  const canvas = canvasRef.value
  if (!canvas) return
  const link = document.createElement('a')
  link.download = 'pornhub-logo.png'
  link.href = canvas.toDataURL('image/png')
  link.click()
}
</script>

<style scoped>

.page-header { margin-bottom: 20px; }
.page-header h1 { font-size: 22px; margin-bottom: 6px; }
.page-header p { color: var(--text-secondary); font-size: 13px; }
.text-input { width: 150px; }
.logo-preview { background: var(--bg-secondary); border: 1px solid var(--border-color); border-radius: var(--radius); padding: 20px; display: flex; justify-content: center; }
</style>
