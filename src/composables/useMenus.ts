import { getAll, saveOrUpdate, deleteMenu, getEditMenuInfo } from '@/api/menus'
import type { MenuItem, CreateOrEditedMenu } from '@/api/menus'
import router from '@/router'

export function useMenus() {
  const allMenus = ref([] as MenuItem[])
  const getAllMenus = async () => {
    const { data } = await getAll()
    if (data.code === '000000') {
      allMenus.value = data.data
    } else {
      ElMessage.error(data.mesg)
      throw new Error('获取菜单列表失败')
    }
  }
  const topMenus = computed(() => allMenus.value.filter((menu) => menu.level === 0))

  // 表单的响应式数据
  const form = ref<CreateOrEditedMenu>({
    name: '',
    parentId: -1,
    href: '',
    icon: '',
    level: 0,
    shown: true,
    description: '',
    orderNum: 0
  })
  // 表单提交事件
  const onSubmit = async () => {
    // 校验表单
    const { data } = await saveOrUpdate(form.value)
    console.log(data)
    if (data.code === '000000' && data.data) {
      ElMessage.success(`${msgText.value}成功！}`)
      router.push({ name: 'menus' })
    } else {
      ElMessage.error(`${msgText.value}失败！}`)
      throw new Error(`${msgText.value}失败！}`)
    }
  }
  // 删除菜单
  const handleDelete = async (id: string) => {
    await ElMessageBox.confirm('此操作将永久删除该菜单, 是否继续?', '提示', {
      confirmButtonText: '确定',
      cancelButtonText: '取消',
      type: 'warning'
    }).catch(() => {
      ElMessage.info('已取消删除')
      return new Promise(() => {})
    })
    // 根据id删除菜单
    const { data } = await deleteMenu(id)
    if (data.code === '000000' && data.data) {
      ElMessage.success('删除成功！')
      getAllMenus()
    } else {
      ElMessage.error('删除失败！')
      throw new Error('删除失败！')
    }
  }
  // 根据id获取菜单信息
  const getMenuInfoById = async (id: string) => {
    if (!Number(id)) {
      isCreate.value = true
      return
    } else {
      isCreate.value = false
    }
    const res = await getEditMenuInfo(id)
    if (data.code === '000000' && data.data) {
      form.value = data.data.menuIfo
    } else {
      ElMessage.error('获取菜单信息失败！')
      throw new Error('获取菜单信息失败！')
    }
  }
  // 状态与提示文本
  const isCreate = ref(true)
  const msgText = computed(() => (isCreate.value ? '添加' : '更新'))
  return { allMenus, getMenuInfoById, getAllMenus, topMenus, handleDelete, onSubmit, form, msgText }
}
