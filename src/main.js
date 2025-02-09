import { createApp } from 'vue'
import App from './App.vue'
import './styles/index.scss'
import router from './router'
import store from './store'
import { setREM } from './utils/flexible'
import mLibs from './libs'
import 'virtual:svg-icons-register'
import useTheme from './utils/theme'

// 初始化主题
useTheme()

createApp(App).use(router).use(store).use(mLibs).use(setREM).mount('#app')
