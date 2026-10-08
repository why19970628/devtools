<template>
  <div class="tool-page">
    <div class="page-header">
      <h1>🎬 在线视频转成帧图片 (抽帧工具)</h1>
      <p>纯前端提取视频关键帧，支持自定义提取频率</p>
    </div>
    <div class="action-bar">
      <label class="btn" style="cursor:pointer">
        上传视频
        <input type="file" accept="video/*" style="display:none" @change="onFileChange" />
      </label>
      <div class="config-item">
        <label>提取间隔 (秒)</label>
        <input v-model.number="interval" type="number" min="0.01" step="0.1" class="config-input" />
      </div>
      <button class="btn" @click="downloadAll" v-if="frames.length">下载全部</button>
    </div>
    <video ref="videoRef" style="display:none" @loadedmetadata="onLoaded"></video>
    <div v-if="frames.length" class="frames-grid">
      <div v-for="(frame, idx) in frames" :key="idx" class="frame-item">
        <img :src="frame.dataUrl" :alt="`Frame ${idx + 1}`" />
        <div class="frame-info">
          <span>{{ frame.time.toFixed(1) }}s</span>
          <button class="btn btn-sm" @click="downloadFrame(frame, idx)">下载</button>
        </div>
      </div>
    </div>
    <div v-else class="empty-state">
      <p>请上传视频文件</p>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'

const videoRef = ref(null)
const frames = ref([])
const interval = ref(1)
const videoUrl = ref('')

function onFileChange(e) {
  const file = e.target.files[0]
  if (!file) return
  videoUrl.value = URL.createObjectURL(file)
  if (videoRef.value) videoRef.value.src = videoUrl.value
}

function onLoaded() {
  extractFrames()
}

function extractFrames() {
  frames.value = []
  const video = videoRef.value
  if (!video) return
  const duration = video.duration
  const canvas = document.createElement('canvas')
  canvas.width = video.videoWidth
  canvas.height = video.videoHeight
  const ctx = canvas.getContext('2d')

  let currentTime = 0
  const capture = () => {
    if (currentTime > duration) return
    video.currentTime = currentTime
    video.addEventListener('seeked', () => {
      ctx.drawImage(video, 0, 0)
      frames.value.push({ dataUrl: canvas.toDataURL('image/jpeg', 0.8), time: currentTime })
      currentTime += interval.value
      capture()
    }, { once: true })
  }
  capture()
}

function downloadFrame(frame, idx) {
  const a = document.createElement('a')
  a.href = frame.dataUrl
  a.download = `frame_${idx + 1}_${frame.time.toFixed(1)}s.jpg`
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
.config-item { display: flex; align-items: center; gap: 8px; }
.config-item label { font-size: 13px; }
.config-input { width: 80px; }
.frames-grid { display: grid; grid-template-columns: repeat(auto-fill, minmax(150px, 1fr)); gap: 12px; }
.frame-item { background: var(--bg-secondary); border: 1px solid var(--border-color); border-radius: var(--radius); overflow: hidden; }
.frame-item img { width: 100%; display: block; }
.frame-info { display: flex; align-items: center; justify-content: space-between; padding: 6px 8px; font-size: 11px; }
.empty-state { text-align: center; padding: 40px; color: var(--text-secondary); }
</style>
