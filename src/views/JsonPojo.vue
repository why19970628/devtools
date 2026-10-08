<template>
  <div class="tool-page">
    <ToolHeader />

    <div class="action-bar">
      <select v-model="lang" class="lang-select">
        <option value="java">Java (Lombok)</option>
        <option value="java-plain">Java (Plain)</option>
        <option value="csharp">C#</option>
      </select>
      <button class="btn btn-primary" @click="generate">生成</button>
      <button class="btn" @click="copyResult">复制结果</button>
    </div>

    <div class="io-panel">
      <div class="io-box">
        <div class="io-label"><span>输入 JSON</span></div>
        <textarea v-model="input" class="io-textarea" placeholder='{"name":"张三","age":25}'></textarea>
      </div>
      <div class="io-box">
        <div class="io-label"><span>生成结果</span></div>
        <pre class="code-output">{{ output }}</pre>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'

const input = ref(`{
  "name": "张三",
  "age": 25,
  "email": "zhangsan@example.com",
  "active": true
}`)
const output = ref('')
const lang = ref('java')

function generate() {
  if (!input.value.trim()) { output.value = ''; return }
  try {
    const obj = JSON.parse(input.value)
    if (lang.value === 'java') output.value = generateJava(obj)
    else if (lang.value === 'java-plain') output.value = generateJavaPlain(obj)
    else output.value = generateCSharp(obj)
  } catch (e) {
    output.value = '// JSON 解析错误: ' + e.message
  }
}

function generateJava(obj) {
  let code = '@Data\npublic class Root {\n'
  for (const [key, val] of Object.entries(obj)) {
    code += `    private ${javaType(val)} ${key};\n`
  }
  code += '}'
  return code
}

function generateJavaPlain(obj) {
  let code = 'public class Root {\n'
  for (const [key, val] of Object.entries(obj)) {
    code += `    private ${javaType(val)} ${key};\n`
  }
  code += '\n'
  for (const [key, val] of Object.entries(obj)) {
    const cap = key.charAt(0).toUpperCase() + key.slice(1)
    code += `    public ${javaType(val)} get${cap}() { return ${key}; }\n`
    code += `    public void set${cap}(${javaType(val)} ${key}) { this.${key} = ${key}; }\n`
  }
  code += '}'
  return code
}

function generateCSharp(obj) {
  let code = 'public class Root\n{\n'
  for (const [key, val] of Object.entries(obj)) {
    const propName = key.charAt(0).toUpperCase() + key.slice(1)
    code += `    public ${csharpType(val)} {propName} { get; set; }\n`
  }
  code += '}'
  return code
}

function javaType(val) {
  if (val === null) return 'String'
  if (typeof val === 'number') return Number.isInteger(val) ? 'Integer' : 'Double'
  if (typeof val === 'boolean') return 'Boolean'
  if (Array.isArray(val)) return 'List<Object>'
  if (typeof val === 'object') return 'Object'
  return 'String'
}

function csharpType(val) {
  if (val === null) return 'string'
  if (typeof val === 'number') return Number.isInteger(val) ? 'int' : 'double'
  if (typeof val === 'boolean') return 'bool'
  if (Array.isArray(val)) return 'List<object>'
  if (typeof val === 'object') return 'object'
  return 'string'
}

function copyResult() {
  if (output.value) navigator.clipboard.writeText(output.value)
}
</script>

<style scoped>

.page-header { margin-bottom: 20px; }
.page-header h1 { font-size: 22px; margin-bottom: 6px; }
.page-header p { color: var(--text-secondary); font-size: 13px; }
.lang-select { width: 160px; }
.code-output { background: var(--bg-tertiary); border: 1px solid var(--border-color); border-radius: var(--radius); padding: 16px; font-family: 'SF Mono', 'Fira Code', monospace; font-size: 13px; line-height: 1.6; white-space: pre-wrap; word-break: break-all; min-height: 200px; max-height: 500px; overflow-y: auto; }
</style>
