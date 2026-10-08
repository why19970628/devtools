<template>
  <LinkDoc title="🛒 淘宝开放平台文档" desc="淘宝/天猫开放平台接口文档" :links="links" />
</template>
<script setup>
import LinkDoc from '../components/LinkDoc.vue'
const links = [
  { name: '淘宝开放平台首页', url: 'https://open.taobao.com/' },
  { name: '淘宝 API 文档中心', url: 'https://open.taobao.com/apiList.htm' },
  { name: '淘宝 OAuth 文档', url: 'https://open.taobao.com/docV3.htm?docId=118&docType=1' },
]
</script>
