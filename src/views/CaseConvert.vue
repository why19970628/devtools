<template>
  <div class="tool-page">
    <div class="page-header">
      <h1>🔠 命名风格 / 大小写转换</h1>
      <p>驼峰、帕斯卡、下划线、中划线与大小写转换</p>
    </div>
    <div class="action-bar">
      <select v-model="mode" class="lang-select">
        <option value="camel">驼峰 camelCase</option>
        <option value="pascal">帕斯卡 PascalCase</option>
        <option value="snake">下划线 snake_case</option>
        <option value="kebab">中划线 kebab-case</option>
        <option value="upper">大写 UPPERCASE</option>
        <option value="lower">小写 lowercase</option>
      </select>
      <button class="btn btn-primary" @click="convert">转换</button>
      <button class="btn" @click="copyResult">复制结果</button>
    </div>
    <div class="io-panel">
      <div class="io-box">
        <div class="io-label"><span>输入</span></div>
        <textarea v-model="input" class="io-textarea" placeholder="输入文本，如 hello_world 或 helloWorld"></textarea>
      </div>
      <div class="io-box">
        <div class="io-label"><span>输出</span></div>
        <textarea v-model="output" class="io-textarea" readonly></textarea>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'

const input = ref('user_profile_name')
const output = ref('')
const mode = ref('camel')

function convert() {
  output.value = ''
  if (!input.value.trim()) return
  const words = input.value.split(/[_\-\s]+|(?=[A-Z])/).filter(Boolean).map(w => w.toLowerCase())
  switch (mode.value) {
    case 'camel': output.value = words.map((w, i) => i === 0 ? w : w.charAt(0).toUpperCase() + w.slice(1)).join(''); break
    case 'pascal': output.value = words.map(w => w.charAt(0).toUpperCase() + w.slice(1)).join(''); break
    case 'snake': output.value = words.join('_'); break
    case 'kebab': output.value = words.join('-'); break
    case 'upper': output.value = input.value.toUpperCase(); break
    case 'lower': output.value = input.value.toLowerCase(); break
  }
}

function copyResult() { if (output.value) navigator.clipboard.writeText(output.value) }
</script>

<style scoped>

.page-header { margin-bottom: 20px; }
.page-header h1 { font-size: 22px; margin-bottom: 6px; }
.page-header p { color: var(--text-secondary); font-size: 13px; }
.lang-select { width: 200px; }
</style>
