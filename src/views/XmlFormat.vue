<template>
  <div class="tool-page">
    <div class="page-header">
      <h1>📰 XML 格式化 / 压缩</h1>
      <p>在线 XML 语法校验、缩进排版美化、极简压缩、实体转义、XML转JSON</p>
    </div>
    <div class="action-bar">
      <select v-model="mode" class="lang-select">
        <option value="format">格式化</option>
        <option value="compress">压缩</option>
        <option value="toJson">转 JSON</option>
      </select>
      <button class="btn btn-primary" @click="convert">执行</button>
      <button class="btn" @click="copyResult">复制结果</button>
    </div>
    <div v-if="error" class="error-msg">{{ error }}</div>
    <div class="io-panel">
      <div class="io-box">
        <div class="io-label"><span>输入 XML</span></div>
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

const input = ref('<note><to>User</to><from>DevTools</from><heading>Reminder</heading><body>Format this XML</body></note>')
const output = ref('')
const error = ref('')
const mode = ref('format')

function convert() {
  output.value = ''
  error.value = ''
  if (!input.value.trim()) return
  try {
    const parser = new DOMParser()
    const doc = parser.parseFromString(input.value, 'text/xml')
    if (doc.querySelector('parsererror')) { error.value = 'XML 解析错误'; return }
    if (mode.value === 'format') {
      output.value = formatXml(doc.documentElement)
    } else if (mode.value === 'compress') {
      output.value = input.value.replace(/>\s+</g, '><').replace(/\s+/g, ' ').trim()
    } else {
      output.value = JSON.stringify(xmlToJson(doc.documentElement), null, 2)
    }
  } catch (e) { error.value = e.message }
}

function formatXml(node, indent = 0) {
  const pad = '  '.repeat(indent)
  if (node.nodeType === 3) return node.textContent.trim()
  if (node.nodeType !== 1) return ''
  let xml = `${pad}<${node.nodeName}`
  if (node.attributes) {
    for (let i = 0; i < node.attributes.length; i++) {
      xml += ` ${node.attributes[i].name}="${node.attributes[i].value}"`
    }
  }
  const children = [...node.childNodes]
  if (children.length === 0) return xml + '/>'
  xml += '>'
  const hasOnlyText = children.length === 1 && children[0].nodeType === 3
  if (hasOnlyText) {
    xml += children[0].textContent.trim() + `</${node.nodeName}>`
  } else {
    xml += '\n'
    for (const child of children) {
      const childXml = formatXml(child, indent + 1)
      if (childXml) xml += childXml + '\n'
    }
    xml += pad + `</${node.nodeName}>`
  }
  return xml
}

function xmlToJson(node) {
  if (node.nodeType === 3) return node.textContent
  const obj = {}
  if (node.attributes && node.attributes.length > 0) {
    for (let i = 0; i < node.attributes.length; i++) {
      obj['@' + node.attributes[i].name] = node.attributes[i].value
    }
  }
  if (node.childNodes.length === 1 && node.childNodes[0].nodeType === 3) {
    return node.childNodes[0].textContent
  }
  for (let i = 0; i < node.childNodes.length; i++) {
    const child = node.childNodes[i]
    if (child.nodeType === 1) {
      const childData = xmlToJson(child)
      if (obj[child.nodeName]) {
        if (!Array.isArray(obj[child.nodeName])) obj[child.nodeName] = [obj[child.nodeName]]
        obj[child.nodeName].push(childData)
      } else {
        obj[child.nodeName] = childData
      }
    }
  }
  return obj
}

function copyResult() { if (output.value) navigator.clipboard.writeText(output.value) }
</script>

<style scoped>

.page-header { margin-bottom: 20px; }
.page-header h1 { font-size: 22px; margin-bottom: 6px; }
.page-header p { color: var(--text-secondary); font-size: 13px; }
.lang-select { width: 120px; }
.error-msg { color: var(--danger); padding: 10px; }
</style>
