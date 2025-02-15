import { createStore } from 'vuex'
import createPersistedState from 'vuex-persistedstate'
import getters from './getters'
import category from './modules/category'
import theme from './modules/theme'
import app from './modules/app'

const store = createStore({
  getters,
  modules: {
    category,
    theme,
    app
  },
  plugins: [
    createPersistedState({
      // 保存到 localStorage 中的 key
      key: 'my-front',
      // 需要保存的模块
      paths: ['category', 'theme']
    })
  ]
})

export default store
