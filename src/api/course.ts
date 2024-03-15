import request from '@/utils/request'

export type QueryCondition = Partial<{
  currentPage: number
  pageSize: number
  courseName: string
  status: number | ''
}>
export interface Common<T> {
  code: string
  data: T
  mesg: string
  time: string
}

export interface CoursesResult {
  records: CourseItem[]
  total: number
  size: number
  current: number
  pages: number
}

export interface CourseItem {
  id: number
  courseName: string
  price: string
  sortNum: number
  status: number
}
export function getQueryCourses(params: QueryCondition = {}) {
  return request<Common<CoursesResult>>({
    url: '/boss/course/getQueryCourses',
    method: 'post',
    data: params
  })
}
export interface Course {
  courseName: string
  brief: string
  teacherDTO: TeacherDTO
  previewFirstField: string
  previewSecondField: string
  sortNum: number
  courseListImg: string
  courseImgUrl: string
  discounts: number
  price: number
  sales: number
  discountsTag: string
  activityCourse: boolean
  activityCourseDTO: ActivityCourseDTO
  courseDescriptionMarkDown: string
  status: number
}

interface ActivityCourseDTO {
  beginTime: string
  endTime: string
  amount: number
  stock: number
}

interface TeacherDTO {
  teacherName: string
  position: string
  description: string
}
// 课程上下架
export function changeState(courseId: number, status: number) {
  return request<Common<boolean>>({
    url: '/boss/course/changeState',
    method: 'get',
    params: {
      courseId,
      status
    }
  })
}

// 保存或更新课程信息
export function saveOrUpdateCourse(course: Course) {
  return request<Common<boolean>>({
    url: '/boss/course/saveOrUpdateCourse',
    method: 'post',
    data: course
  })
}
// 获取指定id的课程信息
export function getCourseById(courseId: string) {
  return request<Common<Course>>({
    url: '/boss/course/getCourseById',
    method: 'get',
    params: {
      courseId
    }
  })
}
export type SectionDTO = {
  id: number
  courseId: number
  sectionName: string
  description: string
  createTime: string
  updateTime: string
  isVisible: boolean
  isDe: boolean
  orderNum: number
  lastOperatorId?: any
  lessonDTOS: LessonDTO[]
  status: number
}

interface LessonDTO {
  id: number
  courseId: number
  sectionId: number
  theme: string
  duration: number
  durationNum: number
  isFree: boolean
  startImgUrl: string
  orderNum: number
  status: number
  isTimingPublish: boolean
  publishTime: string
  fileId: number
}

// 获取课程营销信息
export function getSectionAndLesson(courseId: string) {
  return request<Common<SectionDTO[]>>({
    url: '/boss/course/section/getSectionAndLesson',
    method: 'get',
    params: {
      courseId
    }
  })
}
