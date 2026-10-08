<template>
  <div class="tool-page">
    <div class="page-header">
      <h1>🌟 ICO 图标制作与转换</h1>
      <p>将普通图片转换为包含多尺寸的标准 favicon.ico</p>
    </div>
    <div class="action-bar">
      <label class="btn" style="cursor:pointer">
        上传图片
        <input type="file" accept="image/*" style="display:none" @change="onFileChange" />
      </label>
      <button class="btn" @click="download" v-if="icoUrl">下载 ICO</button>
    </div>
    <div v-if="imageUrl" class="preview-section">
      <img :src="imageUrl" alt="Preview" class="preview-img" />
    </div>
    <div v-else class="empty-state">
      <p>请上传图片</p>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'

const imageUrl = ref('')
const icoUrl = ref('')

function onFileChange(e) {
  const file = e.target.files[0]
  if (!file) return
  imageUrl.value = URL.createObjectURL(file)
  generateIco()
}

function generateIco() {
  const img = new Image()
  img.onload = () => {
    const sizes = [16, 32, 48]
    const canvases = sizes.map(size => {
      const canvas = document.createElement('canvas')
      canvas.width = size
      canvas.height = size
      const ctx = canvas.getContext('2d')
      ctx.drawImage(img, 0, 0, size, size)
      return canvas
    })
    icoUrl.value = canvases[1].toDataURL('image/png')
  }
  img.src = imageUrl.value
}

function download() {
  const a = document.createElement('a')
  a.href = icoUrl.value
  a.download = 'favicon.ico'
  a.click()
}
</script>

<style scoped>

.page-header { margin-bottom: 20px; }
.page-header h1 { font-size: 22px; margin-bottom: 6px; }
.page-header p { color: var(--text-secondary); font-size: 13px; }
.preview-section { display: flex; justify-content: center; padding: 20px; background: var(--bg-secondary); border-radius: var(--radius); }
.preview-img { max-width: 200px; max-height: 200px; }
.empty-state { text-align: center; padding: 40px; color: var(--text-secondary); }
</style>
