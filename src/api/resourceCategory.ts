import request from '@/utils/request'

type Common<T> = {
  code: string
  data: T
  mesg: string
  time: string
}
export type ResourceCategory = {
  createdBy: string
  createdTime: string
  id: number
  name: string
  operation: number | null
  selected: boolean
  updatedBy: string
  updatedTime: string
}
export const getAll = () => {
  return request<Common<ResourceCategory[]>>({
    url: '/boss/resource/category/getAll',
    method: 'get'
  })
}

type ResourceCategoryParams = Pick<ResourceCategory, 'name' | 'sort'> & {
  id?: number
}
// 保存或更新
export const saveOrUpdate = (ResourceCategoryInfo: ResourceCategoryParams) => {
  return request<Common<boolean>>({
    url: '/boss/resource/category/saveOrderUpdate',
    method: 'post',
    data: ResourceCategoryInfo
  })
}
// 删除资源类别
export const deleteCategory = (id: number) => {
  return request<Common<boolean>>({
    url: `/boss/resource/category/${id}`,
    method: 'delete'
  })
}
