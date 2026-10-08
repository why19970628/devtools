<template>
  <div class="tool-page">
    <ToolHeader />
    <div class="action-bar">
      <select v-model="mode" class="lang-select">
        <option value="format">格式化</option>
        <option value="compress">压缩</option>
      </select>
      <button class="btn btn-primary" @click="convert">执行</button>
      <button class="btn" @click="copyResult">复制结果</button>
    </div>
    <div class="io-panel">
      <div class="io-box">
        <div class="io-label"><span>输入 SQL</span></div>
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

const input = ref('select id, name, email from user where status = 1 order by id desc limit 0, 20')
const output = ref('')
const mode = ref('format')

function convert() {
  output.value = ''
  if (!input.value.trim()) return
  if (mode.value === 'format') {
    output.value = formatSql(input.value)
  } else {
    output.value = input.value.replace(/\s+/g, ' ').trim()
  }
}

function formatSql(sql) {
  const keywords = ['SELECT', 'FROM', 'WHERE', 'INSERT', 'UPDATE', 'DELETE', 'JOIN', 'LEFT', 'RIGHT', 'INNER', 'OUTER', 'ON', 'GROUP', 'ORDER', 'BY', 'HAVING', 'LIMIT', 'OFFSET', 'UNION', 'ALL', 'DISTINCT', 'AS', 'AND', 'OR', 'NOT', 'NULL', 'IS', 'IN', 'EXISTS', 'BETWEEN', 'LIKE', 'CASE', 'WHEN', 'THEN', 'ELSE', 'END', 'CREATE', 'TABLE', 'ALTER', 'DROP', 'INDEX', 'VIEW', 'INTO', 'VALUES', 'SET', 'PRIMARY', 'KEY', 'FOREIGN', 'REFERENCES', 'CONSTRAINT', 'DEFAULT', 'AUTO_INCREMENT', 'ENGINE', 'CHARSET']
  let result = sql.replace(/\s+/g, ' ').trim()
  for (const kw of keywords) {
    result = result.replace(new RegExp(`\\b${kw}\\b`, 'gi'), kw)
  }
  result = result.replace(/\bSELECT\b/gi, '\nSELECT')
  result = result.replace(/\bFROM\b/gi, '\nFROM')
  result = result.replace(/\bWHERE\b/gi, '\nWHERE')
  result = result.replace(/\bJOIN\b/gi, '\nJOIN')
  result = result.replace(/\bLEFT\b/gi, '\nLEFT')
  result = result.replace(/\bRIGHT\b/gi, '\nRIGHT')
  result = result.replace(/\bINNER\b/gi, '\nINNER')
  result = result.replace(/\bOUTER\b/gi, '\nOUTER')
  result = result.replace(/\bON\b/gi, '\n  ON')
  result = result.replace(/\bGROUP BY\b/gi, '\nGROUP BY')
  result = result.replace(/\bORDER BY\b/gi, '\nORDER BY')
  result = result.replace(/\bHAVING\b/gi, '\nHAVING')
  result = result.replace(/\bLIMIT\b/gi, '\nLIMIT')
  result = result.replace(/\bUNION\b/gi, '\nUNION')
  result = result.replace(/\bINSERT INTO\b/gi, '\nINSERT INTO')
  result = result.replace(/\bVALUES\b/gi, '\nVALUES')
  result = result.replace(/\bUPDATE\b/gi, '\nUPDATE')
  result = result.replace(/\bSET\b/gi, '\nSET')
  result = result.replace(/\bDELETE FROM\b/gi, '\nDELETE FROM')
  result = result.replace(/\bAND\b/gi, '\n  AND')
  result = result.replace(/\bOR\b/gi, '\n  OR')
  return result.trim()
}

function copyResult() { if (output.value) navigator.clipboard.writeText(output.value) }
</script>

<style scoped>

.page-header { margin-bottom: 20px; }
.page-header h1 { font-size: 22px; margin-bottom: 6px; }
.page-header p { color: var(--text-secondary); font-size: 13px; }
.lang-select { width: 120px; }
</style>
