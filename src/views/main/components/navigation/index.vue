<script setup>
import { isMobileTerminal } from '@/utils/flexible'
import mobileNavigationVue from './mobile/index.vue'
import pcNavigationVue from './PC/index.vue'
import { useStore } from 'vuex'

const store = useStore()
store.dispatch('category/useCategoryData')
</script>

<template>
  <mobile-navigation-vue v-if="isMobileTerminal" />
  <pc-navigation-vue v-else></pc-navigation-vue>
</template>

<style lang="scss" scoped></style>
