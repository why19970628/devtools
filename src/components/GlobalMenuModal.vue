<template>
  <div v-if="open" class="modal-backdrop" @click.self="$emit('close')">
    <div class="modal-card" style="max-width:640px">
      <div class="modal-header">
        <h3>☰ 全站工具导航</h3>
        <button class="modal-close" @click="$emit('close')">✕</button>
      </div>
      <div class="modal-body modal-body-scroll">
        <div v-for="cat in categories" :key="cat.id" style="margin-bottom:16px">
          <div class="menu-category-title">
            <span>{{ cat.icon }}</span> {{ cat.name }}
            <span style="margin-left:auto;font-size:10px">{{ getToolsByCategory(cat.id).length }} 个</span>
          </div>
          <div class="category-links">
            <a
              v-for="tool in getToolsByCategory(cat.id)"
              :key="tool.id"
              href="#"
              @click.prevent="go(tool)"
            >{{ tool.name }}</a>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { useRouter } from 'vue-router'
import { categories, getToolsByCategory } from '../utils/tools'

defineProps({ open: Boolean })
const emit = defineEmits(['close'])
const router = useRouter()

function go(tool) {
  emit('close')
  router.push(tool.path)
}
</script>