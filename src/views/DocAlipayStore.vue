<template>
  <LinkDoc title="🏪 支付宝门店文档" desc="支付宝门店与线下支付相关文档" :links="links" />
</template>
<script setup>
import LinkDoc from '../components/LinkDoc.vue'
const links = [
  { name: '支付宝当面付文档', url: 'https://opendocs.alipay.com/open/194' },
  { name: '支付宝刷脸支付文档', url: 'https://opendocs.alipay.com/open/197' },
  { name: '支付宝门店/会员文档', url: 'https://opendocs.alipay.com/open/265' },
]
</script>
