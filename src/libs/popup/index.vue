<script setup>
import { useScrollLock } from '@vueuse/core'
import { watch } from 'vue'

const visible = defineModel({ type: Boolean, required: true })

// ---滚动锁定---
const isLocked = useScrollLock(document.body)
watch(
  visible,
  (val) => {
    isLocked.value = val
  },
  {
    immediate: true
  }
)
</script>

<template>
  <div class="">
    <!-- teleport -->
    <teleport to="body">
      <!-- 蒙版 -->
      <transition name="fade">
        <div
          v-if="visible"
          class="bg-zinc-900/80 fixed top-0 left-0 z-40 h-screen w-screen"
          @click="visible = false"
        ></div>
      </transition>
      <!-- 内容 -->
      <transition name="popup-down-up">
        <div
          v-if="visible"
          v-bind="$attrs"
          class="fixed z-50 w-screen bg-white bottom-0"
        >
          <slot></slot>
        </div>
      </transition>
    </teleport>
  </div>
</template>

<style lang="scss" scoped>
// fade 展示动画
.fade-enter-active,
.fade-leave-active {
  transition: all 0.3s;
}
.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
// popup-down-up 展示动画
.popup-down-up-enter-active,
.popup-down-up-leave-active {
  transition: all 0.3s;
}
.popup-down-up-enter-from,
.popup-down-up-leave-to {
  transform: translateY(100%);
}
</style>
