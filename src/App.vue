<script setup>
import {} from 'vue'
</script>

<template>
  <!-- 一级路由出口 -->
  <div class="h-screen fixed top-0 left-0 w-screen">
    <m-transition-router-view
      :routerType="$store.getters.routerType"
      mainComponentName="home"
    ></m-transition-router-view>
  </div>
</template>

<style lang="scss" scoped></style>
