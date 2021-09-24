import axios, { AxiosRequestConfig } from 'axios'
import { store } from '@/store'
import { ElMessage, ElMessageBox } from 'element-plus'
import router from '@/router'
const request = axios.create({
  // baseURL: import.meta.env.BASE_URL
})
request.interceptors.request.use(config => {
  // 统一设置token
  const { user } = store.state
  if (user && user.token) {
    config.headers.Authorization = `Bearer ${user.token}`
  }
  return config
},
error => {
  return Promise.reject(error)
})
let isRefreshing = false
request.interceptors.response.use(response => {
  // 返回结果处理
  const { status } = response.data
  if (status === 200 || response.config.responseType === 'blob') {
    return response
  }
  if (status === 410000) {
    if (isRefreshing) return Promise.reject(response)
    isRefreshing = true
    ElMessageBox.confirm('您的登录已过期，您可以取消停留在此页面，或确认重新登录', '登录过期', {
      confirmButtonText: '确认',
      cancelButtonText: '取消'
    }).then(() => {
      store.commit('setUser', null)
      router.push({
        path: '/login',
        query: {
          redirect: router.currentRoute.value.fullPath
        }
      })
    }).finally(() => {
      isRefreshing = false
    })
    return Promise.reject(response)
  }
  ElMessage({
    type: 'error',
    message: response.data.msg,
    duration: 5 * 1000
  })
  return Promise.reject(response)
},
error => {
  ElMessage({
    type: 'error',
    message: error.msg,
    duration: 5 * 1000
  })
  return Promise.reject(error)
})
export default <T = any>(config: AxiosRequestConfig) => {
  return request(config).then(response => {
    return (response.data.data || response.data) as T
  })
}
