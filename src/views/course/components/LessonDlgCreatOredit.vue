<script setup lang="ts">
import { getLessonById, saveOrUpdateLesson } from '@/api/course'
import { th } from 'element-plus/es/locales.mjs'
const dialogFormVisible = ref(false)

const initdata = () => ({
  id: undefined as undefined | number,
  courseId: 0,
  sectionId: 0,
  theme: '',
  duration: 0,
  isFree: false,
  orderNum: 0,
  status: 0,
  isPreview: false,
  courseName: '',
  sectionName: ''
})
const form = reactive(initdata())
let title = ''
const showAndInit = async (node: any, data: any, course: any) => {
  Object.assign(form, initdata())
  // 根据dode的lebel 1  2   判断title是章节还是课时
  if (node.level === 1) {
    title = '添加章节'
    form.sectionId = data.id
    form.sectionName = data.sectionName
  } else if (node.level === 2) {
    title = '更新课时'
    form.id = data.id
    form.sectionId = node.parent.id
    form.sectionName = node.parent.sectionName
    const { data: newData } = await getLessonById(data.id)
    if (newData.code === '000000' && newData.data) {
      form.theme = newData.data.theme
      form.duration = newData.data.duration
      form.isFree = newData.data.isFree
      form.orderNum = newData.data.orderNum
      form.status = newData.data.status
    } else {
      form.theme = data.theme
      form.duration = data.duration
      form.isFree = data.isFree
      form.orderNum = data.orderNum
      form.status = data.status
    }
  }
  form.courseId = course.id
  form.courseName = course.courseName
  dialogFormVisible.value = true
}
defineExpose({
  showAndInit
})
const emits = defineEmits<{
  (e: 'LessonChange'): void
}>()
const onSubmit = async () => {
  const { data } = await saveOrUpdateLesson(form)
  if (data.code === '000000') {
    dialogFormVisible.value = false
    emits('LessonChange')
    ElMessage.success('操作成功')
  } else {
    ElMessage.error(data.mesg)
    throw new Error(data.mesg)
  }
}
</script>

<template>
  <el-dialog
    v-model="dialogFormVisible"
    :title="title"
    :close-on-click-modal="false"
    :close-on-press-escape="false"
  >
    <el-form :model="form" label-position="top">
      <el-form-item label="课程名称">
        <el-input v-model="form.courseName" disabled />
      </el-form-item>
      <el-form-item label="章节名称">
        <el-input v-model="form.sectionName" disabled />
      </el-form-item>
      <el-form-item label="课时名称">
        <el-input v-model="form.theme" autocomplete="off" />
      </el-form-item>
      <el-form-item label="时常名称">
        <el-input v-model="form.duration" autocomplete="off" />
      </el-form-item>
      <el-form-item label="是否开放试听">
        <el-switch v-model="form.isFree" :active-value="true" :inactive-value="false" />
      </el-form-item>
      <!-- 课时排序 -->
      <el-form-item label="课时排序">
        <el-input-number
          v-model="form.orderNum"
          autocomplete="off"
          controls-position="right"
          style="width: 100%"
        />
      </el-form-item>
    </el-form>
    <template #footer>
      <div class="dialog-footer">
        <el-button @click="dialogFormVisible = false">取消</el-button>
        <el-button type="primary" @click="onSubmit"> 提交 </el-button>
      </div>
    </template>
  </el-dialog>
</template>

<style lang="scss" scoped></style>
