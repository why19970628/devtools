<template>
  <LinkDoc title="📚 Bootstrap 文档" desc="Bootstrap 前端框架文档" :links="links" />
</template>
<script setup>
import LinkDoc from '../components/LinkDoc.vue'
const links = [
  { name: 'Bootstrap v3 中文文档', url: 'https://v3.bootcss.com/' },
  { name: 'Bootstrap v5 中文文档', url: 'https://v5.getbootstrap.com/' },
  { name: 'Bootstrap 中文网', url: 'https://www.bootcss.com/' },
]
</script>
