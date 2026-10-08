<template>
  <nav class="horizontal-nav nav-top">
    <div class="nav-track">
      <button
        class="h-nav-item"
        :class="{ active: active === null }"
        @click="$emit('pick', null)"
      >
        <span class="item-icon">🏠</span>
        <span class="item-title">{{ t('allTools') }}</span>
      </button>
      <button
        v-for="cat in categories"
        :key="cat.id"
        class="h-nav-item"
        :class="{ active: active === cat.id }"
        @click="$emit('pick', cat.id)"
      >
        <span class="item-icon">{{ cat.icon }}</span>
        <span class="item-title">{{ categoryName(cat) }}</span>
      </button>
    </div>
  </nav>
</template>

<script setup>
import { categories } from '../utils/tools'
import { useI18n, categoryName } from '../composables/useI18n'

defineProps({ active: { type: String, default: null } })
defineEmits(['pick'])

const { t } = useI18n()
</script>