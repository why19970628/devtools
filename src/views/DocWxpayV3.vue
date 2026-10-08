<template>
  <LinkDoc title="🔐 微信支付 APIv3 文档" desc="微信支付 APIv3 官方接口文档" :links="links" />
</template>
<script setup>
import LinkDoc from '../components/LinkDoc.vue'
const links = [
  { name: 'APIv3 接口文档', url: 'https://pay.weixin.qq.com/docs/merchant/apis/native-payment/direct-jsons/native-jsons-notify.html' },
  { name: 'APIv3 签名与验签', url: 'https://pay.weixin.qq.com/docs/merchant/development/interface-rules/signature-generation-and-verification.html' },
  { name: 'APIv3 证书与序列号', url: 'https://pay.weixin.qq.com/docs/merchant/development/interface-rules/api-certificate-intro.html' },
]
</script>
