<script setup lang="ts">
import { getSectionById, saveOrUpdateSection } from '@/api/course'
import type { Course } from '@/api/course'
const dialogFormVisible = ref(false)

const initData = () => ({
  id: undefined as number | undefined,
  courseId: 0,
  courseName: '',
  sectionName: '',
  description: '',
  orderNum: 0,
  status: 0
})
const form = ref(initData())
const title = ref('')
const showAndInit = async (course: Course, sectionId: number | undefined) => {
  form.value = initData()
  title.value = sectionId ? '编辑章节' : '添加章节'
  // 获取要编辑的章节信息
  if (sectionId) {
    const { data } = await getSectionById(sectionId)
    if (data.code === '000000') {
      const { id, sectionName, description, orderNum } = data.data
      form.value = Object.assign(form.value, { id, sectionName, description, orderNum })
    } else {
      ElMessage.error(data.mesg || '获取章节信息失败')
      throw new Error('获取章节信息失败')
    }
  }
  form.value.courseName = course.courseName
  form.value.courseId = course.id!
  dialogFormVisible.value = true
}
defineExpose({
  showAndInit
})
const emits = defineEmits<{
  (e: 'sectionRefres'): void
}>()
const onSubmit = async () => {
  const { data } = await saveOrUpdateSection(form.value)
  if (data.code === '000000') {
    ElMessage.success(`${form.value.id ? '编辑' : '添加'}章节成功`)
    dialogFormVisible.value = false
    emits('sectionRefres')
  } else {
    ElMessage.error(data.mesg || '操作失败')
    throw new Error('操作失败')
  }
}
</script>

<template>
  <el-dialog
    v-model="dialogFormVisible"
    :title="title"
    width="500"
    :close-on-click-modal="false"
    :close-on-press-escape="false"
  >
    <el-form :model="form" label-position="top">
      <el-form-item label="课程名称">
        <el-input v-model="form.courseName" autocomplete="off" disabled />
      </el-form-item>
      <el-form-item label="章节名称">
        <el-input v-model="form.sectionName" autocomplete="off" />
      </el-form-item>
      <el-form-item label="章节描述">
        <el-input v-model="form.description" autocomplete="off" type="textarea" />
      </el-form-item>
      <el-form-item label="章节排序">
        <el-input-number v-model="form.orderNum" autocomplete="off" controls-position="right" />
      </el-form-item>
    </el-form>
    <template #footer>
      <div class="dialog-footer">
        <el-button @click="dialogFormVisible = false">取消</el-button>
        <el-button type="primary" @click="onSubmit"> 确认 </el-button>
      </div>
    </template>
  </el-dialog>
</template>

<style lang="scss" scoped></style>
