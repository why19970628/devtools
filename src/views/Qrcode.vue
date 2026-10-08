<template>
  <div class="tool-page">
    <ToolHeader />
    <div class="qr-config">
      <div class="config-item">
        <label>内容</label>
        <textarea v-model="text" class="io-textarea" placeholder="输入文本或网址..."></textarea>
      </div>
      <div class="config-item">
        <label>尺寸</label>
        <input v-model.number="size" type="number" min="100" max="1000" class="config-input" />
      </div>
      <div class="config-item">
        <label>颜色</label>
        <input type="color" v-model="color" class="color-picker" />
      </div>
      <button class="btn btn-primary" @click="generate">生成二维码</button>
      <button class="btn" @click="download" v-if="qrDataUrl">下载 PNG</button>
    </div>
    <div v-if="qrDataUrl" class="qr-result">
      <img :src="qrDataUrl" alt="QR Code" />
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'

const text = ref('https://www.devtools.cn')
const size = ref(300)
const color = ref('#000000')
const qrDataUrl = ref('')

function generate() {
  if (!text.value.trim()) return
  const qrApi = `https://api.qrserver.com/v1/create-qr-code/?size=${size.value}x${size.value}&color=${color.value.slice(1)}&data=${encodeURIComponent(text.value)}`
  qrDataUrl.value = qrApi
}

function download() {
  const a = document.createElement('a')
  a.href = qrDataUrl.value
  a.download = 'qrcode.png'
  a.click()
}
</script>

<style scoped>

.page-header { margin-bottom: 20px; }
.page-header h1 { font-size: 22px; margin-bottom: 6px; }
.page-header p { color: var(--text-secondary); font-size: 13px; }
.qr-config { display: flex; flex-direction: column; gap: 12px; margin-bottom: 20px; }
.config-item { display: flex; flex-direction: column; gap: 4px; }
.config-item .io-textarea { min-height: 55vh; }
.config-item label { font-size: 13px; color: var(--text-secondary); }
.config-input { width: 120px; }
.color-picker { width: 60px; height: 36px; border: none; cursor: pointer; }
.qr-result { text-align: center; padding: 20px; background: var(--bg-secondary); border-radius: var(--radius); }
.qr-result img { max-width: 100%; height: auto; }
</style>
