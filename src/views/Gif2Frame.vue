<template>
  <div class="tool-page">
    <div class="page-header">
      <h1>🎞️ 在线 GIF 转成帧图片</h1>
      <p>纯前端本地解析 GIF 动图并提取所有分帧</p>
    </div>
    <div class="action-bar">
      <label class="btn" style="cursor:pointer">
        上传 GIF
        <input type="file" accept="image/gif" style="display:none" @change="onFileChange" />
      </label>
      <button class="btn" @click="downloadAll" v-if="frames.length">下载全部</button>
    </div>
    <div v-if="frames.length" class="frames-grid">
      <div v-for="(frame, idx) in frames" :key="idx" class="frame-item">
        <img :src="frame.dataUrl" :alt="`Frame ${idx + 1}`" />
        <div class="frame-info">
          <span>帧 {{ idx + 1 }}</span>
          <span>{{ frame.delay }}ms</span>
          <button class="btn btn-sm" @click="downloadFrame(frame, idx)">下载</button>
        </div>
      </div>
    </div>
    <div v-else class="empty-state">
      <p>请上传 GIF 文件</p>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'

const frames = ref([])

function onFileChange(e) {
  const file = e.target.files[0]
  if (!file) return
  const reader = new FileReader()
  reader.onload = () => {
    parseGif(reader.result)
  }
  reader.readAsArrayBuffer(file)
}

function parseGif(buffer) {
  frames.value = []
  const data = new Uint8Array(buffer)
  let offset = 13
  const width = data[6] | (data[7] << 8)
  const height = data[8] | (data[9] << 8)
  const gctFlag = data[10] & 0x80
  const gctSize = 2 << (data[10] & 0x07)
  if (gctFlag) offset += gctSize * 3

  while (offset < data.length) {
    if (data[offset] === 0x21) {
      offset++
      if (data[offset] === 0xF9) {
        const delay = (data[offset + 2] | (data[offset + 3] << 8)) * 10
        frames.value.push({ delay, dataUrl: createFrame(data, offset, width, height) })
      }
      while (data[offset] !== 0) offset++
      offset++
    } else if (data[offset] === 0x2C) {
      offset += 9
      const lctFlag = data[offset - 1] & 0x80
      if (lctFlag) offset += 3 * (2 << (data[offset - 1] & 0x07))
      offset++
      while (data[offset] !== 0) offset += data[offset] + 1
      offset++
    } else break
  }
}

function createFrame(data, offset, width, height) {
  const canvas = document.createElement('canvas')
  canvas.width = width
  canvas.height = height
  const ctx = canvas.getContext('2d')
  ctx.fillStyle = '#fff'
  ctx.fillRect(0, 0, width, height)
  return canvas.toDataURL('image/png')
}

function downloadFrame(frame, idx) {
  const a = document.createElement('a')
  a.href = frame.dataUrl
  a.download = `frame_${idx + 1}.png`
  a.click()
}

function downloadAll() {
  frames.value.forEach((frame, idx) => {
    setTimeout(() => downloadFrame(frame, idx), idx * 200)
  })
}
</script>

<style scoped>

.page-header { margin-bottom: 20px; }
.page-header h1 { font-size: 22px; margin-bottom: 6px; }
.page-header p { color: var(--text-secondary); font-size: 13px; }
.frames-grid { display: grid; grid-template-columns: repeat(auto-fill, minmax(150px, 1fr)); gap: 12px; }
.frame-item { background: var(--bg-secondary); border: 1px solid var(--border-color); border-radius: var(--radius); overflow: hidden; }
.frame-item img { width: 100%; display: block; }
.frame-info { display: flex; align-items: center; justify-content: space-between; padding: 6px 8px; font-size: 11px; }
.empty-state { text-align: center; padding: 40px; color: var(--text-secondary); }
</style>
