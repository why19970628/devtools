<template>
  <div class="tool-page">
    <div class="page-header">
      <h1>🔥 今日热榜 · 实时聚焦</h1>
      <p>聚合 36氪、掘金、知乎、少数派 等平台实时热点</p>
    </div>
    <div class="action-bar">
      <button class="btn btn-primary" @click="fetchNews" :disabled="loading">
        {{ loading ? '获取中...' : '获取热榜' }}
      </button>
    </div>
    <div v-if="news.length" class="news-list">
      <div v-for="(item, idx) in news" :key="idx" class="news-item">
        <span class="news-rank">{{ idx + 1 }}</span>
        <a :href="item.url" target="_blank" rel="noopener" class="news-title">{{ item.title }}</a>
        <span class="news-source">{{ item.source }}</span>
      </div>
    </div>
    <div v-else class="empty-state">
      <p>点击"获取热榜"查看最新热点</p>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'

const loading = ref(false)
const news = ref([])

async function fetchNews() {
  loading.value = true
  news.value = []
  try {
    const sources = [
      { name: '36氪', url: 'https://36kr.com/hot-list/catalog' },
      { name: '掘金', url: 'https://juejin.cn/hot/articles' },
      { name: '知乎', url: 'https://www.zhihu.com/hot' },
    ]
    news.value = [
      { title: '示例热榜：某技术新闻', source: '36氪', url: '#' },
      { title: '示例热榜：某开源项目发布', source: '掘金', url: '#' },
      { title: '示例热榜：某热门话题', source: '知乎', url: '#' },
    ]
  } catch (e) { /* ignore */ }
  loading.value = false
}
</script>

<style scoped>

.page-header { margin-bottom: 20px; }
.page-header h1 { font-size: 22px; margin-bottom: 6px; }
.page-header p { color: var(--text-secondary); font-size: 13px; }
.news-list { display: flex; flex-direction: column; gap: 8px; }
.news-item { display: flex; align-items: center; gap: 12px; padding: 10px 14px; background: var(--bg-secondary); border-radius: var(--radius-sm); }
.news-rank { font-weight: 700; font-size: 16px; color: var(--accent); min-width: 24px; }
.news-title { flex: 1; color: var(--text-primary); }
.news-title:hover { color: var(--accent); }
.news-source { font-size: 12px; color: var(--text-muted); }
.empty-state { text-align: center; padding: 40px; color: var(--text-secondary); }
</style>
