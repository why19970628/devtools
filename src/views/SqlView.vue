<template>
  <div class="tool-page">
    <div class="page-header">
      <h1>📋 数据库插入、修改字段视图</h1>
      <p>可视化解析并对应 INSERT / UPDATE 复杂语句的字段与数值</p>
    </div>
    <div class="action-bar">
      <select v-model="mode" class="lang-select">
        <option value="insert">INSERT</option>
        <option value="update">UPDATE</option>
      </select>
      <button class="btn btn-primary" @click="parse">解析</button>
      <button class="btn" @click="loadExample">加载示例</button>
    </div>
    <div class="io-panel">
      <div class="io-box">
        <div class="io-label"><span>输入 SQL</span></div>
        <textarea v-model="input" class="io-textarea"></textarea>
      </div>
      <div class="io-box">
        <div class="io-label"><span>字段映射</span></div>
        <div v-if="fields.length" class="field-list">
          <div v-for="(field, idx) in fields" :key="idx" class="field-item">
            <span class="field-name">{{ field.name }}</span>
            <span class="field-value">{{ field.value }}</span>
          </div>
        </div>
        <div v-else class="empty-state">解析结果将显示在这里</div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'

const input = ref("INSERT INTO user (id, name, age, email) VALUES (1, '张三', 25, 'zhangsan@example.com')")
const mode = ref('insert')
const fields = ref([])

function parse() {
  fields.value = []
  if (!input.value.trim()) return
  try {
    if (mode.value === 'insert') {
      const match = input.value.match(/INSERT\s+INTO\s+\w+\s*\(([^)]+)\)\s*VALUES\s*\(([^)]+)\)/i)
      if (!match) return
      const names = match[1].split(',').map(s => s.trim())
      const values = match[2].split(',').map(s => s.trim().replace(/^'|'$/g, ''))
      fields.value = names.map((name, i) => ({ name, value: values[i] || '' }))
    } else {
      const match = input.value.match(/UPDATE\s+\w+\s+SET\s+(.+?)(?:\s+WHERE|$)/i)
      if (!match) return
      const sets = match[1].split(',').map(s => s.trim())
      fields.value = sets.map(s => {
        const [name, ...valParts] = s.split('=')
        return { name: name.trim(), value: valParts.join('=').trim().replace(/^'|'$/g, '') }
      })
    }
  } catch (e) { /* ignore */ }
}

function loadExample() {
  input.value = "INSERT INTO user (id, name, age, email) VALUES (1, '张三', 25, 'zhangsan@example.com')"
  parse()
}
</script>

<style scoped>

.page-header { margin-bottom: 20px; }
.page-header h1 { font-size: 22px; margin-bottom: 6px; }
.page-header p { color: var(--text-secondary); font-size: 13px; }
.lang-select { width: 120px; }
.field-list { display: flex; flex-direction: column; gap: 6px; }
.field-item { display: flex; justify-content: space-between; padding: 8px 12px; background: var(--bg-tertiary); border-radius: var(--radius-sm); }
.field-name { font-family: monospace; color: var(--accent); }
.field-value { font-family: monospace; }
.empty-state { color: var(--text-secondary); text-align: center; padding: 20px; }
</style>
