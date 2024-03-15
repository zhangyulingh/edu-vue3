<script setup lang="ts">
import { saveOrUpdateCourse, getCourseById } from '@/api/course'
import { EditPen, Tools, Picture, Clock, Document } from '@element-plus/icons-vue'
import ImageUpoload from './ImageUpoload.vue'
import TextEditor from './TextEditor.vue'
import { useRouter } from 'vue-router'

const router = useRouter()
const props = defineProps({
  courseId: {
    type: String,
    default: ''
  }
})
const currentStep = ref(0)
const course = ref({
  courseName: '',
  brief: '',
  teacherDTO: {
    teacherName: '',
    position: '',
    description: ''
  },
  previewFirstField: '',
  previewSecondField: '',
  sortNum: 0,
  courseListImg: '',
  courseImgUrl: '',
  discounts: 0,
  price: 0,
  sales: 0,
  discountsTag: '',
  activityCourse: true,
  activityCourseDTO: {
    beginTime: '',
    endTime: '',
    amount: 0,
    stock: 0
  },
  courseDescriptionMarkDown: '',
  status: 1
})
const timeRange = ref([] as any)
watch(timeRange, (newTime) => {
  if (Array.isArray(newTime)) {
    course.value.activityCourseDTO.beginTime = newTime[0].toISOString()
    course.value.activityCourseDTO.endTime = newTime[1].toISOString()
  } else {
    course.value.activityCourseDTO.beginTime = ''
    course.value.activityCourseDTO.endTime = ''
  }
})
onMounted(async () => {
  if (props.courseId) {
    // 获取课程详情
    const { data } = await getCourseById(props.courseId)
    if (data.code === '000000') {
      const courseData = data.data
      course.value = {
        ...courseData,
        teacherDTO: {
          teacherName: courseData.teacherDTO.teacherName,
          position: courseData.teacherDTO.position,
          description: courseData.teacherDTO.description
        },
        activityCourseDTO: {
          beginTime: courseData.activityCourseDTO.beginTime,
          endTime: courseData.activityCourseDTO.endTime,
          amount: courseData.activityCourseDTO.amount,
          stock: courseData.activityCourseDTO.stock
        }
      }
      if (courseData.activityCourseDTO.beginTime && courseData.activityCourseDTO.endTime) {
        timeRange.value = [
          new Date(courseData.activityCourseDTO.beginTime),
          new Date(courseData.activityCourseDTO.endTime)
        ]
      }
    } else {
      ElMessage.error('获取课程详情失败')
    }
  }
})
const onSubmit = async () => {
  const info = props.courseId ? '编辑' : '新建'
  const { data } = await saveOrUpdateCourse(course.value)
  if (data.code === '000000') {
    ElMessage.success(`${info}课程成功`)
    router.push({ name: 'course' })
  } else {
    ElMessage.error(`${info}课程失败`)
  }
}
</script>

<template>
  <div class="mx-2">
    <el-page-header @back="$router.go(-1)" class="mb-2">
      <template #content>
        <div class="flex items-center">
          <span class="text-large font-600 mr-3"> {{ props.courseId ? '编辑' : '新建' }}课程</span>
        </div>
      </template>
      <template #extra>
        <div class="flex items-center">
          <el-button type="primary" class="ml-2" @click="onSubmit">保存</el-button>
        </div>
      </template>
    </el-page-header>
    <el-card>
      <template #header>
        <el-steps class="mb-4" :active="currentStep" simple>
          <el-step
            title="基本信息"
            :icon="EditPen"
            @click="currentStep = 0"
            class="cursor-pointer"
          />
          <el-step title="课程封面" :icon="Tools" @click="currentStep = 1" class="cursor-pointer" />
          <el-step
            title="销售信息"
            :icon="Picture"
            @click="currentStep = 2"
            class="cursor-pointer"
          />
          <el-step title="秒杀活动" :icon="Clock" @click="currentStep = 3" class="cursor-pointer" />
          <el-step
            title="课程详情"
            :icon="Document"
            @click="currentStep = 4"
            class="cursor-pointer"
          />
        </el-steps>
      </template>
      <el-form :model="course" label-width="120px" class="mr8">
        <div v-show="currentStep === 0">
          <el-form-item label="课程名称">
            <el-input v-model="course.courseName" maxlength="100" show-word-limit />
          </el-form-item>
          <el-form-item label="简介">
            <el-input v-model="course.brief" />
          </el-form-item>
          <el-form-item label="讲师姓名">
            <el-input v-model="course.teacherDTO.teacherName" />
          </el-form-item>
          <el-form-item label="职位"
            ><el-input v-model="course.teacherDTO.position"
          /></el-form-item>
          <el-form-item label="讲师简介"
            ><el-input v-model="course.teacherDTO.description"
          /></el-form-item>
          <el-form-item label="课程概述">
            <el-input v-model="course.previewFirstField" style="flex: 1; margin-right: 10px" />
            <el-input v-model="course.previewSecondField" style="flex: 1" />
          </el-form-item>
          <el-form-item label="课程排序"
            ><el-input-number v-model="course.sortNum" controls-position="right"
          /></el-form-item>
        </div>
        <div v-show="currentStep === 1">
          <el-form-item label="展示图片">
            <ImageUpoload v-model="course.courseListImg" />
          </el-form-item>
          <el-form-item label="解锁图片">
            <ImageUpoload v-model="course.courseImgUrl"
          /></el-form-item>
        </div>
        <div v-show="currentStep === 2">
          <el-form-item label="售卖价格">
            <el-input-number v-model="course.discounts" controls-position="right" />
          </el-form-item>
          <el-form-item label="商品原价">
            <el-input-number v-model="course.price" controls-position="right" />
          </el-form-item>
          <el-form-item label="销量">
            <el-input-number v-model="course.sales" controls-position="right" />
          </el-form-item>
          <el-form-item label="活动标签">
            <el-input v-model="course.discountsTag" c />
          </el-form-item>
        </div>
        <div v-show="currentStep === 3">
          <el-form-item label="限时秒杀">
            <el-switch
              v-model="course.activityCourse"
              :active-value="true"
              :inactive-value="false"
            ></el-switch>
          </el-form-item>
          <template v-if="course.activityCourse">
            <el-form-item label="开始时间">
              <el-date-picker
                v-model="timeRange"
                type="datetimerange"
                range-separator="至"
                start-placeholder="开始时间"
                end-placeholder="结束时间"
              />
            </el-form-item>
            <el-form-item label="秒杀价格">
              <el-input-number
                v-model="course.activityCourseDTO.amount"
                :min="0"
                controls-position="right"
              />
            </el-form-item>
            <el-form-item label="库存值">
              <el-input-number
                v-model="course.activityCourseDTO.stock"
                :min="0"
                controls-position="right"
              ></el-input-number>
            </el-form-item>
          </template>
        </div>
        <div v-show="currentStep === 4">
          <el-form-item label="课程详情">
            <TextEditor v-model="course.courseDescriptionMarkDown" />
          </el-form-item>
          <ElFormItem label="是否上架">
            <el-switch
              v-model="course.status"
              :active-value="true"
              :inactive-value="false"
            ></el-switch>
          </ElFormItem>
        </div>
        <div class="flex justify-center items-center">
          <el-button v-show="currentStep !== 0" @click="currentStep--">上一步</el-button>
          <el-button v-show="currentStep !== 4" @click="currentStep++">下一步</el-button>
          <el-button v-show="currentStep === 4" type="primary" @click="onSubmit">保存</el-button>
        </div>
      </el-form>
    </el-card>
  </div>
</template>
