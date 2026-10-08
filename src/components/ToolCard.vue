<template>
  <div class="tool-card" @click="router.push(tool.path)">
    <span class="tool-card-icon">{{ tool.icon }}</span>
    <div class="tool-card-content">
      <div class="tool-card-title">{{ toolName(tool) }}</div>
      <div class="tool-card-desc">{{ toolDesc(tool) }}</div>
    </div>
    <button
      class="tool-card-fav"
      :class="{ 'is-fav': isFav(tool.id) }"
      :title="isFav(tool.id) ? t('unfavTooltip') : t('favTooltip')"
      @click.stop="toggle(tool.id)"
    >{{ isFav(tool.id) ? '★' : '☆' }}</button>
  </div>
</template>

<script setup>
import { useRouter } from 'vue-router'
import { useFavorites } from '../utils/favorites'
import { useI18n, toolName, toolDesc } from '../composables/useI18n'

defineProps({ tool: { type: Object, required: true } })
const router = useRouter()
const { isFav, toggle } = useFavorites()
const { t } = useI18n()
</script>