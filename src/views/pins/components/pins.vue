<script setup>
import { ref } from 'vue'
import { getPexelsFormId } from '@/api/pexels.js'
import { isMobileTerminal } from '@/utils/flexible.js'
import { useRouter } from 'vue-router'
import { useStore } from 'vuex'
import { weiboShare } from '@/utils/share'

const props = defineProps({
  id: {
    type: String,
    required: true
  }
})

const router = useRouter()
const store = useStore()

const pexelData = ref({})
/**
 * 获取详情数据
 */
const getPexelData = async () => {
  const data = await getPexelsFormId(props.id)
  pexelData.value = data
}
getPexelData()

/**
 * 关闭按钮处理事件
 */
const onPop = () => {
  store.commit('app/changeRouterType', 'back')
  router.back()
}

/**
 * 分享按钮点击处理
 */
const onShareClick = () => {
  weiboShare(
    pexelData.value.photo,
    `https://imooc-front.lgdsunday.club/pins/${pexelData.value.id}`
  )
}
</script>

<template>
  <div
    class="fixed left-0 top-0 w-screen h-screen z-20 backdrop-blur-4xl bg-white dark:bg-zinc-800 pb-2 overflow-y-auto xl:p-2 xl:bg-transparent"
  >
    <!-- 移动端下展示 navbar -->
    <m-navbar
      v-if="isMobileTerminal"
      :clickLeft="onPop"
      :clickRight="onShareClick"
    >
      {{ pexelData.title }}
      <template #right>
        <m-svg-icon
          name="share"
          class="w-3 h-3"
          fillClass="fill-zinc-900 dark:fill-zinc-200"
        ></m-svg-icon>
      </template>
    </m-navbar>
    <!-- pc 端下展示关闭图标 -->
    <m-svg-icon
      v-else
      name="close"
      class="w-3 h-3 ml-1 p-0.5 cursor-pointer duration-200 rounded-sm hover:bg-zinc-100 absolute right-2 top-2"
      fillClass="fill-zinc-400"
      @click="onPop"
    ></m-svg-icon>
    <!-- 内容区 -->
    <div
      v-if="pexelData.title"
      class="xl:w-[80%] xl:h-full xl:mx-auto xl:rounded-lg xl:flex"
    >
      <img
        :src="pexelData.photo"
        class="w-screen mb-2 xl:w-3/5 xl:h-full xl:rounded-tl-lg xl:rounded-bl-lg"
      />
      <div
        class="xl:w-2/5 xl:h-full xl:bg-white xl:dark:bg-zinc-900 xl:rounded-tr-lg xl:rounded-br-lg xl:p-3"
      >
        <div v-if="!isMobileTerminal" class="flex justify-between mb-2">
          <m-svg-icon
            name="share"
            class="w-4 h-4 p-1 cursor-pointer hover:bg-zinc-200 dark:hover:bg-zinc-800 duration-300 rounded"
            fillClass="fill-zinc-900 dark:fill-zinc-200"
            @click="onShareClick"
          ></m-svg-icon>

          <m-button
            type="info"
            icon="heart"
            iconClass="fill-zinc-900 dark:fill-zinc-200"
          ></m-button>
        </div>
        <!-- 标题 -->
        <p
          class="text-base text-zinc-900 dark:text-zinc-200 ml-1 font-bold xl:text-xl xl:mb-5"
        >
          {{ pexelData.title }}
        </p>
        <!-- 作者 -->
        <div class="flex items-center mt-1 px-1">
          <img
            v-lazy
            class="h-3 w-3 rounded-full"
            :src="pexelData.avatar"
            alt=""
          />
          <span class="text-base text-zinc-900 dark:text-zinc-200 ml-1">
            {{ pexelData.author }}
          </span>
        </div>
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped></style>
