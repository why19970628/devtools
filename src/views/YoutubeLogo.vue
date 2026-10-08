<template>
  <div class="tool-page">
    <ToolHeader />
    <div class="action-bar">
      <input v-model="text" type="text" placeholder="输入文字" class="text-input" />
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

const text = ref('YouTube')
const canvasRef = ref(null)

onMounted(() => generate())

function generate() {
  const canvas = canvasRef.value
  if (!canvas) return
  const ctx = canvas.getContext('2d')
  ctx.fillStyle = '#fff'
  ctx.fillRect(0, 0, canvas.width, canvas.height)

  ctx.fillStyle = '#FF0000'
  ctx.beginPath()
  ctx.roundRect(20, 20, 360, 80, 12)
  ctx.fill()

  ctx.fillStyle = '#fff'
  ctx.font = 'bold 48px Arial'
  ctx.textAlign = 'center'
  ctx.textBaseline = 'middle'
  ctx.fillText(text.value, 200, 60)
}

function download() {
  const canvas = canvasRef.value
  if (!canvas) return
  const link = document.createElement('a')
  link.download = 'youtube-logo.png'
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
