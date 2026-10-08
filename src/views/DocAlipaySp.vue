<template>
  <LinkDoc title="🤝 支付宝服务商文档" desc="支付宝服务商相关开放平台文档" :links="links" />
</template>
<script setup>
import LinkDoc from '../components/LinkDoc.vue'
const links = [
  { name: '支付宝服务商文档', url: 'https://opendocs.alipay.com/open/203' },
  { name: '支付宝开放平台首页', url: 'https://opendocs.alipay.com/' },
  { name: '支付宝 APP 支付文档', url: 'https://opendocs.alipay.com/open/203/105286' },
]
</script>
