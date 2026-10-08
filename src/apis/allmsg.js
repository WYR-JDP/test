import request from '@/utils/request.js'

// 获取所有待办
// 实际请求：/api/todos/all  ->  vite 代理到  http://122.51.48.109:8088/todos/all
export const getMsg = () => {
  return request.get('/todos/all')
}
// 删除单条数据
export const deleteMsg = (id) => {
  return request.delete(`/todos/${id}`)
}
export const addMsg = (data) => {
  return request.post("/todos", data)
}
