<template>
  <div class="home">
    <div class="hero">
      <h1>🔧 DevTools 开发者工具箱</h1>
      <p>开发者在线效率工具箱 · {{ tools.length }} 款纯前端工具，无需后端服务，数据不出本地</p>
      <p class="hero-tip">按 <kbd>Ctrl</kbd> + <kbd>K</kbd> 快速检索全站工具，点击卡片右侧 ☆ 收藏常用工具</p>
    </div>

    <div v-if="activeCategory" class="category-section">
      <div class="category-title">
        <span class="category-icon">{{ getCategory(activeCategory)?.icon }}</span>
        {{ getCategory(activeCategory)?.name }}
        <span style="font-size:13px;color:var(--text-muted);margin-left:auto">
          {{ getToolsByCategory(activeCategory).length }} 个工具
        </span>
      </div>
      <div class="tool-grid">
        <ToolCard v-for="tool in getToolsByCategory(activeCategory)" :key="tool.id" :tool="tool" />
      </div>
    </div>

    <template v-else>
      <div v-for="cat in categories" :key="cat.id" class="category-section">
        <div class="category-title">
          <span class="category-icon">{{ cat.icon }}</span>
          {{ cat.name }}
          <span style="font-size:13px;color:var(--text-muted);margin-left:auto">
            {{ getToolsByCategory(cat.id).length }} 个工具
          </span>
        </div>
        <div class="tool-grid">
          <ToolCard v-for="tool in getToolsByCategory(cat.id)" :key="tool.id" :tool="tool" />
        </div>
      </div>
    </template>
  </div>
</template>

<script setup>
import ToolCard from '../components/ToolCard.vue'
import { categories, tools, getToolsByCategory, getCategory } from '../utils/tools'
import { activeCategory } from '../utils/nav'
</script>

<style scoped>
.home {
  height: 100%;
  overflow-y: auto;
  padding: 24px;
}
.hero {
  text-align: center;
  padding: 28px 0 20px;
  margin-bottom: 24px;
}
.hero h1 { font-size: 26px; margin-bottom: 8px; }
.hero p { color: var(--text-secondary); font-size: 14px; }
.hero-tip { margin-top: 8px; font-size: 12px; color: var(--text-muted); }
.hero-tip kbd { background: var(--bg-tertiary); border: 1px solid var(--border-color); border-radius: 4px; padding: 1px 6px; font-family: var(--font-mono); font-size: 11px; }
@media (max-width: 768px) { .home { padding: 16px; } }
</style>