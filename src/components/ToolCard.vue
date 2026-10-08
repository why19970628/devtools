<template>
  <div class="tool-card" @click="router.push(tool.path)">
    <span class="tool-card-icon">{{ tool.icon }}</span>
    <div class="tool-card-content">
      <div class="tool-card-title">{{ tool.name }}</div>
      <div class="tool-card-desc">{{ tool.desc }}</div>
    </div>
    <button
      class="tool-card-fav"
      :class="{ 'is-fav': isFav(tool.id) }"
      :title="isFav(tool.id) ? '取消收藏' : '收藏'"
      @click.stop="toggle(tool.id)"
    >{{ isFav(tool.id) ? '★' : '☆' }}</button>
  </div>
</template>

<script setup>
import { useRouter } from 'vue-router'
import { useFavorites } from '../utils/favorites'

defineProps({ tool: { type: Object, required: true } })
const router = useRouter()
const { isFav, toggle } = useFavorites()
</script>