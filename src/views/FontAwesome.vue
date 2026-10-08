<template>
  <LinkDoc title="🎨 FontAwesome 图标" desc="FontAwesome 图标库在线浏览" :links="links" />
</template>
<script setup>
import LinkDoc from '../components/LinkDoc.vue'
const links = [
  { name: 'FontAwesome v4 图标列表', url: 'https://fontawesome.com/v4/icons/' },
  { name: 'FontAwesome v5 图标搜索', url: 'https://fontawesome.com/v5/search' },
  { name: 'FontAwesome v6 图标搜索', url: 'https://fontawesome.com/search' },
  { name: 'FontAwesome CDN', url: 'https://cdnjs.com/libraries/font-awesome' },
]
</script>
