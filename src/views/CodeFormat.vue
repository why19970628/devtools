<template>
  <div class="tool-page">
    <div class="page-header">
      <h1>💻 HTML / JS / CSS 格式化</h1>
      <p>HTML、JavaScript、CSS 代码美化与紧凑压缩</p>
    </div>
    <div class="action-bar">
      <select v-model="lang" class="lang-select">
        <option value="html">HTML</option>
        <option value="js">JavaScript</option>
        <option value="css">CSS</option>
      </select>
      <select v-model="mode" class="lang-select">
        <option value="format">格式化</option>
        <option value="compress">压缩</option>
      </select>
      <button class="btn btn-primary" @click="convert">执行</button>
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

const input = ref(`function greet(name){const msg="Hello, "+name;console.log(msg);return{name,msg};}`)
const output = ref('')
const lang = ref('html')
const mode = ref('format')

function convert() {
  output.value = ''
  if (!input.value.trim()) return
  if (mode.value === 'compress') {
    output.value = compress(input.value, lang.value)
  } else {
    output.value = format(input.value, lang.value)
  }
}

function format(code, type) {
  if (type === 'js') return formatJs(code)
  if (type === 'css') return formatCss(code)
  return formatHtml(code)
}

function formatJs(code) {
  let formatted = ''
  let indent = 0
  const indentStr = '  '
  for (let i = 0; i < code.length; i++) {
    const ch = code[i]
    if (ch === '{' || ch === '[') {
      formatted += ch + '\n' + indentStr.repeat(++indent)
    } else if (ch === '}' || ch === ']') {
      formatted += '\n' + indentStr.repeat(--indent) + ch
    } else if (ch === ';') {
      formatted += ch + '\n' + indentStr.repeat(indent)
    } else if (ch === ',') {
      formatted += ch + '\n' + indentStr.repeat(indent)
    } else if (ch === '\n') {
      formatted += '\n' + indentStr.repeat(indent)
    } else {
      formatted += ch
    }
  }
  return formatted.trim()
}

function formatCss(code) {
  return code.replace(/\s*{\s*/g, ' {\n  ').replace(/\s*}\s*/g, '\n}\n').replace(/\s*;\s*/g, ';\n  ').replace(/\s*,\s*/g, ', ').trim()
}

function formatHtml(code) {
  let formatted = ''
  let indent = 0
  const indentStr = '  '
  const tokens = code.replace(/>\s+</g, '><').split(/(?=<)/)
  for (const token of tokens) {
    if (token.startsWith('</')) indent--
    formatted += indentStr.repeat(Math.max(0, indent)) + token.trim() + '\n'
    if (token.startsWith('<') && !token.startsWith('</') && !token.startsWith('<!') && !token.endsWith('/>') && !token.includes('>')) indent++
  }
  return formatted.trim()
}

function compress(code, type) {
  if (type === 'html') return code.replace(/>\s+</g, '><').replace(/\s+/g, ' ').trim()
  if (type === 'css') return code.replace(/\s+/g, ' ').replace(/\s*([{}:;,])\s*/g, '$1').trim()
  return code.replace(/\s+/g, ' ').trim()
}

function copyResult() { if (output.value) navigator.clipboard.writeText(output.value) }
</script>

<style scoped>

.page-header { margin-bottom: 20px; }
.page-header h1 { font-size: 22px; margin-bottom: 6px; }
.page-header p { color: var(--text-secondary); font-size: 13px; }
.lang-select { width: 140px; }
</style>
