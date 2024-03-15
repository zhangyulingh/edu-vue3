import request from '@/utils/request'

type Common<T> = {
  code: string
  data: T
  mesg: string
  time: string
}
export type Role = {
  code: string
  createBy?: string
  createTime?: string
  description: string
  id?: number
  name: string
  operatorId?: number | null
  updateBy?: string
  updateTime?: string
}

export type QueyrResult = Partial<{
  current: number
  hitCount: boolean
  optimizeCountSql: boolean
  orders: any[]
  pages: number
  records: Role[] | []
  searchCount: boolean
  size: number
  total: number
}>
export type Condition = Partial<{
  code: string
  id: number
  name: string
  startCreateTime: string
  endCreateTime: string
  current: number
  size: number
}>
// 按条件查询角色信息
export const getRolePages = (condition: Condition) => {
  return request<Common<QueyrResult>>({
    url: '/boss/role/getRolePages',
    method: 'post',
    data: condition
  })
}
type RoleParams = Pick<Role, 'code' | 'name' | 'description'>
// 保存或更新角色信息
export const saveOrUpdateRole = (role: Role) => {
  return request<Common<boolean>>({
    url: '/boss/role/saveOrUpdate',
    method: 'post',
    data: role
  })
}
// 删除角色
export const deleteRole = (id: number) => {
  return request<Common<boolean>>({
    url: `/boss/role/${id}`,
    method: 'delete'
  })
}
// 获取指定id的角色信息
export const getRoleById = (id: number) => {
  return request<Common<Role>>({
    url: `/boss/role/${id}`,
    method: 'get'
  })
}
export type RoleMenuItem = {
  createdBy: string
  createdTime: string
  description: string
  href: string
  icon: string
  id: number
  level: number
  name: string
  parentId: number | null
  orderNum: number
  selected: boolean
  shown: boolean
  subMenuList: RoleMenuItem[] | null
  updatedBy: string
  updatedTime: string
}
// 获取角色菜单权限
export const getRoleMenus = (id: string) => {
  return request<Common<RoleMenuItem[]>>({
    url: `/boss/menu/getRoleMenus`,
    method: 'get',
    params: { roleId: id }
  })
}
// 给角色分配菜单权限
export const allocateRoleMenus = (roleId: string, menuIdList: number[]) => {
  return request<Common<boolean>>({
    url: `/boss/menu/allocateRoleMenus`,
    method: 'post',
    data: { roleId, menuIdList }
  })
}
export type RoleResourceItem = {
  categoryId: number
  createdBy: string
  createdTime: string
  description: string
  id: number
  name: string
  operatorId: number | null
  selected: boolean
  updatedBy: string
  updatedTime: string
  url: string
}

export type RoleCategoryItem = {
  createdBy: string
  createdTime: string
  id: number
  name: string
  operatorId: number | null
  resourceList: RoleCategoryItem[] | null
  selected: boolean
  sort: number
  updatedBy: string
  updatedTime: string
}
// 获取角色拥有的角色列表
export const getRoleOwnMenus = (id: string) => {
  return request<Common<RoleCategoryItem[]>>({
    url: `/boss/resource/getRoleResources`,
    method: 'get',
    params: {
      roleId: id
    }
  })
}
// 给角色分配资源权限
export const allocateRoleResources = (roleId: string, resourceIdList: number[]) => {
  return request<Common<boolean>>({
    url: `/boss/resource/allocateRoleResources`,
    method: 'post',
    data: { roleId, resourceIdList }
  })
}
