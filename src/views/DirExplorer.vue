<template>
  <div class="tool-page">
    <ToolHeader />
    <div class="action-bar">
      <label class="btn" style="cursor:pointer">
        选择目录
        <input type="file" webkitdirectory style="display:none" @change="onDirChange" />
      </label>
    </div>
    <div v-if="fileTree.length" class="file-tree">
      <div v-for="(file, idx) in fileTree" :key="idx" class="file-item" :style="{ paddingLeft: file.depth * 16 + 'px' }">
        <span class="file-icon">{{ file.type === 'dir' ? '📁' : '📄' }}</span>
        <span class="file-name">{{ file.name }}</span>
        <span class="file-size" v-if="file.size">{{ formatSize(file.size) }}</span>
      </div>
    </div>
    <div v-else class="empty-state">
      <p>请选择要浏览的目录</p>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'

const fileTree = ref([])

function onDirChange(e) {
  const files = Array.from(e.target.files)
  fileTree.value = files.map(f => ({
    name: f.name,
    path: f.webkitRelativePath,
    size: f.size,
    type: f.type.startsWith('image/') ? 'image' : 'file',
    depth: f.webkitRelativePath.split('/').length - 1
  }))
}

function formatSize(bytes) {
  if (bytes < 1024) return bytes + ' B'
  if (bytes < 1024 * 1024) return (bytes / 1024).toFixed(1) + ' KB'
  return (bytes / 1024 / 1024).toFixed(2) + ' MB'
}
</script>

<style scoped>

.page-header { margin-bottom: 20px; }
.page-header h1 { font-size: 22px; margin-bottom: 6px; }
.page-header p { color: var(--text-secondary); font-size: 13px; }
.file-tree { background: var(--bg-secondary); border: 1px solid var(--border-color); border-radius: var(--radius); padding: 8px; max-height: 500px; overflow-y: auto; }
.file-item { display: flex; align-items: center; gap: 8px; padding: 4px 8px; border-radius: 4px; }
.file-item:hover { background: var(--bg-hover); }
.file-icon { font-size: 14px; }
.file-name { flex: 1; font-size: 13px; }
.file-size { font-size: 11px; color: var(--text-muted); }
.empty-state { text-align: center; padding: 40px; color: var(--text-secondary); }
</style>
