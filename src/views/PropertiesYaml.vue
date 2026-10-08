<template>
  <div class="tool-page">
    <ToolHeader />
    <div class="action-bar">
      <select v-model="mode" class="lang-select">
        <option value="prop2yaml">Properties → YAML</option>
        <option value="yaml2prop">YAML → Properties</option>
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

const input = ref(`server.port=8080
spring.application.name=devtools
spring.datasource.url=jdbc:mysql://localhost:3306/devtools`)

function convert() {
  output.value = ''
  if (!input.value.trim()) return
  try {
    output.value = mode.value === 'prop2yaml' ? propertiesToYaml(input.value) : yamlToProperties(input.value)
  } catch (e) { output.value = '错误: ' + e.message }
}

function propertiesToYaml(text) {
  const lines = text.split('\n').filter(l => l.trim() && !l.trim().startsWith('#'))
  const result = {}
  for (const line of lines) {
    const eqIdx = line.indexOf('=')
    if (eqIdx === -1) continue
    const key = line.slice(0, eqIdx).trim()
    const val = line.slice(eqIdx + 1).trim()
    setNested(result, key.split('.'), val)
  }
  return toYaml(result)
}

function yamlToProperties(text) {
  const lines = text.split('\n').filter(l => l.trim() && !l.trim().startsWith('#'))
  const result = {}
  for (const line of lines) {
    const colonIdx = line.indexOf(':')
    if (colonIdx === -1) continue
    const key = line.slice(0, colonIdx).trim()
    const val = line.slice(colonIdx + 1).trim()
    if (val) setNested(result, key.split('.'), val)
  }
  return Object.entries(flatten(result)).map(([k, v]) => `${k}=${v}`).join('\n')
}

function setNested(obj, keys, val) {
  let cur = obj
  for (let i = 0; i < keys.length - 1; i++) {
    if (!cur[keys[i]]) cur[keys[i]] = {}
    cur = cur[keys[i]]
  }
  cur[keys[keys.length - 1]] = val
}

function flatten(obj, prefix = '') {
  let result = {}
  for (const [k, v] of Object.entries(obj)) {
    const key = prefix ? `${prefix}.${k}` : k
    if (v && typeof v === 'object') Object.assign(result, flatten(v, key))
    else result[key] = v
  }
  return result
}

function toYaml(obj, indent = 0) {
  const pad = '  '.repeat(indent)
  let yaml = ''
  for (const [k, v] of Object.entries(obj)) {
    if (v && typeof v === 'object') yaml += `${pad}${k}:\n${toYaml(v, indent + 1)}`
    else yaml += `${pad}${k}: ${v}\n`
  }
  return yaml
}

function copyResult() { if (output.value) navigator.clipboard.writeText(output.value) }
</script>

<style scoped>

.page-header { margin-bottom: 20px; }
.page-header h1 { font-size: 22px; margin-bottom: 6px; }
.page-header p { color: var(--text-secondary); font-size: 13px; }
.lang-select { width: 200px; }
</style>
