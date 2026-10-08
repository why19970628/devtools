<template>
  <div class="tool-page">
    <ToolHeader />
    <div class="key-grid">
      <div v-for="key in keys" :key="key.code" class="key-item">
        <span class="key-name">{{ key.name }}</span>
        <span class="key-code">{{ key.code }}</span>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'

const keys = ref([
  { name: 'Backspace', code: 8 }, { name: 'Tab', code: 9 }, { name: 'Enter', code: 13 },
  { name: 'Shift', code: 16 }, { name: 'Ctrl', code: 17 }, { name: 'Alt', code: 18 },
  { name: 'Pause/Break', code: 19 }, { name: 'Caps Lock', code: 20 }, { name: 'Esc', code: 27 },
  { name: 'Space', code: 32 }, { name: 'Page Up', code: 33 }, { name: 'Page Down', code: 34 },
  { name: 'End', code: 35 }, { name: 'Home', code: 36 }, { name: 'Left', code: 37 },
  { name: 'Up', code: 38 }, { name: 'Right', code: 39 }, { name: 'Down', code: 40 },
  { name: 'Insert', code: 45 }, { name: 'Delete', code: 46 },
  { name: '0', code: 48 }, { name: '1', code: 49 }, { name: '2', code: 50 },
  { name: '3', code: 51 }, { name: '4', code: 52 }, { name: '5', code: 53 },
  { name: '6', code: 54 }, { name: '7', code: 55 }, { name: '8', code: 56 }, { name: '9', code: 57 },
  { name: 'A', code: 65 }, { name: 'B', code: 66 }, { name: 'C', code: 67 }, { name: 'D', code: 68 },
  { name: 'E', code: 69 }, { name: 'F', code: 70 }, { name: 'G', code: 71 }, { name: 'H', code: 72 },
  { name: 'I', code: 73 }, { name: 'J', code: 74 }, { name: 'K', code: 75 }, { name: 'L', code: 76 },
  { name: 'M', code: 77 }, { name: 'N', code: 78 }, { name: 'O', code: 79 }, { name: 'P', code: 80 },
  { name: 'Q', code: 81 }, { name: 'R', code: 82 }, { name: 'S', code: 83 }, { name: 'T', code: 84 },
  { name: 'U', code: 85 }, { name: 'V', code: 86 }, { name: 'W', code: 87 }, { name: 'X', code: 88 },
  { name: 'Y', code: 89 }, { name: 'Z', code: 90 },
  { name: 'Left Win', code: 91 }, { name: 'Right Win', code: 92 }, { name: 'Menu', code: 93 },
  { name: 'Numpad 0', code: 96 }, { name: 'Numpad 1', code: 97 }, { name: 'Numpad 2', code: 98 },
  { name: 'Numpad 3', code: 99 }, { name: 'Numpad 4', code: 100 }, { name: 'Numpad 5', code: 101 },
  { name: 'Numpad 6', code: 102 }, { name: 'Numpad 7', code: 103 }, { name: 'Numpad 8', code: 104 },
  { name: 'Numpad 9', code: 105 }, { name: 'Numpad *', code: 106 }, { name: 'Numpad +', code: 107 },
  { name: 'Numpad -', code: 109 }, { name: 'Numpad .', code: 110 }, { name: 'Numpad /', code: 111 },
  { name: 'F1', code: 112 }, { name: 'F2', code: 113 }, { name: 'F3', code: 114 },
  { name: 'F4', code: 115 }, { name: 'F5', code: 116 }, { name: 'F6', code: 117 },
  { name: 'F7', code: 118 }, { name: 'F8', code: 119 }, { name: 'F9', code: 120 },
  { name: 'F10', code: 121 }, { name: 'F11', code: 122 }, { name: 'F12', code: 123 },
])
</script>

<style scoped>

.page-header { margin-bottom: 20px; }
.page-header h1 { font-size: 22px; margin-bottom: 6px; }
.page-header p { color: var(--text-secondary); font-size: 13px; }
.key-grid { display: grid; grid-template-columns: repeat(auto-fill, minmax(150px, 1fr)); gap: 8px; }
.key-item { display: flex; justify-content: space-between; align-items: center; padding: 8px 12px; background: var(--bg-secondary); border-radius: var(--radius-sm); }
.key-name { font-size: 13px; }
.key-code { font-family: monospace; font-size: 12px; color: var(--accent); }
</style>
