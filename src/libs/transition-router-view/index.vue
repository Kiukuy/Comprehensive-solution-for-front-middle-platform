<script>
// 无
const NONE = 'none'
// 进入
const ROUTER_TYPER_PUSH = 'push'
// 退出
const ROUTER_TYPER_BACK = 'back'
// 集合
const ROUTER_TYPER_ENUM = [NONE, ROUTER_TYPER_PUSH, ROUTER_TYPER_BACK]
</script>

<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { isMobileTerminal } from '@/utils/flexible'

const props = defineProps({
  // 路由跳转的类型，对应 ROUTER_TYPER_ENUM
  routerType: {
    type: String,
    default: NONE,
    validator(val) {
      const result = ROUTER_TYPER_ENUM.includes(val)
      if (!result) {
        throw new Error(
          `你的 routerType 必须是 ${ROUTER_TYPER_ENUM.join('、')} 中的一个`
        )
      }
      return result
    }
  },
  // 首页的组件名称，对应任务栈中的第一个组件
  mainComponentName: {
    type: String,
    required: true
  }
})

// 任务栈
const virtualTaskStack = ref([props.mainComponentName])
/**
 * 清空栈
 */
const clearTask = () => {
  virtualTaskStack.value = [props.mainComponentName]
}

const router = useRouter()
// 跳转动画
const transitionName = ref('')
/**
 * router 的前置守卫，监听路由的变化
 */
router.beforeEach((to, from) => {
  // 进入首页默认清空栈
  if (to.name === props.mainComponentName) {
    transitionName.value = isMobileTerminal.value ? ROUTER_TYPER_BACK : NONE
    clearTask()
    return
  }
  transitionName.value = props.routerType
  if (props.routerType === ROUTER_TYPER_PUSH) {
    // 入栈
    virtualTaskStack.value.push(to.name)
  } else if (props.routerType === ROUTER_TYPER_BACK) {
    // 出栈
    virtualTaskStack.value.pop()
  }
})

// 处理动画状态变化
const isAnimation = ref(false)
const beforeEnter = () => {
  isAnimation.value = true
}
const afterLeave = () => {
  isAnimation.value = false
}
</script>

<template>
  <!-- 路由出口 -->
  <router-view v-slot="{ Component }">
    <!-- 动画组件 -->
    <transition
      :name="transitionName"
      @before-enter="beforeEnter"
      @after-leave="afterLeave"
    >
      <!-- keep-alive 缓存组件 -->
      <!-- component 动态组件 -->
      <keep-alive :include="virtualTaskStack">
        <component
          :class="{ '!fixed top-0 left-0 w-screen z-50': isAnimation }"
          :is="Component"
        ></component>
      </keep-alive>
    </transition>
  </router-view>
</template>

<style lang="scss" scoped>
// push 页面时：新页面的进入动画
.push-enter-active {
  animation-name: push-in;
  animation-duration: 0.4s;
}
@keyframes push-in {
  0% {
    transform: translate(100%, 0);
  }
  100% {
    transform: translate(0, 0);
  }
}
// push 页面时：老页面的退出动画
.push-leave-active {
  animation-name: push-out;
  animation-duration: 0.4s;
}
@keyframes push-out {
  0% {
    transform: translate(0, 0);
  }
  100% {
    transform: translate(-50%, 0);
  }
}
// 后退页面时：即将展示的页面动画
.back-enter-active {
  animation-name: back-in;
  animation-duration: 0.4s;
}
@keyframes back-in {
  0% {
    transform: translate(-100%, 0);
  }
  100% {
    transform: translate(0, 0);
  }
}
// 后退页面时：后退的页面执行的动画
.back-leave-active {
  animation-name: back-out;
  animation-duration: 0.4s;
}
@keyframes back-out {
  0% {
    transform: translate(0, 0);
  }
  100% {
    transform: translate(50%, 0);
  }
}
</style>
