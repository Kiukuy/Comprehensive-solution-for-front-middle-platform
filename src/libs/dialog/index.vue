<script setup>
import {} from 'vue'
// 控制开关
const isVisible = defineModel({ type: Boolean, required: true })
const props = defineProps({
  // 标题
  title: {
    type: String
  },
  // 取消按钮文本
  cancelText: {
    type: String,
    default: '取消'
  },
  // 确定按钮文本
  confirmText: {
    type: String,
    default: '确定'
  },
  // 取消按钮点击事件
  cancelHandler: {
    type: Function
  },
  // 确定按钮点击事件
  confirmHandler: {
    type: Function
  },
  // 关闭的回调
  close: {
    type: Function
  }
})

/**
 * 取消按钮点击事件
 */
const onCancelClick = () => {
  if (props.cancelHandler) {
    props.cancelHandler()
  }
  close()
}

/**
 * 确定按钮点击事件
 */
const onConfirmClick = () => {
  if (props.confirmHandler) {
    props.confirmHandler()
  }
  close()
}

const close = () => {
  isVisible.value = false
  if (props.close) {
    props.close()
  }
}
</script>

<template>
  <div>
    <!-- 蒙版 -->
    <transition name="fade">
      <div
        v-if="isVisible"
        @click="close"
        class="w-screen h-screen bg-zinc-900/80 z-40 fixed left-0 top-0"
      ></div>
    </transition>
    <!-- 内容 -->
    <transition name="up">
      <div
        v-if="isVisible"
        class="max-w-[80%] max-h-[80%] overflow-auto fixed top-[10%] left-[50%] translate-x-[-50%] z-50 px-2 py-1.5 rounded-sm border dark:border-zinc-600 cursor-pointer bg-white dark:bg-zinc-800 xl:min-w-[35%]"
      >
        <!-- 标题 -->
        <div
          class="text-lg font-bold text-zinc-900 dark:text-zinc-200 mb-2"
          v-if="title"
        >
          {{ title }}
        </div>
        <!-- 内容 -->
        <div class="text-base text-zinc-900 dark:text-zinc-200 mb-2">
          <slot></slot>
        </div>
        <!-- 按钮 -->
        <div class="flex justify-end" v-if="cancelHandler || confirmHandler">
          <m-button type="info" class="mr-2" @click="onCancelClick">
            {{ cancelText }}
          </m-button>
          <m-button type="primary" @click="onConfirmClick">
            {{ confirmText }}
          </m-button>
        </div>
      </div>
    </transition>
  </div>
</template>

<style lang="scss" scoped>
.fade-enter-active,
.fade-leave-active {
  transition: all 0.3s;
}
.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}

.up-enter-active,
.up-leave-active {
  transition: all 0.3s;
}
.up-enter-from,
.up-leave-to {
  transform: translate3d(-50%, 100px, 0);
  opacity: 0;
}
</style>
