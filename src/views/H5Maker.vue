<template>
  <div class="tool-page">
    <div class="page-header">
      <h1>📱 H5 页面制作工具</h1>
      <p>在线编写并实时预览 H5 页面</p>
    </div>
    <div class="action-bar">
      <button class="btn btn-primary" @click="run">运行</button>
      <button class="btn" @click="exportHtml">导出 HTML</button>
    </div>
    <div class="io-panel">
      <div class="io-box">
        <div class="io-label"><span>HTML 源码</span></div>
        <textarea v-model="html" class="io-textarea" placeholder="<div>你的 H5 页面</div>"></textarea>
      </div>
      <div class="io-box">
        <div class="io-label"><span>预览 (手机视图)</span></div>
        <div class="phone-frame">
          <iframe :srcdoc="preview" sandbox="allow-scripts"></iframe>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'

const html = ref(`<div class="card">
  <h2>Hello H5</h2>
  <p>在左侧编辑源码，点击「运行」预览</p>
</div>
<style>
.card { padding: 24px; text-align: center; color: #333; }
.card h2 { color: #4f8cff; }
</style>`)
const preview = ref('')

function run() {
  preview.value = `<!DOCTYPE html><html><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"><style>body{margin:0;font-family:sans-serif}</style></head><body>${html.value}</body></html>`
}

function exportHtml() {
  const blob = new Blob([preview.value || html.value], { type: 'text/html' })
  const a = document.createElement('a')
  a.href = URL.createObjectURL(blob)
  a.download = 'h5.html'
  a.click()
}
</script>

<style scoped>

.page-header { margin-bottom: 20px; }
.page-header h1 { font-size: 22px; margin-bottom: 6px; }
.page-header p { color: var(--text-secondary); font-size: 13px; }
.phone-frame { width: 375px; height: 667px; margin: 0 auto; border: 2px solid var(--border-color); border-radius: 12px; overflow: hidden; background: #fff; }
.phone-frame iframe { width: 100%; height: 100%; border: 0; }
</style>
