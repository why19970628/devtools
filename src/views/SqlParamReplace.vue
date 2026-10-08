<template>
  <div class="tool-page">
    <div class="page-header">
      <h1>🧩 SQL 占位符参数还原</h1>
      <p>自动将 MyBatis / JPA 日志中的 Preparing 问号 SQL 与 Parameters 参数还原为可执行 SQL</p>
    </div>
    <div class="action-bar">
      <button class="btn btn-primary" @click="restore">还原</button>
      <button class="btn" @click="copyResult">复制结果</button>
      <button class="btn" @click="loadExample">加载示例</button>
    </div>
    <div class="io-panel">
      <div class="io-box">
        <div class="io-label"><span>Preparing SQL</span></div>
        <textarea v-model="sql" class="io-textarea" placeholder="SELECT * FROM user WHERE id = ? AND name = ?"></textarea>
      </div>
      <div class="io-box">
        <div class="io-label"><span>Parameters</span></div>
        <textarea v-model="params" class="io-textarea" placeholder="1(String), 张三(String)"></textarea>
      </div>
    </div>
    <div v-if="output" class="result-section">
      <div class="card">
        <div class="card-header"><span class="card-title">还原结果</span></div>
        <pre class="code-block">{{ output }}</pre>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'

const sql = ref('SELECT * FROM user WHERE id = ? AND name = ?')
const params = ref('1, 张三')
const output = ref('')

function restore() {
  output.value = ''
  if (!sql.value.trim() || !params.value.trim()) return
  const paramList = params.value.split(',').map(p => p.trim())
  let result = sql.value
  let idx = 0
  result = result.replace(/\?/g, () => {
    const param = paramList[idx++] || '?'
    if (/^\d+$/.test(param)) return param
    return `'${param}'`
  })
  output.value = result
}

function loadExample() {
  sql.value = 'SELECT * FROM user WHERE id = ? AND name = ? AND age > ?'
  params.value = '1, 张三, 18'
  restore()
}

function copyResult() { if (output.value) navigator.clipboard.writeText(output.value) }
</script>

<style scoped>

.page-header { margin-bottom: 20px; }
.page-header h1 { font-size: 22px; margin-bottom: 6px; }
.page-header p { color: var(--text-secondary); font-size: 13px; }
.result-section { margin-top: 16px; }
.code-block { background: var(--bg-tertiary); padding: 14px; border-radius: var(--radius); font-family: monospace; font-size: 13px; white-space: pre-wrap; }
</style>
