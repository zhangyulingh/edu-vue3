import axios, { type AxiosRequestHeaders } from 'axios'
import { useTokenStore } from '@/stores/mytoken'
import { refreshToken } from '@/api/users'
import router from '@/router'
const request = axios.create({
  // baseURL: import.meta.env.VITE_API_URL
})
// 请求拦截器
request.interceptors.request.use((config) => {
  if (config.headers) {
    config.headers = {} as AxiosRequestHeaders
  }
  const store = useTokenStore()
  config.headers.Authorization = store.token.access_token
  return config
})
// 相应拦截器
request.interceptors.response.use(
  (r) => r,
  async (e) => {
    if (e.response.status === 401) {
      const { data } = await refreshToken()
      if (data.success) {
        const store = useTokenStore()
        store.saveToken(data.content)
        return request(e.config)
      } else {
        ElMessage.error('登录已过期，请重新登录')
        router.push({
          name: 'login'
        })
      }
    } else if (e.response.status === 403) {
      ElMessage.error('没有权限')
      return { data: { code: '123456' } }
    }
    return Promise.reject(e)
  }
)
export default request
