import axios from 'axios'
import store from '@/store'
import router from '@/router'
import JSONBigint from 'json-bigint'

// 配置axios的默认配置
axios.defaults.baseURL = 'http://ttapi.research.itcast.cn/mp/v1_0/'
// 配置头部token  不能写在这里   写在这里页面刷新只会执行一次
// axios.defaults.headers.Authorization = `Bearer ${store.getUser().token}`

// 处理大数据
axios.defaults.transformResponse = [(data) => {
  try {
    return JSONBigint.parse(data)
  } catch (error) {
    return data
  }
}]

// 请求拦截器
axios.interceptors.request.use(config => {
  config.headers.Authorization = `Bearer ${store.getUser().token}`
  return config
}, error => {
  return Promise.reject(error)
})

// 响应拦截器
axios.interceptors.response.use(response => {
  return response
}, error => {
  if (error.response && error.response.status === 401) {
    router.push('/login')
  }
  return Promise.reject(error)
})

export default axios
