import { computed, watch } from 'vue'
// import { PC_DEVICE_WIDTH } from '@/constants'
import { useWindowSize } from '@vueuse/core'

const { width } = useWindowSize()

// export const isMobileTerminal = computed(() => {
//   return width.value < PC_DEVICE_WIDTH
// })
/**
 * 判断当前是否为移动设备
 */
export const isMobileTerminal = computed(() => {
  return /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(
    navigator.userAgent
  )
})

/**
 * 初始化 rem 基准值，最大为 40px
 */
// export const useREM = () => {
//   // 定义最大的 fontSize
//   const MAX_FONT_SIZE = 40

//   // 监听 html 文档被解析完成的事件
//   document.addEventListener('DOMContentLoaded', () => {
//     // 获取 html 标签
//     const html = document.querySelector('html')
//     // 获取根元素 fontSize 标准，屏幕宽度 / 10。（以 Iphone 为例 Iphone 6 屏幕宽度为 375，则标准 fontSize 为 37.5）
//     let fontSize = window.innerWidth / 10
//     // 获取到的 fontSize 不允许超过我们定义的最大值
//     fontSize = fontSize > MAX_FONT_SIZE ? MAX_FONT_SIZE : fontSize
//     // 定义根元素 (html) fontSize 的大小（rem）
//     html.style.fontSize = fontSize + 'px'
//   })
// }

export function setREM() {
  // 定义最大的 fontSize
  const MAX_FONT_SIZE = 40
  watch(
    width,
    () => {
      document.documentElement.style.fontSize =
        window.innerWidth / 10 > MAX_FONT_SIZE
          ? MAX_FONT_SIZE + 'px'
          : width.value / 10 + 'px'
    },
    {
      immediate: true
    }
  )
}
