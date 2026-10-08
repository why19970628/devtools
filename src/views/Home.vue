<template>
  <div class="home">
    <div class="hero">
      <h1>{{ t('heroTitle') }}</h1>
      <p>{{ t('heroSub', { n: tools.length }) }}</p>
      <p class="hero-tip">{{ t('heroTip') }}</p>
    </div>

    <div v-if="activeCategory" class="category-section">
      <div class="category-title">
        <span class="category-icon">{{ getCategory(activeCategory)?.icon }}</span>
        {{ categoryOf(activeCategory) }}
        <span style="font-size:13px;color:var(--text-muted);margin-left:auto">
          {{ getToolsByCategory(activeCategory).length }} {{ t('toolsSuffix') }}
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
          {{ categoryName(cat) }}
          <span style="font-size:13px;color:var(--text-muted);margin-left:auto">
            {{ getToolsByCategory(cat.id).length }} {{ t('toolsSuffix') }}
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
import { useI18n, categoryName } from '../composables/useI18n'

const { t } = useI18n()

function categoryOf(categoryId) {
  const cat = getCategory(categoryId)
  return cat ? categoryName(cat) : categoryId
}
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