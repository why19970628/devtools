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
        <div class="io-label"><span>CREATE TABLE 语句</span></div>
        <textarea v-model="input" class="io-textarea" placeholder="CREATE TABLE user (...)"></textarea>
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

const input = ref(`CREATE TABLE user (
  id BIGINT PRIMARY KEY AUTO_INCREMENT,
  user_name VARCHAR(64) NOT NULL,
  email VARCHAR(128),
  created_at DATETIME
)`)
const output = ref('')
const lang = ref('java')

function generate() {
  output.value = ''
  if (!input.value.trim()) return
  try {
    const columns = parseCreateTable(input.value)
    if (lang.value === 'java') output.value = generateJava(columns)
    else if (lang.value === 'java-plain') output.value = generateJavaPlain(columns)
    else output.value = generateCSharp(columns)
  } catch (e) { output.value = '错误: ' + e.message }
}

function parseCreateTable(sql) {
  const match = sql.match(/CREATE\s+TABLE\s+\w+\s*\(([\s\S]+)\)/i)
  if (!match) throw new Error('无法解析建表语句')
  const columns = []
  for (const line of match[1].split(',')) {
    const trimmed = line.trim()
    if (trimmed.startsWith('PRIMARY') || trimmed.startsWith('KEY') || trimmed.startsWith('INDEX') || trimmed.startsWith('UNIQUE')) continue
    const parts = trimmed.split(/\s+/)
    if (parts.length >= 2) {
      columns.push({ name: parts[0], type: parts[1].replace(/\(.*?\)/, '') })
    }
  }
  return columns
}

function generateJava(columns) {
  let code = '@Data\n@TableName("user")\npublic class User {\n'
  for (const col of columns) {
    code += `    private ${javaType(col.type)} ${toCamelCase(col.name)};\n`
  }
  code += '}'
  return code
}

function generateJavaPlain(columns) {
  let code = 'public class User {\n'
  for (const col of columns) {
    code += `    private ${javaType(col.type)} ${toCamelCase(col.name)};\n`
  }
  code += '\n'
  for (const col of columns) {
    const name = toCamelCase(col.name)
    const cap = name.charAt(0).toUpperCase() + name.slice(1)
    code += `    public ${javaType(col.type)} get${cap}() { return ${name}; }\n`
    code += `    public void set${cap}(${javaType(col.type)} ${name}) { this.${name} = ${name}; }\n`
  }
  code += '}'
  return code
}

function generateCSharp(columns) {
  let code = 'public class User\n{\n'
  for (const col of columns) {
    const propName = toPascalCase(col.name)
    code += `    public ${csharpType(col.type)} {propName} { get; set; }\n`
  }
  code += '}'
  return code
}

function javaType(sqlType) {
  const t = sqlType.toLowerCase()
  if (t.includes('int')) return 'Integer'
  if (t.includes('bigint')) return 'Long'
  if (t.includes('varchar') || t.includes('text') || t.includes('char')) return 'String'
  if (t.includes('decimal') || t.includes('numeric')) return 'BigDecimal'
  if (t.includes('date') || t.includes('time')) return 'Date'
  if (t.includes('float') || t.includes('double')) return 'Double'
  return 'String'
}

function csharpType(sqlType) {
  const t = sqlType.toLowerCase()
  if (t.includes('int')) return 'int'
  if (t.includes('bigint')) return 'long'
  if (t.includes('varchar') || t.includes('text') || t.includes('char')) return 'string'
  if (t.includes('decimal') || t.includes('numeric')) return 'decimal'
  if (t.includes('date') || t.includes('time')) return 'DateTime'
  if (t.includes('float') || t.includes('double')) return 'double'
  return 'string'
}

function toCamelCase(name) {
  return name.replace(/_([a-z])/g, (_, c) => c.toUpperCase())
}

function toPascalCase(name) {
  const camel = toCamelCase(name)
  return camel.charAt(0).toUpperCase() + camel.slice(1)
}

function copyResult() { if (output.value) navigator.clipboard.writeText(output.value) }
</script>

<style scoped>

.page-header { margin-bottom: 20px; }
.page-header h1 { font-size: 22px; margin-bottom: 6px; }
.page-header p { color: var(--text-secondary); font-size: 13px; }
.lang-select { width: 160px; }
.code-output { background: var(--bg-tertiary); border: 1px solid var(--border-color); border-radius: var(--radius); padding: 16px; font-family: monospace; font-size: 13px; white-space: pre-wrap; min-height: 200px; max-height: 500px; overflow-y: auto; }
</style>
