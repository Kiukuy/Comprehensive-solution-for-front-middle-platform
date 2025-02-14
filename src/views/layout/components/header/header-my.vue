<script setup>
import {} from 'vue'
// 构建 menu 数据源
const menuArr = [
  {
    id: 0,
    title: '个人资料',
    icon: 'profile',
    path: '/profile'
  },
  {
    id: 1,
    title: '升级 VIP ',
    icon: 'vip-profile',
    path: '/member'
  },
  {
    id: 2,
    title: '退出登录',
    icon: 'logout',
    path: ''
  }
]
</script>

<template>
  <m-popover class="flex items-center" placement="bottom-left">
    <template #reference>
      <div
        class="guide-my relative flex items-center p-0.5 rounded-sm cursor-pointer duration-200 outline-none hover:bg-zinc-100 dark:hover:bg-zinc-900"
      >
        <!-- 头像 -->
        <img v-lazy src="@/assets/images/InTp.jpg" class="w-3 h-3 rounded-sm" />
        <!-- 下箭头 -->
        <m-svg-icon
          name="down-arrow"
          class="h-1.5 w-1.5 ml-0.5"
          fillClass="fill-zinc-900 dark:fill-zinc-300"
        ></m-svg-icon>
        <!-- vip 标记 -->
        <m-svg-icon
          name="vip"
          class="w-1.5 h-1.5 absolute right-[16px] bottom-0"
        ></m-svg-icon>
      </div>
    </template>
    <m-popbox :popData="menuArr"></m-popbox>
  </m-popover>
</template>

<style lang="scss" scoped></style>
