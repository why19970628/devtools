<template>
  <LinkDoc title="☁️ 腾讯云文档" desc="腾讯云产品与 API 文档" :links="links" />
</template>
<script setup>
import LinkDoc from '../components/LinkDoc.vue'
const links = [
  { name: '腾讯云文档中心', url: 'https://cloud.tencent.com/document' },
  { name: '腾讯云 API 文档', url: 'https://cloud.tencent.com/document/api' },
  { name: '腾讯云 SDK 中心', url: 'https://cloud.tencent.com/document/sdk' },
]
</script>
