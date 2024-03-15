import { getUserPages } from '@/api/users'
import type { QueryCondition, QueryResult } from '@/api/users'

// 查询条件
export const queryCondition = ref({} as QueryCondition)
// 查询结果
export const queriedResult = ref({} as QueryResult)
// 查询动作
export const queryUsers = async (params: QueryCondition = {}) => {
  Object.assign(queryCondition.value, params)
  const { data } = await getUserPages(queryCondition.value)
  if (data.code === '000000') {
    queriedResult.value = data.data
  } else {
    ElMessage.error('获取用户列表失败' + data.mesg)
    throw new Error('获取用户列表失败' + data.mesg)
  }
}
