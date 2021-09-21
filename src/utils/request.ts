import axios, { AxiosRequestConfig } from 'axios'

const request = axios.create({
  // baseURL: import.meta.env.BASE_URL
})
request.interceptors.request.use(config => {
  // 统一设置token
  return config
},
error => {
  return Promise.reject(error)
})

request.interceptors.response.use(response => {
  // 返回结果处理
  return response
},
error => {
  return Promise.reject(error)
})
export default <T = any>(config: AxiosRequestConfig) => {
  return request(config).then(response => {
    return (response.data.data || response.data) as T
  })
}
