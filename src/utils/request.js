import axios from 'axios'
import store from '@/store'

const service = axios.create({
  baseURL: import.meta.env.VITE_BASE_API,
  timeout: 5000
})

// 请求拦截器
service.interceptors.request.use(
  (config) => {
    if (store.getters.token) {
      // 如果 token 存在，注入 token
      config.headers.Authorization = `Bearer ${store.getters.token}`
    }
    // 必须返回配置
    return config
  },
  (error) => {
    return Promise.reject(error)
  }
)

// 响应拦截器
service.interceptors.response.use((response) => {
  const { success, message, data } = response.data
  if (success) {
    return data
  } else {
    // TODO: 业务错误
    return Promise.reject(new Error(message))
  }
})

export default service
