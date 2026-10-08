<template>
  <div class="tool-page">
    <div class="page-header">
      <h1>🌳 JSON 树形视图查看器</h1>
      <p>多层级树状交互式查看 JSON 结构，支持层级折叠展开、类型着色与快速复制</p>
    </div>

    <div class="action-bar">
      <button class="btn" @click="expandAll">全部展开</button>
      <button class="btn" @click="collapseAll">全部折叠</button>
      <button class="btn" @click="loadExample">加载示例</button>
      <button class="btn" @click="copyJson">复制 JSON</button>
    </div>

    <div v-if="error" class="error-msg">
      <span class="badge badge-danger">错误</span>
      <pre>{{ error }}</pre>
    </div>

    <div v-if="parsed" class="tree-container">
      <TreeNode :data="parsed" :depth="0" />
    </div>

    <div v-else class="empty-state">
      <p>请输入 JSON 数据并点击"格式化"或"加载示例"</p>
      <textarea v-model="input" class="io-textarea" placeholder="在此粘贴 JSON 数据..." style="margin-top: 12px"></textarea>
      <button class="btn btn-primary" @click="parse" style="margin-top: 12px">解析</button>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import TreeNode from '../components/TreeNode.vue'

const input = ref(`{
  "name": "DevTools",
  "version": "1.0.0",
  "features": ["json", "format", "convert"],
  "author": { "name": "Admin", "email": "admin@example.com" },
  "active": true,
  "count": 42
}`)
const parsed = ref(null)
const error = ref('')
const expandKey = ref(0)

function parse() {
  error.value = ''
  if (!input.value.trim()) {
    error.value = '请输入 JSON 数据'
    return
  }
  try {
    parsed.value = JSON.parse(input.value)
  } catch (e) {
    error.value = e.message
  }
}

function expandAll() {
  expandKey.value++
}

function collapseAll() {
  expandKey.value++
}

function loadExample() {
  input.value = JSON.stringify({
    name: 'DevTools',
    version: '1.0.0',
    features: ['json', 'format', 'convert'],
    author: { name: 'Admin', email: 'admin@example.com' },
    active: true,
    count: 42
  }, null, 2)
  parse()
}

function copyJson() {
  if (parsed.value) {
    navigator.clipboard.writeText(JSON.stringify(parsed.value, null, 2))
  }
}
</script>

<style scoped>

.page-header { margin-bottom: 20px; }
.page-header h1 { font-size: 22px; margin-bottom: 6px; }
.page-header p { color: var(--text-secondary); font-size: 13px; }
.error-msg { margin: 12px 0; padding: 10px 14px; border-radius: var(--radius); background: rgba(248,81,73,0.1); border: 1px solid rgba(248,81,73,0.3); }
.error-msg pre { margin-top: 8px; color: var(--danger); font-size: 12px; white-space: pre-wrap; }
.tree-container { flex: 1; min-height: 0; overflow-y: auto; background: var(--bg-secondary); border: 1px solid var(--border-color); border-radius: var(--radius); padding: 16px; }
.empty-state { flex: 1; min-height: 0; display: flex; flex-direction: column; justify-content: center; text-align: center; padding: 40px; color: var(--text-secondary); }
.empty-state textarea { flex: 1; min-height: 320px; }
</style>
