<template>
  <div class="tool-page">
    <ToolHeader />
    <div class="action-bar">
      <select v-model="fromDb" class="lang-select">
        <option value="mysql">MySQL</option>
        <option value="oracle">Oracle</option>
        <option value="mssql">MSSQL</option>
        <option value="postgresql">PostgreSQL</option>
        <option value="sqlite">SQLite</option>
      </select>
      <span>→</span>
      <select v-model="toDb" class="lang-select">
        <option value="mysql">MySQL</option>
        <option value="oracle">Oracle</option>
        <option value="mssql">MSSQL</option>
        <option value="postgresql">PostgreSQL</option>
        <option value="sqlite">SQLite</option>
      </select>
      <button class="btn btn-primary" @click="convert">转换</button>
      <button class="btn" @click="copyResult">复制结果</button>
    </div>
    <div class="io-panel">
      <div class="io-box">
        <div class="io-label"><span>输入 SQL</span></div>
        <textarea v-model="input" class="io-textarea" placeholder="输入 SQL 语句..."></textarea>
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

const input = ref('SELECT `id`, `name` FROM `user` WHERE `status` = 1 ORDER BY `id` DESC LIMIT 0, 20')
const output = ref('')
const fromDb = ref('mysql')
const toDb = ref('oracle')

function convert() {
  output.value = ''
  if (!input.value.trim()) return
  let sql = input.value
  if (fromDb.value === 'mysql' && toDb.value === 'oracle') {
    sql = sql.replace(/LIMIT\s+(\d+)(?:\s*,\s*(\d+))?/gi, (_, offset, limit) => limit ? `OFFSET ${offset} ROWS FETCH NEXT ${limit} ROWS ONLY` : `FETCH FIRST ${offset} ROWS ONLY`)
    sql = sql.replace(/`/g, '"')
  } else if (fromDb.value === 'oracle' && toDb.value === 'mysql') {
    sql = sql.replace(/OFFSET\s+\d+\s+ROWS\s+FETCH\s+NEXT\s+\d+\s+ROWS\s+ONLY/gi, 'LIMIT $1, $2')
    sql = sql.replace(/"/g, '`')
  } else if (fromDb.value === 'mysql' && toDb.value === 'postgresql') {
    sql = sql.replace(/`/g, '"')
    sql = sql.replace(/LIMIT\s+(\d+)\s*,\s*(\d+)/gi, 'LIMIT $2 OFFSET $1')
  } else if (fromDb.value === 'mysql' && toDb.value === 'mssql') {
    sql = sql.replace(/`/g, '')
    sql = sql.replace(/LIMIT\s+(\d+)\s*,\s*(\d+)/gi, 'OFFSET $1 ROWS FETCH NEXT $2 ROWS ONLY')
  }
  output.value = sql
}

function copyResult() { if (output.value) navigator.clipboard.writeText(output.value) }
</script>

<style scoped>

.page-header { margin-bottom: 20px; }
.page-header h1 { font-size: 22px; margin-bottom: 6px; }
.page-header p { color: var(--text-secondary); font-size: 13px; }
.lang-select { width: 140px; }
</style>
