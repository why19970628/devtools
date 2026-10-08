<template>
  <div class="tool-page">
    <div class="page-header">
      <h1>📑 JSON 转 CSV / Excel</h1>
      <p>将对象列表型 JSON 快速转换为带 BOM UTF-8 的 CSV 电子表格</p>
    </div>
    <div class="action-bar">
      <button class="btn btn-primary" @click="convert">转换</button>
      <button class="btn" @click="downloadCsv" :disabled="!csvResult">下载 CSV</button>
      <button class="btn" @click="loadExample">加载示例</button>
    </div>
    <div class="io-panel">
      <div class="io-box">
        <div class="io-label"><span>输入 JSON 数组</span></div>
        <textarea v-model="input" class="io-textarea"></textarea>
      </div>
      <div class="io-box">
        <div class="io-label"><span>CSV 结果</span></div>
        <textarea v-model="csvResult" class="io-textarea" readonly></textarea>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'

const input = ref(`[
  { "姓名": "张三", "年龄": 25, "城市": "北京" },
  { "姓名": "李四", "年龄": 30, "城市": "上海" },
  { "姓名": "王五", "年龄": 28, "城市": "深圳" }
]`)
const csvResult = ref('')

function convert() {
  csvResult.value = ''
  if (!input.value.trim()) return
  try {
    const data = JSON.parse(input.value)
    if (!Array.isArray(data) || !data.length) { csvResult.value = '错误: 需要非空数组'; return }
    const cols = [...new Set(data.flatMap(Object.keys))]
    const rows = data.map(row => cols.map(c => `"${String(row[c] ?? '').replace(/"/g, '""')}"`).join(','))
    csvResult.value = '\uFEFF' + cols.join(',') + '\n' + rows.join('\n')
  } catch (e) { csvResult.value = '错误: ' + e.message }
}

function downloadCsv() {
  if (!csvResult.value) return
  const blob = new Blob([csvResult.value], { type: 'text/csv;charset=utf-8' })
  const url = URL.createObjectURL(blob)
  const a = document.createElement('a')
  a.href = url
  a.download = 'export.csv'
  a.click()
  URL.revokeObjectURL(url)
}

function loadExample() {
  input.value = JSON.stringify([
    { 姓名: '张三', 年龄: 25, 城市: '北京' },
    { 姓名: '李四', 年龄: 30, 城市: '上海' }
  ], null, 2)
  convert()
}
</script>

<style scoped>

.page-header { margin-bottom: 20px; }
.page-header h1 { font-size: 22px; margin-bottom: 6px; }
.page-header p { color: var(--text-secondary); font-size: 13px; }
</style>
