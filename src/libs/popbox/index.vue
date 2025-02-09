<script setup>
defineProps({
  popData: {
    type: Array,
    required: true
  }
})
// 注册 div 点击事件
const emits = defineEmits(['click'])
// 监听点击事件触发
const onJumpPath = (target) => {
  emits('click', target)
}
</script>

<template>
  <div class="w-[140px] overflow-hidden">
    <div
      class="flex items-center p-1 cursor-pointer rounded hover:bg-zinc-100/60 dark:hover:bg-zinc-800"
      v-for="(item, index) in popData"
      :key="item.id ? item.id : index"
      @click="onJumpPath(item)"
    >
      <m-svg-icon
        :name="item.icon"
        class="w-1.5 h-1.5 mr-1"
        fillClass="fill-zinc-900 dark:fill-zinc-300"
      ></m-svg-icon>
      <span class="text-zinc-800 text-sm dark:text-zinc-300">{{
        item.title
      }}</span>
    </div>
  </div>
</template>

<style lang="scss" scoped></style>
