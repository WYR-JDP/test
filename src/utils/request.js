import axios from 'axios'

/**
 * axios 实例
 *
 * baseURL 用 '/api'，配合 vite.config.ts 里的 server.proxy：
 *   前端请求 /api/todos/all  ->  vite 转发到 http://122.51.48.109:8088/todos/all
 * 好处是后端地址只在 vite.config.ts 里写一次，将来上线换成 nginx 转发时
 * 前端代码一行都不用改。
 */
const request = axios.create({
  baseURL: '/api',
  timeout: 10000 // 超时时间 10s
})

/* ------------------------------ 请求拦截器 ------------------------------ */
request.interceptors.request.use(
  (config) => {
    // 统一携带 token（后端暂时不需要的话，没存 token 就不会带，不影响）
    const token = localStorage.getItem('token')
    if (token) {
      config.headers.Authorization = `Bearer ${token}`
    }
    return config
  },
  (error) => {
    console.error('请求发送失败：', error)
    return Promise.reject(error)
  }
)

/* ------------------------------ 响应拦截器 ------------------------------ */
request.interceptors.response.use(
  // HTTP 状态码 2xx 会走这里
  (response) => {
    const res = response.data

    // 后端直接返回数组（比如 /todos/all）或者没按 { code, data, msg } 返回时，
    // 原样返回，不要瞎拆包
    if (!res || typeof res !== 'object' || Array.isArray(res) || !('code' in res)) {
      return res
    }

    // 后端约定：code 为 200/0 表示成功，返回业务数据 data
    if (res.code === 200 || res.code === 0) {
      return res.data
    }

    // 业务层面的失败（HTTP 200 但 code 不对）
    const msg = res.msg || res.message || '请求失败'
    console.error('业务错误：', msg)
    return Promise.reject(new Error(msg))
  },
  // HTTP 状态码非 2xx 会走这里
  (error) => {
    let msg = '请求失败'

    if (error.code === 'ECONNABORTED' || error.message.includes('timeout')) {
      msg = '请求超时，请稍后重试'
    } else if (!error.response) {
      msg = '网络异常，请检查网络连接'
    } else {
      const status = error.response.status
      const statusMap = {
        400: '请求参数错误',
        401: '登录已过期，请重新登录',
        403: '没有权限访问',
        404: '请求地址不存在',
        500: '服务器内部错误',
        502: '网关错误',
        503: '服务不可用'
      }
      msg = statusMap[status] || `请求失败（${status}）`

      if (status === 401) {
        localStorage.removeItem('token')
      }
    }

    console.error('请求错误：', msg, error)
    return Promise.reject(new Error(msg))
  }
)

/* --------------------------- 常用方法的快捷封装 --------------------------- */
// get('/todos/all')
export const get = (url, params, config) => request.get(url, { params, ...config })

// post('/todos', { content: '买菜' })
export const post = (url, data, config) => request.post(url, data, config)

export const put = (url, data, config) => request.put(url, data, config)

export const del = (url, params, config) => request.delete(url, { params, ...config })

export default request
