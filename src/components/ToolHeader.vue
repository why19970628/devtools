<template>
  <div class="page-header">
    <h1>{{ icon }} {{ title }}</h1>
    <p>{{ desc }}</p>
  </div>
</template>

<script setup>
import { computed } from 'vue'
import { useRoute } from 'vue-router'
import { getToolByPath } from '../utils/tools'
import { toolName, toolDesc } from '../composables/useI18n'

const route = useRoute()
const tool = computed(() => getToolByPath(route.path))
const icon = computed(() => tool.value?.icon || '')
const title = computed(() => (tool.value ? toolName(tool.value) : ''))
const desc = computed(() => (tool.value ? toolDesc(tool.value) : ''))
</script>

<style scoped>
.page-header { margin-bottom: 20px; }
</style>