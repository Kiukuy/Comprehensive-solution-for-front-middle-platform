<script setup>
import {} from 'vue'
import { useRouter } from 'vue-router'
import { confirm } from '@/libs'
import { useStore } from 'vuex'

const router = useRouter()
const store = useStore()

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

// 进入登录
const onToLogin = () => {
  router.push('/login')
}

/**
 * menu Item 点击事件，也可以根据其他的 key 作为判定，比如 name
 */
const onItemClick = (item) => {
  // 有路径则进行路径跳转
  if (item.path) {
    router.push(item.path)
    return
  }
  // 无路径则为退出登录
  confirm('您确定要退出登录吗？').then(() => {
    // 退出登录不存在跳转路径
    store.dispatch('user/logout')
  })
}
</script>

<template>
  <m-popover
    class="flex items-center"
    placement="bottom-left"
    :hiddenPop="$store.getters.token ? false : true"
  >
    <template #reference>
      <div
        v-if="$store.getters.token"
        class="guide-my relative flex items-center p-0.5 rounded-sm cursor-pointer duration-200 outline-none hover:bg-zinc-100 dark:hover:bg-zinc-900"
      >
        <!-- 头像 -->
        <img
          v-lazy
          :src="$store.getters.userInfo.avatar"
          class="w-3 h-3 rounded-sm"
        />
        <!-- 下箭头 -->
        <m-svg-icon
          name="down-arrow"
          class="h-1.5 w-1.5 ml-0.5"
          fillClass="fill-zinc-900 dark:fill-zinc-300"
        ></m-svg-icon>
        <!-- vip 标记 -->
        <m-svg-icon
          v-if="$store.getters.userInfo.vipLevel"
          name="vip"
          class="w-1.5 h-1.5 absolute right-[16px] bottom-0"
        ></m-svg-icon>
      </div>
      <div v-else>
        <m-button
          class="guide-my"
          icon="profile"
          iconColor="#fff"
          @click="onToLogin"
        ></m-button>
      </div>
    </template>
    <m-popbox
      v-if="$store.getters.token"
      :popData="menuArr"
      @click="onItemClick"
    ></m-popbox>
  </m-popover>
</template>

<style lang="scss" scoped></style>
