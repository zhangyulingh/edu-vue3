<script setup lang="ts">
import { getRolesWithUserPermission, allocateUserRoles } from '@/api/users'
import type { UserRole } from '@/api/users'
const dialogFormVisible = ref(false)
const formLabelWidth = '140px'

const form = reactive({
  userId: undefined as number | undefined,
  roleIdList: [] as number[]
})
const allRoles = ref<UserRole[]>([])
const initAndShow = async (userId: number) => {
  dialogFormVisible.value = true
  const { data } = await getRolesWithUserPermission(userId)
  if (data.code === '000000') {
    allRoles.value = data.data
    form.userId = userId
    form.roleIdList = data.data.filter((r) => r.hasPermission).map((r) => r.id)
  } else {
    ElMessage.error('获取角色失败')
    throw new Error('获取角色失败')
  }
}
defineExpose({
  initAndShow
})
const onSubmit = async () => {
  const { data } = await allocateUserRoles(form.userId!, form.roleIdList)
  if (data.code === '000000') {
    ElMessage.success('分配角色成功')
    dialogFormVisible.value = false
  } else {
    ElMessage.error('分配角色失败')
    throw new Error('分配角色失败')
  }
}
</script>

<template>
  <el-dialog v-model="dialogFormVisible" title="分配角色" width="500">
    <el-form :model="form">
      <el-form-item label="">
        <el-select v-model="form.roleIdList" placeholder="请选择角色" multiple>
          <el-option
            v-for="item in allRoles"
            :key="item.id"
            :label="item.name"
            :value="item.id"
          ></el-option>
        </el-select>
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
