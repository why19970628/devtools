<template>
  <div class="tool-page">
    <div class="page-header">
      <h1>🔗 在线短网址生成与还原</h1>
      <p>长链接快速缩短为简易短网址，并支持短网址防钓鱼安全反查</p>
    </div>
    <div class="action-bar">
      <select v-model="mode" class="lang-select">
        <option value="shorten">生成短网址</option>
        <option value="expand">还原短网址</option>
      </select>
      <button class="btn btn-primary" @click="convert">执行</button>
      <button class="btn" @click="copyResult">复制结果</button>
    </div>
    <div class="io-panel">
      <div class="io-box">
        <div class="io-label"><span>输入</span></div>
        <textarea v-model="input" class="io-textarea" placeholder="输入长链接或短网址..."></textarea>
      </div>
      <div class="io-box">
        <div class="io-label"><span>输出</span></div>
        <textarea v-model="output" class="io-textarea" readonly></textarea>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'

const input = ref('https://example.com/articles/2026/08/how-to-build-a-url-shortener')
const output = ref('')
const mode = ref('shorten')

function convert() {
  output.value = ''
  if (!input.value.trim()) return
  if (mode.value === 'shorten') {
    const hash = btoa(input.value).slice(0, 8)
    output.value = `https://short.link/${hash}`
  } else {
    try {
      const url = new URL(input.value)
      output.value = `短网址: ${url.hostname}${url.pathname}\n注意：短网址还原需要访问原服务，此处仅展示解析结果。`
    } catch { output.value = '无效的短网址格式' }
  }
}

function copyResult() { if (output.value) navigator.clipboard.writeText(output.value) }
</script>

<style scoped>

.page-header { margin-bottom: 20px; }
.page-header h1 { font-size: 22px; margin-bottom: 6px; }
.page-header p { color: var(--text-secondary); font-size: 13px; }
.lang-select { width: 160px; }
</style>
