<template>
  <LinkDoc title="🎯 Iconfont 图标库导航" desc="常用图标库与 iconfont 在线入口" :links="links" />
</template>
<script setup>
import LinkDoc from '../components/LinkDoc.vue'
const links = [
  { name: 'Iconfont 阿里巴巴矢量图标库', url: 'https://www.iconfont.cn/' },
  { name: 'IconPark 字节跳动图标库', url: 'https://iconpark.oceanengine.com/' },
  { name: 'Tabler Icons', url: 'https://tabler.io/icons' },
  { name: 'Lucide Icons', url: 'https://lucide.dev/' },
  { name: 'Material Design Icons', url: 'https://fonts.google.com/icons' },
]
</script>
