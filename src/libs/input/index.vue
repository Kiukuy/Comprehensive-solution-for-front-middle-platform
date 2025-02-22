<script>
const TYPE_TEXT = 'text'
const TYPE_TEXTAREA = 'textarea'
// 输入框 类型集合
const typeEnum = [TYPE_TEXT, TYPE_TEXTAREA]
</script>

<script setup>
import { computed } from 'vue'

// 输入的字符
const text = defineModel({ required: true, type: String })
const props = defineProps({
  // 输入框的类型
  type: {
    type: String,
    default: TYPE_TEXT,
    validator(value) {
      const result = typeEnum.includes(value)
      if (!result) {
        throw new Error(`type 的值必须在可选范围内 [${typeEnum.join('、')}]`)
      }
      return result
    }
  },
  // 输入框最大字符限制
  max: {
    type: [String, Number]
  }
})

// 输入的字符数
const currentNumber = computed(() => {
  return text.value.length
})
</script>

<template>
  <div class="relative">
    <input
      v-if="type === TYPE_TEXT"
      type="text"
      class="border-gray-200 dark:border-zinc-600 dark:bg-zinc-800 duration-100 dark:text-zinc-400 border-[1px] outline-0 py-0.5 px-1 text-sm rounded-sm focus:border-blue-400 w-full"
      v-model="text"
      :maxlenght="max"
    />
    <textarea
      v-if="type === TYPE_TEXTAREA"
      class="border-gray-200 dark:border-zinc-600 dark:bg-zinc-800 duration-100 dark:text-zinc-400 border-[1px] outline-0 py-0.5 px-1 text-sm rounded-sm focus:border-blue-400 w-full"
      v-model="text"
      :maxlenght="max"
      rows="5"
    ></textarea>
    <span
      v-if="max"
      class="absolute right-1 bottom-0.5 text-zinc-400 text-xs"
      :class="{ 'text-red-700': currentNumber === parseInt(max) }"
      >{{ currentNumber }} / {{ max }}</span
    >
  </div>
</template>

<style lang="scss" scoped></style>
