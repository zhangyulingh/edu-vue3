<script setup lang="ts">
import { saveOrUpdateSection } from '@/api/course'
const dialogFormVisible = ref(false)
let title = ''
const showAndInit = (course: any, section: any) => {
  title = '当前状态：' + sectionStatusText[section.status]
  Object.assign(form, section)
  dialogFormVisible.value = true
}
const form = reactive({
  status: 0
})
defineExpose({
  showAndInit
})
const emits = defineEmits<{
  (e: 'statusChange'): void
}>()
// 章节状态文字
const sectionStatusText = ['隐藏', '待更新', '已发布']
const onSubmit = async () => {
  const { data } = await saveOrUpdateSection(form)
  if (data.code === '000000') {
    emits('statusChange')
    dialogFormVisible.value = false
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
            v-for="(items, index) in sectionStatusText"
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
