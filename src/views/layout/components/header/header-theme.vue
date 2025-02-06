<script setup>
import {} from 'vue'
import { THEME_LIGHT, THEME_DARK, THEME_SYSTEM } from '@/constants'

// 构建渲染数据源
const themeArr = [
  {
    id: '0',
    type: THEME_LIGHT,
    icon: 'theme-light',
    title: '极简白'
  },
  {
    id: '1',
    type: THEME_DARK,
    icon: 'theme-dark',
    title: '极夜黑'
  },
  {
    id: '2',
    type: THEME_SYSTEM,
    icon: 'theme-system',
    title: '跟随系统'
  }
]
</script>

<template>
  <m-popover placement="bottom-left">
    <template #reference>
      <m-svg-icon
        name="theme-light"
        class="guide-theme w-4 h-4 p-1 cursor-pointer rounded-sm duration-200 outline-none hover:bg-zinc-100/60"
        fillClass="fill-zinc-900"
      ></m-svg-icon>
    </template>
    <m-popbox :popData="themeArr"></m-popbox>
  </m-popover>
</template>

<style lang="scss" scoped></style>
