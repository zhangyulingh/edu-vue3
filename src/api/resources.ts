import request from '@/utils/request'

export type Common<T> = {
  code: string
  data: T
  mesg: string
  time: string
}
export type Resources = {
  categoryId: number
  createdBy: string
  createdTime: string
  description: string
  id: number
  name: string
  operatorId: number
  nullselected: boolean
  updatedBy: string
  updatedTime: string
  url: string
}

export type QueriedResult = {
  current: number
  hitCount?: false
  optimizeCountSql?: boolean
  orders?: any[]
  pages?: number
  records: Resources[] | []
  searchCount?: boolean
  size: number
  total: number
}
export type Condition = Partial<{
  id: number
  name: string
  startCreateTime: string
  url: string
  categoryId: number | ''
  endCreateTime: string
  current: number
  size: number
}>
// 按条件分页查询资源
export const getResourcesPages = (condition: Condition) => {
  return request<Common<QueriedResult>>({
    url: '/boss/resource/getResourcePages',
    method: 'post',
    data: condition
  })
}
// 保存或更新资源
export const saveOrUpdate = (resources: Partial<Resources>) => {
  return request<Common<boolean>>({
    url: '/boss/resource/saveOrUpdate',
    method: 'post',
    data: resources
  })
}
// 删除资源
export const deleteResource = (id: number) => {
  return request<Common<boolean>>({
    url: `/boss/resource/${id}`,
    method: 'delete'
  })
}
// 根据id获取资源
export const getResourceId = (id: number) => {
  return request<Common<Resources>>({
    url: `/boss/resource/${id}`,
    method: 'get'
  })
}
