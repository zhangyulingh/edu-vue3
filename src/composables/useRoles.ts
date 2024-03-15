import { getRolePages } from '@/api/roles'
import type { Condition, Role, QueyrResult } from '@/api/roles'

// 条件
export const queryCondition = reactive<Condition>({
  name: '',
  size: 5
})
// 结果
export const queriedResult = ref<QueyrResult>({
  records: [],
  size: 0,
  total: 0
})
// 方法
export const queryRoles = async (params: Condition = {}) => {
  Object.assign(queryCondition, params)
  const { data } = await getRolePages(queryCondition)
  if (data.code === '000000') {
    queriedResult.value = data.data
  } else {
    ElMessage.error('查询失败')
    throw new Error('查询失败')
  }
}
