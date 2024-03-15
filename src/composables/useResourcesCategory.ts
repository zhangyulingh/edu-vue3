import { getAll, saveOrUpdate, deleteCategory } from '@/api/resourceCategory'
import type { ResourceCategory } from '@/api/resourceCategory'

export const allResources = ref([] as ResourceCategory[])
export const getAllResources = async () => {
  const { data } = await getAll()
  if (data.code === '000000') {
    allResources.value = data.data
  } else {
    console.error('获取资源列表失败')
    throw new Error('获取资源列表失败')
  }
}
export const form = reactive({
  name: '',
  sort: 0
})
export const isCreate = ref(true)
export const msgTitle = ref('')
export const dialogFormVisible = ref(false)

// 提交按钮
export const onSubmit = async () => {
  try {
    const { data } = await saveOrUpdate(form)
    if (data.code === '000000') {
      ElMessage.success(`${msgTitle.value}成功`)
      dialogFormVisible.value = false
      getAllResources()
    } else {
      ElMessage.error(`${msgTitle.value}失败`)
      throw new Error('error')
    }
  } catch (error) {
    console.error(error)
  }
}
// 删除按钮
export const handleDelete = async (id: number) => {
  await ElMessageBox.confirm('此操作将永久删除该资源类别, 是否继续?', '提示', {
    confirmButtonText: '确定',
    cancelButtonText: '取消',
    type: 'warning'
  }).catch(() => {
    ElMessage.info('已取消删除')
    return new Promise(() => {})
  })
  const { data } = await deleteCategory(id)
  if (data.code === '000000') {
    ElMessage.success('删除成功')
    getAllResources()
  } else {
    ElMessage.error('删除失败')
    throw new Error('删除失败')
  }
}
