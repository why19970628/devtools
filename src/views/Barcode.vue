<template>
  <div class="tool-page">
    <div class="page-header">
      <h1>📊 条形码在线生成器</h1>
      <p>生成 Code128、EAN-13 等条形码图片</p>
    </div>
    <div class="action-bar">
      <select v-model="format" class="lang-select">
        <option value="CODE128">Code128</option>
        <option value="EAN13">EAN-13</option>
        <option value="CODE39">Code39</option>
      </select>
      <input v-model="text" type="text" placeholder="输入内容" class="text-input" @input="generate" />
      <button class="btn btn-primary" @click="generate">生成</button>
      <button class="btn" @click="download" v-if="barcodeUrl">下载</button>
    </div>
    <div v-if="barcodeUrl" class="barcode-preview">
      <img :src="barcodeUrl" alt="Barcode" />
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'

const text = ref('123456789012')
const format = ref('CODE128')
const barcodeUrl = ref('')

function generate() {
  if (!text.value) { barcodeUrl.value = ''; return }
  const apiUrl = `https://api.qrserver.com/v1/create-qr-code/?size=300x100&data=${encodeURIComponent(text.value)}`
  barcodeUrl.value = apiUrl
}

function download() {
  const a = document.createElement('a')
  a.href = barcodeUrl.value
  a.download = 'barcode.png'
  a.click()
}
</script>

<style scoped>

.page-header { margin-bottom: 20px; }
.page-header h1 { font-size: 22px; margin-bottom: 6px; }
.page-header p { color: var(--text-secondary); font-size: 13px; }
.lang-select { width: 120px; }
.text-input { width: 200px; }
.barcode-preview { display: flex; justify-content: center; padding: 20px; background: var(--bg-secondary); border-radius: var(--radius); }
.barcode-preview img { max-width: 100%; }
</style>
