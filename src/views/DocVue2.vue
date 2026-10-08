<template>
  <LinkDoc title="💚 Vue.js 2 文档" desc="Vue.js 2 官方中文文档" :links="links" />
</template>
<script setup>
import LinkDoc from '../components/LinkDoc.vue'
const links = [
  { name: 'Vue.js 2 中文文档', url: 'https://v2.cn.vuejs.org/' },
  { name: 'Vue.js 2 API', url: 'https://v2.cn.vuejs.org/api/' },
  { name: 'Vue Router 3 文档', url: 'https://router.vuejs.org/zh/' },
]
</script>
