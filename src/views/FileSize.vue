<template>
  <div class="tool-page">
    <div class="page-header">
      <h1>💾 文件大小单位换算</h1>
      <p>Bytes, KB, MB, GB, TB, PB 实时多单位联动换算</p>
    </div>
    <div class="size-grid">
      <div class="size-item">
        <label>Bytes (B)</label>
        <input v-model.number="bytes" type="number" min="0" @input="convertFrom('bytes')" />
      </div>
      <div class="size-item">
        <label>KB</label>
        <input v-model.number="kb" type="number" min="0" @input="convertFrom('kb')" />
      </div>
      <div class="size-item">
        <label>MB</label>
        <input v-model.number="mb" type="number" min="0" @input="convertFrom('mb')" />
      </div>
      <div class="size-item">
        <label>GB</label>
        <input v-model.number="gb" type="number" min="0" @input="convertFrom('gb')" />
      </div>
      <div class="size-item">
        <label>TB</label>
        <input v-model.number="tb" type="number" min="0" @input="convertFrom('tb')" />
      </div>
      <div class="size-item">
        <label>PB</label>
        <input v-model.number="pb" type="number" min="0" @input="convertFrom('pb')" />
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'

const bytes = ref(0)
const kb = ref(0)
const mb = ref(0)
const gb = ref(0)
const tb = ref(0)
const pb = ref(0)

function convertFrom(source) {
  let val
  switch (source) {
    case 'bytes': val = bytes.value || 0; break
    case 'kb': val = (kb.value || 0) * 1024; break
    case 'mb': val = (mb.value || 0) * 1024 ** 2; break
    case 'gb': val = (gb.value || 0) * 1024 ** 3; break
    case 'tb': val = (tb.value || 0) * 1024 ** 4; break
    case 'pb': val = (pb.value || 0) * 1024 ** 5; break
    default: return
  }
  bytes.value = val
  kb.value = val / 1024
  mb.value = val / 1024 ** 2
  gb.value = val / 1024 ** 3
  tb.value = val / 1024 ** 4
  pb.value = val / 1024 ** 5
}
</script>

<style scoped>

.page-header { margin-bottom: 20px; }
.page-header h1 { font-size: 22px; margin-bottom: 6px; }
.page-header p { color: var(--text-secondary); font-size: 13px; }
.size-grid { display: grid; grid-template-columns: repeat(3, 1fr); gap: 16px; }
.size-item { display: flex; flex-direction: column; gap: 4px; }
.size-item label { font-size: 12px; color: var(--text-secondary); }
.size-item input { font-family: monospace; font-size: 16px; }
</style>
