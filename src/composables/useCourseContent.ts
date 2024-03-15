import { getCourseById, getSectionAndLesson } from '@/api/course'
import type { SectionDTO, Course } from '@/api/course'

// 保存结果
export const course = ref<Course>({} as Course)
export const courseSAL = ref<SectionDTO[]>([])
// 获取结果方法
export const loadSAL = async (courseId: string) => {
  const { data: courseData } = await getCourseById(courseId)
  if (courseData.code === '000000') {
    course.value = courseData.data
  } else {
    ElMessage.error(courseData.mesg)
    throw new Error(courseData.mesg)
  }
  const { data: courseSalData } = await getSectionAndLesson(courseId)
  if (courseSalData.code === '000000') {
    courseSAL.value = courseSalData.data
  } else {
    ElMessage.error(courseSalData.mesg)
    throw new Error(courseSalData.mesg)
  }
}
