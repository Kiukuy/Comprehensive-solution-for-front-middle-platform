<script setup>
import { computed } from 'vue'
import { THEME_LIGHT, THEME_DARK, THEME_SYSTEM } from '@/constants'
import { useStore } from 'vuex'

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

/**
 * menu 切换事件
 */
const onItemClick = (theme) => {
  store.commit('theme/changeThemeType', theme.type)
}

// 控制图标展示
const store = useStore()
const svgIconName = computed(() => {
  // 根据当前的 themeType 返回当前的选中 icon
  const findTheme = themeArr.find((theme) => {
    return theme.type === store.getters.themeType
  })
  return findTheme.icon
})
</script>

<template>
  <m-popover placement="bottom-left">
    <template #reference>
      <m-svg-icon
        :name="svgIconName"
        class="guide-theme w-4 h-4 p-1 cursor-pointer rounded-sm duration-200 outline-none hover:bg-zinc-100/60 dark:hover:dark:bg-zinc-900"
        fillClass="fill-zinc-900 dark:fill-zinc-300"
      ></m-svg-icon>
    </template>
    <m-popbox @click="onItemClick" :popData="themeArr"></m-popbox>
  </m-popover>
</template>

<style lang="scss" scoped></style>
