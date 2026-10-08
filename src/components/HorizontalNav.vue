<template>
  <nav class="horizontal-nav nav-top">
    <div class="nav-track">
      <button
        class="h-nav-item"
        :class="{ active: active === null }"
        @click="$emit('pick', null)"
      >
        <span class="item-icon">🏠</span>
        <span class="item-title">全部工具</span>
      </button>
      <button
        v-for="cat in categories"
        :key="cat.id"
        class="h-nav-item"
        :class="{ active: active === cat.id }"
        @click="$emit('pick', cat.id)"
      >
        <span class="item-icon">{{ cat.icon }}</span>
        <span class="item-title">{{ cat.name }}</span>
      </button>
    </div>
  </nav>
</template>

<script setup>
import { categories } from '../utils/tools'

defineProps({ active: { type: String, default: null } })
defineEmits(['pick'])
</script>