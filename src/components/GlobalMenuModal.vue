<template>
  <div v-if="open" class="modal-backdrop" @click.self="$emit('close')">
    <div class="modal-card" style="max-width:640px">
      <div class="modal-header">
        <h3>{{ t('menuTitle') }}</h3>
        <button class="modal-close" @click="$emit('close')">✕</button>
      </div>
      <div class="modal-body modal-body-scroll">
        <div v-for="cat in categories" :key="cat.id" style="margin-bottom:16px">
          <div class="menu-category-title">
            <span>{{ cat.icon }}</span> {{ categoryName(cat) }}
            <span style="margin-left:auto;font-size:10px">{{ getToolsByCategory(cat.id).length }} {{ t('itemsSuffix') }}</span>
          </div>
          <div class="category-links">
            <a
              v-for="tool in getToolsByCategory(cat.id)"
              :key="tool.id"
              href="#"
              @click.prevent="go(tool)"
            >{{ toolName(tool) }}</a>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { useRouter } from 'vue-router'
import { categories, getToolsByCategory } from '../utils/tools'
import { useI18n, toolName, categoryName } from '../composables/useI18n'

defineProps({ open: Boolean })
const emit = defineEmits(['close'])
const { t } = useI18n()
const router = useRouter()

function go(tool) {
  emit('close')
  router.push(tool.path)
}
</script>