import { getResourcesPages } from '@/api/resources'
import type { Condition, QueriedResult } from '@/api/resources'
// 查询条件
export const queryCondition = reactive<Condition>({
  name: '',
  url: '',
  categoryId: '',
  current: 1,
  size: 5
})

// 查询结果
export const queriedResult = ref<QueriedResult>({
  current: 1,
  records: [],
  size: 0,
  total: 0
})
// 查询方法
export const queryResources = async (params: Condition = {}) => {
  Object.assign(queryCondition, params)
  const { data } = await getResourcesPages(queryCondition)
  if (data.code === '000000') {
    queriedResult.value = data.data
  } else {
    ElMessage.error(data.mesg)
    throw new Error(data.mesg)
  }
}
