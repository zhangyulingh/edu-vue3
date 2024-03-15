<script setup lang="ts">
import { timeFormatter } from '@/utils/timeHandle'
import { queryCondition, queriedResult, queryRoles } from '@/composables/useRoles'
import DlgCreatOrEdit from './components/DlgCreatOrEdit.vue'
import { deleteRole } from '@/api/roles'
queryRoles()

const dlgCreatOrEdit = ref<InstanceType<typeof DlgCreatOrEdit> | null>(null)
const handleDelete = async (id: number) => {
  await ElMessageBox.confirm('此操作将永久删除该角色, 是否继续?', '提示', {
    confirmButtonText: '确定',
    cancelButtonText: '取消',
    type: 'warning'
  }).catch(() => {
    ElMessage.success('已取消删除')
    return new Promise(() => {})
  })
  const { data } = await deleteRole(id)
  if (data.code === '000000') {
    ElMessage.success('删除成功')
    queryRoles({ current: 1 })
  } else {
    ElMessage.error('删除失败' + data.mesg)
    throw new Error('删除失败' + data.mesg)
  }
}
</script>

<template>
  <el-card class="box-card">
    <template #header>
      <div class="flex justify-between">
        <div @click="dlgCreatOrEdit?.initAndShow()"><ElButton>新建角色</ElButton></div>
        <div>
          <el-form :inline="true" :model="queryCondition">
            <el-form-item label="输入搜索">
              <el-input v-model="queryCondition.name" placeholder="输入搜索" clearable />
            </el-form-item>
            <el-form-item>
              <el-button type="" @click="queryCondition.name = ''">重置</el-button>
              <el-button type="primary" @click="queryRoles()">查询</el-button>
            </el-form-item>
          </el-form>
        </div>
      </div>
    </template>
    <el-table :data="queriedResult.records" border style="width: 100%">
      <el-table-column type="index" label="序号" />
      <el-table-column prop="name" label="角色名称" />
      <el-table-column prop="description" label="描述" />
      <el-table-column prop="createdTime" label="添加时间" :formatter="timeFormatter" />
      <el-table-column label="操作" #default="{ row }">
        <el-button
          type="primary"
          link
          @click="$router.push({ name: 'alloc-Menus', params: { roleId: row.id } })"
          >分配菜单</el-button
        >
        <el-button
          type="primary"
          link
          @click="$router.push({ name: 'alloc-resources', params: { roleId: row.id } })"
          >分配资源</el-button
        >
        <el-button type="primary" link @click="dlgCreatOrEdit?.initAndShow(row.id)">编辑</el-button>
        <el-button type="primary" link @click="handleDelete(row.id)">删除</el-button>
      </el-table-column>
    </el-table>
    <div class="mt-4">
      <el-pagination
        v-model:current-page="queryCondition.current"
        v-model:page-size="queryCondition.size"
        :page-sizes="[5, 10, 20, 30]"
        background
        layout="total, sizes, prev, pager, next, jumper"
        :total="queriedResult.total"
        @size-change="(size: number) => queryRoles({ size })"
        @current-change="(current: number) => queryRoles({ current })"
      />
    </div>
    <DlgCreatOrEdit ref="dlgCreatOrEdit" @role-change="queryRoles({ current: 1 })" />
  </el-card>
</template>
