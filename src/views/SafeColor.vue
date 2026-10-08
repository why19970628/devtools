<template>
  <div class="tool-page">
    <ToolHeader />
    <div class="color-grid">
      <div
        v-for="color in safeColors"
        :key="color"
        class="color-cell"
        :style="{ background: color }"
        @click="copyColor(color)"
        :title="color"
      >
        <span class="color-label">{{ color }}</span>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'

const safeColors = ref([])

function generateSafeColors() {
  const values = [0, 51, 102, 153, 204, 255]
  const colors = []
  for (const r of values) {
    for (const g of values) {
      for (const b of values) {
        colors.push(`#${r.toString(16).padStart(2, '0')}${g.toString(16).padStart(2, '0')}${b.toString(16).padStart(2, '0')}`.toUpperCase())
      }
    }
  }
  safeColors.value = colors
}

function copyColor(color) {
  navigator.clipboard.writeText(color)
}

generateSafeColors()
</script>

<style scoped>

.page-header { margin-bottom: 20px; }
.page-header h1 { font-size: 22px; margin-bottom: 6px; }
.page-header p { color: var(--text-secondary); font-size: 13px; }
.color-grid { display: grid; grid-template-columns: repeat(auto-fill, minmax(80px, 1fr)); gap: 4px; }
.color-cell { aspect-ratio: 1; display: flex; align-items: center; justify-content: center; cursor: pointer; border-radius: 4px; transition: transform 0.2s; }
.color-cell:hover { transform: scale(1.1); z-index: 1; }
.color-label { font-size: 10px; color: #fff; text-shadow: 0 1px 2px rgba(0,0,0,0.5); opacity: 0; transition: opacity 0.2s; }
.color-cell:hover .color-label { opacity: 1; }
</style>
