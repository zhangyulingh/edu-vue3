<script setup lang="ts">
import { saveOrUpdateRole, getRoleById } from '@/api/roles'
const dialogFormVisible = ref(false)
const formLabelWidth = '140px'

const initData = () => ({
  name: '',
  description: '',
  code: ''
})
const form = reactive(initData())
const isCreate = ref(true)
const msgText = ref('')
const initAndShow = async (id = 0) => {
  dialogFormVisible.value = true
  Object.assign(form, initData()) // 清空表单
  if (id) {
    isCreate.value = false
    msgText.value = '更新'
    const { data } = await getRoleById(id)
    if (data.code === '000000') {
      Object.assign(form, data.data)
    } else {
      ElMessage.error(`获取ID为${id}的角色信息失败` + data.mesg)
      throw new Error(`获取ID为${id}的角色信息失败` + data.mesg)
    }
  } else {
    isCreate.value = true
    msgText.value = '创建'
  }
}

const rules = {
  name: [{ required: true, message: '请输入角色名称', trigger: 'blur' }],
  code: [{ required: true, message: '请输入角色编码', trigger: 'blur' }],
  description: [{ required: true, message: '请输入角色描述', trigger: 'blur' }]
}
const emit = defineEmits<{
  (e: 'role-change'): void
}>()
const onSubmit = async () => {
  const { data } = await saveOrUpdateRole(form).finally(() => (dialogFormVisible.value = false))
  if (data.code === '000000') {
    ElMessage.success(`${msgText.value}成功`)
    emit('role-change')
  } else {
    ElMessage.error(`${msgText.value}失败`)
    throw new Error(`${msgText.value}失败`)
  }
}

defineExpose({
  initAndShow
})
</script>

<template>
  <div>
    <el-dialog v-model="dialogFormVisible" :title="msgText + '角色'" width="500">
      <el-form :model="form" :rules="rules">
        <el-form-item label="角色名称" :label-width="formLabelWidth" prop="name">
          <el-input v-model="form.name" autocomplete="off" />
        </el-form-item>
        <el-form-item label="角色编码" :label-width="formLabelWidth" prop="code">
          <el-input v-model="form.code" autocomplete="off" />
        </el-form-item>
        <el-form-item label="角色描述" :label-width="formLabelWidth" prop="description">
          <el-input v-model="form.description" autocomplete="off" type="textarea" />
        </el-form-item>
      </el-form>
      <template #footer>
        <div class="dialog-footer">
          <el-button @click="dialogFormVisible = false">取消</el-button>
          <el-button type="primary" @click="onSubmit"> 确定 </el-button>
        </div>
      </template>
    </el-dialog>
  </div>
</template>
