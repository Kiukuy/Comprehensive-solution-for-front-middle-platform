import { createRouter, createWebHistory } from 'vue-router'
import { isMobileTerminal } from '@/utils/flexible'
import mobileTerminalRoutes from './modules/mobile-routes'
import pcTerminalRoutes from './modules/pc-routes'
import { computed, watch } from 'vue'

const routesType = computed(() => {
  return isMobileTerminal.value ? mobileTerminalRoutes : pcTerminalRoutes
})

// 创建 vueRouter 实例
const router = createRouter({
  history: createWebHistory(),
  routes: routesType.value
})

// 重置路由
const whiteList = []
const resetRouter = () => {
  // 获取当前所有路由
  const routes = router
    .getRoutes()
    .filter((route) => !whiteList.includes(route.name))
  // 遍历并删除非白名单路由
  routes.forEach((route) => {
    if (router.hasRoute(route.name)) {
      router.removeRoute(route.name)
    }
  })
  // 添加新的路由
  routesType.value.forEach((route) => {
    router.addRoute(route)
  })
  // 切换到新的路由
  router.replace(router.currentRoute.value.fullPath)
}

watch(routesType, () => resetRouter())
export default router
