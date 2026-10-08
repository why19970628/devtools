<template>
  <LinkDoc title="💰 支付宝开放平台文档" desc="支付宝开放平台接口与接入文档" :links="links" />
</template>
<script setup>
import LinkDoc from '../components/LinkDoc.vue'
const links = [
  { name: '支付宝开放平台文档', url: 'https://opendocs.alipay.com/' },
  { name: '支付宝 API 列表', url: 'https://opendocs.alipay.com/open/api' },
  { name: '支付宝 SDK 与示例', url: 'https://opendocs.alipay.com/open/development' },
]
</script>
