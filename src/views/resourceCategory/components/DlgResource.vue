<script setup lang="ts">
import {
  getAllResources,
  onSubmit,
  form,
  isCreate,
  msgTitle,
  dialogFormVisible,
  allResources
} from '@/composables/useResourcesCategory'
import type { FormInstance } from 'element-plus'

const formLabelWidth = '140px'

const initAndShow = (id = 0) => {
  fmRef.value?.resetFields()
  dialogFormVisible.value = true
  if (id) {
    isCreate.value = false
    msgTitle.value = '更新'
    const resourceCategory = allResources.value.find((item) => item.id === id)
    Object.assign(form, resourceCategory)
  } else {
    isCreate.value = true
    msgTitle.value = '创建'
  }
}

const fmRef = ref<FormInstance>()
const rules = {
  name: [{ required: true, message: '请输入类别名称', trigger: 'blur' }],
  sort: [{ required: true, message: '请输入排序', trigger: 'blur' }]
}

defineExpose({
  initAndShow
})
</script>

<template>
  <div>
    <el-dialog v-model="dialogFormVisible" :title="msgTitle" width="500">
      <el-form :model="form" ref="fmRef" :rules="rules">
        <el-form-item label="类别名称" :label-width="formLabelWidth" prop="name">
          <el-input v-model="form.name" autocomplete="off" />
        </el-form-item>
        <el-form-item label="排序" :label-width="formLabelWidth" prop="sort">
          <el-input v-model="form.sort" placeholder="Please select a zone" />
        </el-form-item>
      </el-form>
      <template #footer>
        <div class="dialog-footer">
          <el-button @click="dialogFormVisible = false">取消</el-button>
          <el-button type="primary" @click="onSubmit"> 提交 </el-button>
        </div>
      </template>
    </el-dialog>
  </div>
</template>

<style lang="scss" scoped></style>
@/composables/useResourcesCategory
