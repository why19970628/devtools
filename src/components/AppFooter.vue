<template>
  <footer class="app-footer">
    <div class="footer-inner">
      <div class="footer-row">
        <span>{{ t('footerBrand') }}</span>
        <span>·</span>
        <span>{{ t('footerCount', { n: tools.length }) }}</span>
        <span>·</span>
        <span>{{ t('footerLocal') }}</span>
        <span style="flex:1"></span>
        <span>{{ t('footerRights') }}</span>
      </div>
    </div>
  </footer>
</template>

<script setup>
import { tools } from '../utils/tools'
import { useI18n } from '../composables/useI18n'

const { t } = useI18n()
</script>