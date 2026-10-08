<template>
  <div class="tool-page">
    <div class="page-header">
      <h1>🔤 Base64 编解码</h1>
      <p>文本或图片文件的 Base64 编码与解码转换</p>
    </div>
    <div class="action-bar">
      <select v-model="mode" class="lang-select">
        <option value="encode">编码</option>
        <option value="decode">解码</option>
      </select>
      <button class="btn btn-primary" @click="convert">转换</button>
      <button class="btn" @click="copyResult">复制结果</button>
      <label class="btn" style="cursor:pointer">
        上传文件
        <input type="file" style="display:none" @change="onFileChange" />
      </label>
    </div>
    <div class="io-panel">
      <div class="io-box">
        <div class="io-label"><span>输入</span></div>
        <textarea v-model="input" class="io-textarea" placeholder="输入文本..."></textarea>
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

const input = ref(`Hello, DevTools!
第二行：中文与符号 @#$%
Third line: https://example.com`)
const output = ref('')
const mode = ref('encode')

function convert() {
  output.value = ''
  if (!input.value.trim()) return
  try {
    if (mode.value === 'encode') {
      output.value = btoa(unescape(encodeURIComponent(input.value)))
    } else {
      output.value = decodeURIComponent(escape(atob(input.value.trim())))
    }
  } catch (e) {
    output.value = '错误: ' + e.message
  }
}

function onFileChange(e) {
  const file = e.target.files[0]
  if (!file) return
  const reader = new FileReader()
  reader.onload = () => {
    if (file.type.startsWith('text/')) {
      input.value = reader.result
    } else {
      input.value = reader.result.split(',')[1]
      mode.value = 'encode'
      output.value = input.value
    }
  }
  if (file.type.startsWith('text/')) reader.readAsText(file)
  else reader.readAsDataURL(file)
}

function copyResult() { if (output.value) navigator.clipboard.writeText(output.value) }
</script>

<style scoped>

.page-header { margin-bottom: 20px; }
.page-header h1 { font-size: 22px; margin-bottom: 6px; }
.page-header p { color: var(--text-secondary); font-size: 13px; }
.lang-select { width: 120px; }
</style>
