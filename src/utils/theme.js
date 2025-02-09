import store from '@/store'
import { watch } from 'vue'
import { THEME_LIGHT, THEME_DARK, THEME_SYSTEM } from '@/constants'

/**
 * 监听系统主题变更
 */
let matchMedia
const watchSystemThemeChange = () => {
  // 仅需初始化一次即可
  if (matchMedia) return
  matchMedia = window.matchMedia('(prefers-color-scheme: light)')
  // 监听主题变更
  matchMedia.onchange = function () {
    changeTheme(store.getters.themeType)
  }
}

/**
 * 变更主题
 * @param {*} theme 主题的标记常量
 */
const changeTheme = (theme) => {
  // html 的 css
  let themeClassName = ''
  switch (theme) {
    case THEME_LIGHT:
      themeClassName = 'light'
      break
    case THEME_DARK:
      themeClassName = 'dark'
      break
    case THEME_SYSTEM:
      watchSystemThemeChange()
      themeClassName = matchMedia.matches ? 'light' : 'dark'
  }
  // 修改 html 的 css
  document.documentElement.className = themeClassName
}

/**
 * 初始化主题
 */
export default () => {
  watch(() => store.getters.themeType, changeTheme, {
    // 初始执行一次
    immediate: true
  })
}
