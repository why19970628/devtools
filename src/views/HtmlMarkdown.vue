<template>
  <div class="tool-page">
    <ToolHeader />
    <div class="action-bar">
      <select v-model="mode" class="lang-select">
        <option value="html2md">HTML → Markdown</option>
        <option value="md2html">Markdown → HTML</option>
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
  </div>
</template>

<script setup>
import { ref } from 'vue'

const input = ref(`<h1>标题</h1>
<p>这是**一段**示例文本，点击<a href="https://example.com">链接</a>查看更多。</p>
<ul><li>项目一</li><li>项目二</li></ul>`)
const output = ref('')
const mode = ref('html2md')

function convert() {
  output.value = ''
  if (!input.value.trim()) return
  output.value = mode.value === 'html2md' ? htmlToMarkdown(input.value) : markdownToHtml(input.value)
}

function htmlToMarkdown(html) {
  let md = html
  md = md.replace(/<h1[^>]*>(.*?)<\/h1>/gi, '# $1\n\n')
  md = md.replace(/<h2[^>]*>(.*?)<\/h2>/gi, '## $1\n\n')
  md = md.replace(/<h3[^>]*>(.*?)<\/h3>/gi, '### $1\n\n')
  md = md.replace(/<h4[^>]*>(.*?)<\/h4>/gi, '#### $1\n\n')
  md = md.replace(/<h5[^>]*>(.*?)<\/h5>/gi, '##### $1\n\n')
  md = md.replace(/<h6[^>]*>(.*?)<\/h6>/gi, '###### $1\n\n')
  md = md.replace(/<strong[^>]*>(.*?)<\/strong>/gi, '**$1**')
  md = md.replace(/<b[^>]*>(.*?)<\/b>/gi, '**$1**')
  md = md.replace(/<em[^>]*>(.*?)<\/em>/gi, '*$1*')
  md = md.replace(/<i[^>]*>(.*?)<\/i>/gi, '*$1*')
  md = md.replace(/<a\s+href="([^"]*)"[^>]*>(.*?)<\/a>/gi, '[$2]($1)')
  md = md.replace(/<img\s+[^>]*src="([^"]*)"[^>]*alt="([^"]*)"[^>]*\/?>/gi, '![$2]($1)')
  md = md.replace(/<img\s+[^>]*src="([^"]*)"[^>]*\/?>/gi, '![]($1)')
  md = md.replace(/<code[^>]*>(.*?)<\/code>/gi, '`$1`')
  md = md.replace(/<pre[^>]*>(.*?)<\/pre>/gis, '```\n$1\n```\n')
  md = md.replace(/<li[^>]*>(.*?)<\/li>/gi, '- $1\n')
  md = md.replace(/<ul[^>]*>/gi, '\n').replace(/<\/ul>/gi, '\n')
  md = md.replace(/<ol[^>]*>/gi, '\n').replace(/<\/ol>/gi, '\n')
  md = md.replace(/<br\s*\/?>/gi, '\n')
  md = md.replace(/<p[^>]*>(.*?)<\/p>/gi, '$1\n\n')
  md = md.replace(/<[^>]+>/g, '')
  md = md.replace(/&amp;/g, '&').replace(/&lt;/g, '<').replace(/&gt;/g, '>').replace(/&quot;/g, '"')
  return md.replace(/\n{3,}/g, '\n\n').trim()
}

function markdownToHtml(md) {
  let html = md
  html = html.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;')
  html = html.replace(/^###### (.*)$/gm, '<h6>$1</h6>')
  html = html.replace(/^##### (.*)$/gm, '<h5>$1</h5>')
  html = html.replace(/^#### (.*)$/gm, '<h4>$1</h4>')
  html = html.replace(/^### (.*)$/gm, '<h3>$1</h3>')
  html = html.replace(/^## (.*)$/gm, '<h2>$1</h2>')
  html = html.replace(/^# (.*)$/gm, '<h1>$1</h1>')
  html = html.replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')
  html = html.replace(/\*(.*?)\*/g, '<em>$1</em>')
  html = html.replace(/\[(.*?)\]\((.*?)\)/g, '<a href="$2">$1</a>')
  html = html.replace(/!\[(.*?)\]\((.*?)\)/g, '<img src="$2" alt="$1">')
  html = html.replace(/`(.*?)`/g, '<code>$1</code>')
  html = html.replace(/```([\s\S]*?)```/g, '<pre>$1</pre>')
  html = html.replace(/^- (.*)$/gm, '<li>$1</li>')
  html = html.replace(/(<li>.*<\/li>\n?)+/g, '<ul>$&</ul>')
  html = html.replace(/\n\n/g, '</p><p>')
  html = '<p>' + html + '</p>'
  return html
}

function copyResult() { if (output.value) navigator.clipboard.writeText(output.value) }
</script>

<style scoped>

.page-header { margin-bottom: 20px; }
.page-header h1 { font-size: 22px; margin-bottom: 6px; }
.page-header p { color: var(--text-secondary); font-size: 13px; }
.lang-select { width: 180px; }
</style>
