<template>
  <div v-if="open" class="modal-backdrop" @click.self="$emit('close')">
    <div class="modal-card">
      <div class="modal-header">
        <h3>⚙︎ 设置</h3>
        <button class="modal-close" @click="$emit('close')">✕</button>
      </div>
      <div class="modal-body">
        <div class="settings-group">
          <div class="settings-label">外观主题</div>
          <div class="theme-options">
            <div
              class="theme-option"
              :class="{ active: mode === 'auto' }"
              @click="set('auto')"
            >
              <div class="preview">
                <div class="preview-bar" style="background:#1e293b"></div>
                <div class="preview-body">
                  <div class="preview-side" style="background:#334155"></div>
                  <div class="preview-content" style="background:#f6f8fa"></div>
                </div>
              </div>
              <span>跟随时间</span>
            </div>
            <div
              class="theme-option"
              :class="{ active: mode === 'light' }"
              @click="set('light')"
            >
              <div class="preview">
                <div class="preview-bar" style="background:#fff"></div>
                <div class="preview-body">
                  <div class="preview-side" style="background:#f1f3f5"></div>
                  <div class="preview-content" style="background:#fff"></div>
                </div>
              </div>
              <span>浅色</span>
            </div>
            <div
              class="theme-option"
              :class="{ active: mode === 'dark' }"
              @click="set('dark')"
            >
              <div class="preview">
                <div class="preview-bar" style="background:#1e293b"></div>
                <div class="preview-body">
                  <div class="preview-side" style="background:#334155"></div>
                  <div class="preview-content" style="background:#0f172a"></div>
                </div>
              </div>
              <span>深色</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { computed } from 'vue'
import { useTheme } from '../composables/useTheme'

defineProps({ open: Boolean })
const emit = defineEmits(['close'])
const { theme, set } = useTheme()
const mode = computed(() => theme.value)
</script>