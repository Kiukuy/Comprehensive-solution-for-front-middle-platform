<script>
// 触发搜索（点击或回车）事件
const EMIT_SEARCH = 'search'
// 删除所有文本事件
const EMIT_CLEAR = 'clear'
// 输入事件
const EMIT_INPUT = 'input'
// 获取焦点事件
const EMIT_FOCUS = 'focus'
// 失去焦点事件
const EMIT_BLUR = 'blur'
</script>

<script setup>
import { ref, watch } from 'vue'
import { onClickOutside } from '@vueuse/core'

const inputValue = defineModel({ type: String, required: true })
const emits = defineEmits([
  EMIT_SEARCH,
  EMIT_CLEAR,
  EMIT_INPUT,
  EMIT_FOCUS,
  EMIT_BLUR
])
// 监听用户输入行为
watch(inputValue, (val) => {
  emits(EMIT_INPUT, val)
})

// 一键清空文本
const onClearClick = () => {
  inputValue.value = ''
  emits(EMIT_CLEAR, '')
}

// 搜索功能
const onSearchHandleder = () => {
  emits(EMIT_SEARCH, inputValue.value)
}

// input 是否获取到焦点
const isFocus = ref(false)
const containerTarget = ref(null)
// 获取到焦点
const onFocusHandler = () => {
  isFocus.value = true
  emits(EMIT_FOCUS)
}
// 失去焦点
const onBlurHandler = () => {
  emits(EMIT_BLUR)
}

// 点击区域外隐藏
onClickOutside(containerTarget, () => {
  isFocus.value = false
  emits(EMIT_FOCUS)
})
</script>

<template>
  <div
    ref="containerTarget"
    class="group relative w-full p-0.5 rounded-xl border-white duration-500 hover:bg-red-100/40"
  >
    <div>
      <!-- 搜索图标 -->
      <m-svg-icon
        name="search"
        class="h-1.5 w-1.5 absolute translate-y-[-50%] top-[50%] left-2"
        color="#707070"
      ></m-svg-icon>
      <!-- 输入框 -->
      <input
        class="block w-full h-[44px] pl-4 text-sm outline-0 bg-zinc-100 caret-zinc-400 rounded-xl text-zinc-900 tracking-wide font-semibold border border-zinc-100 duration-500 group-hover:bg-white group-hover:border-zinc-200 focus:border-red-300"
        type="text"
        placeholder="搜索"
        v-model="inputValue"
        @keyup.enter="onSearchHandleder"
        @focus="onFocusHandler"
        @blur="onBlurHandler"
      />
      <!-- 删除按钮 -->
      <m-svg-icon
        v-show="inputValue"
        name="input-delete"
        class="absolute h-1.5 w-1.5 translate-y-[-50%] top-[50%] right-9 duration-500 cursor-pointer"
        @click="onClearClick"
      ></m-svg-icon>
      <!-- 分割线 -->
      <div
        class="opacity-0 absolute h-1.5 w-[1px] translate-y-[-50%] top-[50%] right-[62px] duration-500 bg-zinc-200 group-hover:opacity-100"
      ></div>
      <!-- TODO: 搜索按钮(通用组件) -->
      <m-button
        class="absolute translate-y-[-50%] top-[50%] right-1 rounded-xl duration-500 opacity-0 group-hover:opacity-100"
        icon="search"
        iconColor="#ffffff"
        @click="onSearchHandleder"
      ></m-button>
    </div>
    <!-- 下拉区 -->
    <transition name="slide">
      <div
        v-if="$slots.dropdown"
        v-show="isFocus"
        class="max-h-[368px] w-full text-base overflow-auto bg-white absolute z-20 left-0 top-[56px] p-2 rounded border border-zinc-200 duration-200 hover:shadow-xl"
      >
        <slot name="dropdown"></slot>
      </div>
    </transition>
  </div>
</template>

<style lang="scss" scoped>
.slide-enter-active,
.slide-leave-active {
  transition: all 0.5s;
}
.slide-enter-from,
.slide-leave-to {
  transform: translateY(40px);
  opacity: 0;
}
</style>
