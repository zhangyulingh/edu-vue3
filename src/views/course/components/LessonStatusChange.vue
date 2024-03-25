<script setup lang="ts">
import { saveOrUpdateLesson } from '@/api/course'
const dialogFormVisible = ref(false)
let title = ''
const showAndInit = (node: any, course: any, lesson: any) => {
  title = '当前状态：' + LessonStatusText[lesson.status]
  Object.assign(form, lesson)
  dialogFormVisible.value = true
}
const form = reactive({
  status: 0
})
defineExpose({
  showAndInit
})
const emits = defineEmits<{
  (e: 'lessonStatusChange'): void
}>()
// 章节状态文字
const LessonStatusText = ['隐藏', '待更新', '已发布']
const onSubmit = async () => {
  const { data } = await saveOrUpdateLesson(form)
  if (data.code === '000000') {
    emits('lessonStatusChange')
    dialogFormVisible.value = false
    ElMessage.success(`${LessonStatusText[form.status]}成功`)
  } else {
    ElMessage.error(data.mesg)
    throw new Error(data.mesg)
  }
}
</script>

<template>
  <el-dialog
    v-model="dialogFormVisible"
    title="更改章节状态"
    width="500"
    :close-on-click-modal="false"
    :close-on-press-escape="false"
  >
    <el-result icon="info" :title="title"> </el-result>
    <el-form :model="form">
      <el-form-item label="状态更改为">
        <el-select v-model="form.status">
          <el-option
            v-for="(items, index) in LessonStatusText"
            :key="index"
            :label="items"
            :value="index"
          />
        </el-select>
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
