import { getQueryCourses, changeState } from '@/api/course'
import type { QueryCondition, CoursesResult } from '@/api/course'

// 查询条件
export const queryCondition = ref<QueryCondition>({
  currentPage: 1,
  pageSize: 5,
  status: ''
})

// 查询结果
export const queriedResult = ref<CoursesResult>({} as CoursesResult)

// 查询方法
export const queryCourses = async (params: QueryCondition = {}) => {
  Object.assign(queryCondition.value, params)
  const { data } = await getQueryCourses(queryCondition.value)
  if (data.code === '000000') {
    queriedResult.value = data.data
  } else {
    ElMessage.error(data.mesg)
    throw new Error(data.mesg)
  }
}
export const changeStatus = async (val: number, course: any) => {
  const xx = [
    { msg: '上架', oldVal: 1 },
    { msg: '下架', oldVal: 0 }
  ]
  const { data } = await changeState(course.id, val).catch(() => {
    course.status = xx[val].oldVal
    ElMessage.error(`${xx[val].msg}失败`)
    throw new Error(`${xx[val].msg}失败`)
  })
  if (data.code === '000000') {
    ElMessage.success(`${xx[val].msg}成功`)
  } else {
    course.status = xx[val].oldVal
    ElMessage.error(`${xx[val].msg}失败`)
    throw new Error(`${xx[val].msg}失败`)
  }
}
