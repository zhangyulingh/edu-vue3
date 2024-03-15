import request from '@/utils/request'

type Common<T> = {
  code: string
  data: T
  mesg: string
  time: string
}
export type MenuItem = {
  parentId: number | null
  createdBy: string
  createdTime: string
  description: string
  href: string
  icon: string
  id: number
  level: number
  name: string
  orderNum: number
  operatorId: number | null
  shown: boolean
  updatedBy: string
  updatedTime: string
}

// 获取所有菜单列表
export const getAll = () => {
  return request<Common<MenuItem[]>>({
    method: 'get',
    url: '/boss/menu/getAll'
  })
}
export type CreateOrEditedMenu = Pick<
  MenuItem,
  'parentId' | 'name' | 'href' | 'icon' | 'shown' | 'level' | 'description' | 'orderNum'
> & {
  id?: number
}
// 保存或更新菜单
export const saveOrUpdate = (menuInfo: CreateOrEditedMenu) => {
  return request<Common<boolean>>({
    method: 'post',
    url: '/boss/menu/saveOrUpdate',
    data: menuInfo
  })
}
// 删除菜单
export const deleteMenu = (id: string) => {
  return request<Common<boolean>>({
    method: 'delete',
    url: `/boss/menu/${id}`
  })
}
type SubMenuList = MenuItem & { subMenuList: SubMenuList[] | null }
type EditMenuInfo = Common<{
  menuIfo: MenuItem
  parentMenuList: SubMenuList[]
}>
// 根据id获取菜单信息
export const getEditMenuInfo = (id: string) => {
  return request<EditMenuInfo>({
    method: 'get',
    url: `/boss/menu/getEditMenuInfo`,
    params: {
      id
    }
  })
}
