<template>
  <div class="tool-page">
    <div class="page-header">
      <h1>{{ title }}</h1>
      <p>{{ desc }}</p>
    </div>
    <div class="doc-list">
      <a v-for="link in links" :key="link.name" :href="link.url" target="_blank" rel="noopener" class="doc-link">
        <span class="doc-name">{{ link.name }}</span>
        <span class="doc-url">{{ link.url }}</span>
      </a>
    </div>
  </div>
</template>

<script setup>
defineProps({
  title: { type: String, required: true },
  desc: { type: String, default: '' },
  links: { type: Array, default: () => [] },
})
</script>

<style scoped>
.tool-page { max-width: 1200px; margin: 0 auto; }
.page-header { margin-bottom: 20px; }
.page-header h1 { font-size: 22px; margin-bottom: 6px; }
.page-header p { color: var(--text-secondary); font-size: 13px; }
.doc-list { display: flex; flex-direction: column; gap: 8px; }
.doc-link { display: flex; justify-content: space-between; align-items: center; padding: 12px 16px; background: var(--bg-secondary); border: 1px solid var(--border-color); border-radius: var(--radius); text-decoration: none; color: inherit; }
.doc-link:hover { border-color: var(--accent); }
.doc-name { font-weight: 500; }
.doc-url { font-size: 12px; color: var(--text-muted); font-family: monospace; }
</style>
