<template>
  <LinkDoc title="💳 微信支付服务商文档" desc="微信支付服务商模式相关文档" :links="links" />
</template>
<script setup>
import LinkDoc from '../components/LinkDoc.vue'
const links = [
  { name: '服务商接入指引', url: 'https://pay.weixin.qq.com/docs/merchant/development/access/service-provider-access-guide.html' },
  { name: '服务商分账文档', url: 'https://pay.weixin.qq.com/docs/merchant/products/profit-sharing/' },
  { name: '服务商进件与子商户', url: 'https://pay.weixin.qq.com/docs/merchant/development/access/' },
]
</script>
