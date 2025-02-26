<script setup>
import { isMobileTerminal } from '@/utils/flexible'
import pcPaymentVue from './pc-payment/index.vue'
</script>

<template>
  <div>
    <!-- PC 端支付 -->
    <pc-payment-vue v-if="!isMobileTerminal"></pc-payment-vue>
  </div>
</template>

<style lang="scss" scoped></style>
