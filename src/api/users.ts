import { useTokenStore } from '@/stores/mytoken'
import request from '@/utils/request'

type LoginInfo = {
  phone: string
  code?: string
  password: string
}
// 公共类型
type CommonReturn<T = string> = {
  message: string
  state: number
  success: boolean
  content: T
}
type loginResult = CommonReturn
export const login = (loginInfo: LoginInfo) => {
  return request<loginResult>({
    method: 'post',
    url: '/front/user/login',
    data: `phone=${loginInfo.phone}&password=${loginInfo.password}`
  })
}
// 用户信息
type UserInfo = CommonReturn<{ isUpdatePassword: boolean; portrait: string; userName: string }>
export const getInfo = () => {
  return request<UserInfo>({
    method: 'get',
    url: '/front/user/getInfo'
  })
}
// 退出
export const logout = () => {
  return request({
    method: 'post',
    url: '/front/user/logout'
  })
}
// 刷新token
type RToken = CommonReturn

let promiseRT: Promise<any>
let isRefreshing = false
export const refreshToken = () => {
  if (isRefreshing) {
    return promiseRT
  }
  promiseRT = request<RToken>({
    method: 'post',
    url: '/front/user/refresh_token',
    params: {
      refreshtoken: useTokenStore().token?.refresh_token
    }
  }).finally(() => {
    isRefreshing = false
  })
  return promiseRT
}
export type QueryCondition = Partial<{
  currentPage: number
  pageSize: number
  phone: string
  userId: number
  startCreateTime: string
  endCreateTime: string
}>
export type Common<T> = {
  code: string
  mesg: string
  data: T
  time: string
}
// 用户信息
export type UserItem = {
  accountNonExpired: boolean
  accountNonLocked: boolean
  createTime: string
  credentialsNonExpired: boolean
  id: number
  isDel: boolean
  name: string
  password: string
  phone: string
  portrait: string | null
  regIp: string | null
  status: 'ENABLE' | 'DISABLE'
  updateTime: string
}
// 用户查询结果的类型
export type QueryResult = {
  current: number
  hitCount: boolean
  optimizeCountSql: boolean
  orders: unknown[]
  pages: number
  records: UserItem[]
  searchCount: boolean
  size: number
  total: number
}
// 获取用户信息列表
export const getUserPages = (queryCondition: QueryCondition = {}) => {
  return request<Common<QueryResult>>({
    method: 'post',
    url: '/boss/user/getUserPages',
    data: queryCondition
  })
}
// 启用用户
export const enableUser = (userId: number) => {
  return request<Common<boolean>>({
    method: 'get',
    url: '/boss/user/enableUser',
    params: {
      userId
    }
  })
}
// 禁用用户
export const forbidUser = (userId: number) => {
  return request<Common<boolean>>({
    method: 'post',
    url: '/boss/user/forbidUser',
    data: {
      userId
    }
  })
}
export type UserRole = {
  hasPermission: boolean
  id: number
  name: string
}
// 根据用户id列出角色
export const getRolesWithUserPermission = (userId: number) => {
  return request<Common<UserRole[]>>({
    method: 'get',
    url: '/boss/role/getRolesWithUserPermission',
    params: {
      userId
    }
  })
}
// 给用户分配角色
export const allocateUserRoles = (userId: number, roleIdList: number[]) => {
  return request<Common<boolean>>({
    method: 'post',
    url: '/boss/role/allocateUserRoles',
    data: {
      userId,
      roleIdList
    }
  })
}
