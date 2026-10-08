<template>
  <div class="tool-page">
    <ToolHeader />

    <div class="action-bar">
      <select v-model="conversionType" class="lang-select">
        <option value="json2xml">JSON → XML</option>
        <option value="xml2json">XML → JSON</option>
        <option value="json2yaml">JSON → YAML</option>
        <option value="yaml2json">YAML → JSON</option>
        <option value="json2get">JSON → GET参数</option>
      </select>
      <button class="btn btn-primary" @click="convert">转换</button>
      <button class="btn" @click="copyResult">复制结果</button>
    </div>

    <div class="io-panel">
      <div class="io-box">
        <div class="io-label"><span>输入</span></div>
        <textarea v-model="input" class="io-textarea" placeholder="在此输入..."></textarea>
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

const input = ref(`{
  "name": "DevTools",
  "version": "1.0.0",
  "features": ["json", "format", "convert"]
}`)
const output = ref('')
const conversionType = ref('json2xml')

function convert() {
  output.value = ''
  if (!input.value.trim()) return
  try {
    switch (conversionType.value) {
      case 'json2xml': output.value = jsonToXml(JSON.parse(input.value)); break
      case 'xml2json': output.value = JSON.stringify(xmlToJson(input.value), null, 2); break
      case 'json2yaml': output.value = jsonToYaml(JSON.parse(input.value)); break
      case 'yaml2json': output.value = JSON.stringify(yamlToJson(input.value), null, 2); break
      case 'json2get': output.value = jsonToGet(JSON.parse(input.value)); break
    }
  } catch (e) {
    output.value = '转换错误: ' + e.message
  }
}

function jsonToXml(obj, rootName = 'root') {
  function toXml(data, name) {
    if (data === null || data === undefined) return `<${name}/>`
    if (typeof data !== 'object') return `<${name}>${escapeXml(String(data))}</${name}>`
    if (Array.isArray(data)) return data.map(item => toXml(item, name)).join('')
    let xml = `<${name}>`
    for (const [key, val] of Object.entries(data)) {
      xml += toXml(val, key)
    }
    xml += `</${name}>`
    return xml
  }
  return toXml(obj, rootName)
}

function escapeXml(str) {
  return str.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;')
}

function xmlToJson(xmlStr) {
  const parser = new DOMParser()
  const doc = parser.parseFromString(xmlStr, 'text/xml')
  return xmlNodeToJson(doc.documentElement)
}

function xmlNodeToJson(node) {
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
      const childData = xmlNodeToJson(child)
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

function jsonToYaml(obj, indent = 0) {
  const pad = '  '.repeat(indent)
  let yaml = ''
  for (const [key, val] of Object.entries(obj)) {
    if (val && typeof val === 'object' && !Array.isArray(val)) {
      yaml += `${pad}${key}:\n${jsonToYaml(val, indent + 1)}`
    } else if (Array.isArray(val)) {
      yaml += `${pad}${key}:\n`
      for (const item of val) {
        yaml += `${pad}  - ${typeof item === 'object' ? JSON.stringify(item) : item}\n`
      }
    } else {
      yaml += `${pad}${key}: ${val === null ? 'null' : val}\n`
    }
  }
  return yaml
}

function yamlToJson(yamlStr) {
  const lines = yamlStr.split('\n').filter(l => l.trim() && !l.trim().startsWith('#'))
  return parseYamlLines(lines, 0).result
}

function parseYamlLines(lines, baseIndent) {
  const result = {}
  let i = 0
  while (i < lines.length) {
    const line = lines[i]
    const indent = line.search(/\S/)
    if (indent < baseIndent) break
    if (indent > baseIndent) { i++; continue }
    const content = line.trim()
    const colonIdx = content.indexOf(':')
    if (colonIdx === -1) { i++; continue }
    const key = content.slice(0, colonIdx).trim()
    const val = content.slice(colonIdx + 1).trim()
    if (val === '') {
      const nextIndent = i + 1 < lines.length ? lines[i + 1].search(/\S/) : -1
      if (nextIndent > indent) {
        const parsed = parseYamlLines(lines.slice(i + 1), nextIndent)
        result[key] = parsed.result
        i += parsed.consumed + 1
        continue
      }
      result[key] = null
    } else {
      result[key] = isNaN(val) ? val.replace(/^['"]|['"]$/g, '') : Number(val)
    }
    i++
  }
  return { result, consumed: i }
}

function jsonToGet(obj) {
  return Object.entries(obj).map(([k, v]) => `${encodeURIComponent(k)}=${encodeURIComponent(v)}`).join('&')
}

function copyResult() {
  if (output.value) navigator.clipboard.writeText(output.value)
}
</script>

<style scoped>

.page-header { margin-bottom: 20px; }
.page-header h1 { font-size: 22px; margin-bottom: 6px; }
.page-header p { color: var(--text-secondary); font-size: 13px; }
.lang-select { width: 180px; }
</style>
