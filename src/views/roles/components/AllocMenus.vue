<script setup lang="ts">
import { getRoleMenus, allocateRoleMenus } from '@/api/roles'
import type { RoleMenuItem } from '@/api/roles'
import router from '@/router'
import type { ElTree } from 'element-plus'
const props = defineProps({
  roleId: {
    type: String,
    required: true
  }
})
// 存储数据
const roleMenus = ref<RoleMenuItem[]>([])
// 获取角色菜单
// 默认选中
const checkedIds = ref<number[]>([])
const getCheckedIds = (arrData: RoleMenuItem[]) => {
  arrData.forEach((roleMenu: any) => {
    if (roleMenu.subMenuList && roleMenu.subMenuList.length > 0) {
      getCheckedIds(roleMenu.subMenuList)
    } else if (roleMenu.selected) {
      checkedIds.value.push(roleMenu.id)
    }
  })
}
const getRoleMenusData = async () => {
  const { data } = await getRoleMenus(props.roleId)
  if (data.code === '000000') {
    roleMenus.value = data.data
    getCheckedIds(data.data)
  } else {
    ElMessage.error('获取角色菜单失败' + data.mesg)
    throw new Error('获取角色菜单失败' + data.mesg)
  }
}
getRoleMenusData()
const menuTree = ref<InstanceType<typeof ElTree> | null>(null)
// 保存
const onSave = async () => {
  const currentCheckedIds: number[] | [] = menuTree.value?.getCheckedKeys() as any
  const { data } = await allocateRoleMenus(props.roleId, currentCheckedIds)
  if (data.code === '000000' && data.data === true) {
    ElMessage.success('保存成功')
    router.push({ name: 'roles' })
  } else {
    ElMessage.error('保存失败' + data.mesg)
    throw new Error('保存失败' + data.mesg)
  }
}
// 清空
const onClear = () => {
  menuTree.value?.setCheckedKeys([])
}
</script>

<template>
  <ElCard>
    <el-tree
      ref="menuTree"
      :data="roleMenus"
      :props="{ label: 'name', children: 'subMenuList' }"
      show-checkbox
      node-key="id"
      :default-checked-keys="checkedIds"
    />
    <div class="my-4">
      <ElButton type="primary" @click="onSave">保存</ElButton>
      <ElButton @click="onClear">清空</ElButton>
    </div>
  </ElCard>
</template>
