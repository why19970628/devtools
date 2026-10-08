<template>
  <div class="tool-page">
    <div class="page-header">
      <h1>💬 HTML 与 UBB 代码互转</h1>
      <p>论坛 UBB 代码与 HTML 标签双向转换及实时渲染预览</p>
    </div>
    <div class="action-bar">
      <select v-model="mode" class="lang-select">
        <option value="html2ubb">HTML → UBB</option>
        <option value="ubb2html">UBB → HTML</option>
      </select>
      <button class="btn btn-primary" @click="convert">转换</button>
      <button class="btn" @click="copyResult">复制结果</button>
    </div>
    <div class="io-panel">
      <div class="io-box">
        <div class="io-label"><span>输入</span></div>
        <textarea v-model="input" class="io-textarea"></textarea>
      </div>
      <div class="io-box">
        <div class="io-label"><span>输出</span></div>
        <textarea v-model="output" class="io-textarea" readonly></textarea>
      </div>
    </div>
    <div v-if="mode === 'ubb2html' && output" class="preview-section">
      <div class="card">
        <div class="card-header"><span class="card-title">预览</span></div>
        <div class="preview-content" v-html="output"></div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'

const input = ref(`<b>加粗文本</b> 与 <i>斜体文本</i>
<a href="https://example.com">示例链接</a>
<img src="https://example.com/logo.png">`)
const output = ref('')
const mode = ref('html2ubb')

function convert() {
  output.value = ''
  if (!input.value.trim()) return
  output.value = mode.value === 'html2ubb' ? htmlToUbb(input.value) : ubbToHtml(input.value)
}

function htmlToUbb(html) {
  let ubb = html
  ubb = ubb.replace(/<b>(.*?)<\/b>/gi, '[b]$1[/b]')
  ubb = ubb.replace(/<i>(.*?)<\/i>/gi, '[i]$1[/i]')
  ubb = ubb.replace(/<u>(.*?)<\/u>/gi, '[u]$1[/u]')
  ubb = ubb.replace(/<s>(.*?)<\/s>/gi, '[s]$1[/s]')
  ubb = ubb.replace(/<a\s+href="([^"]*)"[^>]*>(.*?)<\/a>/gi, '[url=$1]$2[/url]')
  ubb = ubb.replace(/<img\s+[^>]*src="([^"]*)"[^>]*\/?>/gi, '[img]$1[/img]')
  ubb = ubb.replace(/<br\s*\/?>/gi, '\n')
  ubb = ubb.replace(/<p[^>]*>(.*?)<\/p>/gi, '$1\n\n')
  ubb = ubb.replace(/<[^>]+>/g, '')
  return ubb
}

function ubbToHtml(ubb) {
  let html = ubb
  html = html.replace(/\[b\](.*?)\[\/b\]/gi, '<b>$1</b>')
  html = html.replace(/\[i\](.*?)\[\/i\]/gi, '<i>$1</i>')
  html = html.replace(/\[u\](.*?)\[\/u\]/gi, '<u>$1</u>')
  html = html.replace(/\[s\](.*?)\[\/s\]/gi, '<s>$1</s>')
  html = html.replace(/\[url=(.*?)\](.*?)\[\/url\]/gi, '<a href="$1">$2</a>')
  html = html.replace(/\[img\](.*?)\[\/img\]/gi, '<img src="$1">')
  html = html.replace(/\n/g, '<br>')
  return html
}

function copyResult() { if (output.value) navigator.clipboard.writeText(output.value) }
</script>

<style scoped>

.page-header { margin-bottom: 20px; }
.page-header h1 { font-size: 22px; margin-bottom: 6px; }
.page-header p { color: var(--text-secondary); font-size: 13px; }
.lang-select { width: 160px; }
.preview-section { margin-top: 16px; }
.preview-content { padding: 12px; line-height: 1.6; }
</style>
