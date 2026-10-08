<template>
  <div class="tool-page">
    <div class="page-header">
      <h1>📊 JSON 表格视图</h1>
      <p>将包含对象的 JSON 列表渲染为交互式多列数据表格</p>
    </div>
    <div class="action-bar">
      <button class="btn btn-primary" @click="parse">解析</button>
      <button class="btn" @click="loadExample">加载示例</button>
      <button class="btn" @click="exportCsv">导出 CSV</button>
    </div>
    <div v-if="error" class="error-msg">{{ error }}</div>
    <div v-if="tableData.length" class="table-container">
      <table>
        <thead>
          <tr>
            <th v-for="col in columns" :key="col">{{ col }}</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(row, idx) in tableData" :key="idx">
            <td v-for="col in columns" :key="col">{{ formatCell(row[col]) }}</td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'

const input = ref('')
const tableData = ref([])
const error = ref('')

const columns = computed(() => {
  if (!tableData.value.length) return []
  return Object.keys(tableData.value[0])
})

function parse() {
  error.value = ''
  tableData.value = []
  if (!input.value.trim()) { error.value = '请输入 JSON'; return }
  try {
    const data = JSON.parse(input.value)
    if (!Array.isArray(data)) { error.value = 'JSON 必须是数组'; return }
    tableData.value = data
  } catch (e) { error.value = e.message }
}

function formatCell(val) {
  if (val === null || val === undefined) return '-'
  if (typeof val === 'object') return JSON.stringify(val)
  return String(val)
}

function loadExample() {
  input.value = JSON.stringify([
    { id: 1, name: '张三', age: 25, city: '北京' },
    { id: 2, name: '李四', age: 30, city: '上海' },
    { id: 3, name: '王五', age: 28, city: '广州' }
  ], null, 2)
  parse()
}

function exportCsv() {
  if (!tableData.value.length) return
  const cols = columns.value
  const rows = tableData.value.map(row => cols.map(c => `"${formatCell(row[c]).replace(/"/g, '""')}"`).join(','))
  const csv = '\uFEFF' + cols.join(',') + '\n' + rows.join('\n')
  const blob = new Blob([csv], { type: 'text/csv;charset=utf-8' })
  const url = URL.createObjectURL(blob)
  const a = document.createElement('a')
  a.href = url
  a.download = 'data.csv'
  a.click()
  URL.revokeObjectURL(url)
}
</script>

<style scoped>

.page-header { margin-bottom: 20px; }
.page-header h1 { font-size: 22px; margin-bottom: 6px; }
.page-header p { color: var(--text-secondary); font-size: 13px; }
.error-msg { color: var(--danger); padding: 10px; }
.table-container { overflow-x: auto; border: 1px solid var(--border-color); border-radius: var(--radius); }
table { width: 100%; border-collapse: collapse; font-size: 13px; }
th, td { padding: 8px 12px; text-align: left; border-bottom: 1px solid var(--border-color); }
th { background: var(--bg-tertiary); font-weight: 600; position: sticky; top: 0; }
tr:hover td { background: var(--bg-hover); }
</style>
