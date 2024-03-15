<script setup lang="ts">
import { getRoleOwnMenus, allocateRoleResources } from '@/api/roles'
import AllocCategory from './AllocCategory.vue'
import { useRouter } from 'vue-router'
import type { RoleCategoryItem, RoleResourceItem } from '@/api/roles'
import { th } from 'element-plus/es/locale/index.mjs'

const router = useRouter()
const props = defineProps({
  roleId: {
    type: String,
    required: true
  }
})
// 存储数据
const roleResources = ref<RoleCategoryItem[]>([])
// 获取数据
const getRoleOwnMenusData = async () => {
  const { data } = await getRoleOwnMenus(props.roleId)
  roleResources.value = data.data
  if (data.code === '000000') {
    roleResources.value = data.data.sort((c1, c2) => c1.id - c2.id)
  } else {
    ElMessage.error('获取数据失败' + data.mesg)
    throw new Error('获取数据失败' + data.mesg)
  }
}
getRoleOwnMenusData()
// 保存
const onSave = async () => {
  // 选中所有的资源id
  const allCheckedIds = collectCheckedIds.reduce((prev: number[], cur) => {
    return [...prev, ...cur.value]
  }, [])
  const { data } = await allocateRoleResources(props.roleId, allCheckedIds)
  if (data.code === '000000') {
    ElMessage.success('更新角色成功')
    router.push('/roles')
  } else {
    ElMessage.error('更新角色资源失败' + data.mesg)
    throw new Error('更新角色资源失败' + data.mesg)
  }
}
// 清空
const onClear = () => {
  collectCheckedIds.forEach((item) => {
    item.value = []
  })
}
const collectCheckedIds = [] as Ref<number[]>[]
const handleAddCheckedIds = (payload: Ref<number[]>) => {
  collectCheckedIds.push(payload)
}
</script>

<template>
  <AllocCategory
    v-for="category in roleResources"
    :key="category.id"
    :category="category"
    @postCheckedIdsRef="handleAddCheckedIds"
  />
  <div>
    <el-button type="primary" class="mr4" @click="onSave">保存</el-button>
    <el-button @click="onClear">清空</el-button>
  </div>
</template>

<style lang="scss" scoped></style>
