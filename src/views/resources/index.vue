<script setup lang="ts">
import { queryCondition, queriedResult, queryResources } from '@/composables/useResources'
import { allResources, getAllResources } from '@/composables/useResourcesCategory'
import { timeFormatter } from '@/utils/timeHandle'
import { deleteResource } from '@/api/resources'
import { useRouter } from 'vue-router'
import DlgCreateOrEditVue from '@/views/resources/components/DlgCreateOrEdit.vue'
import type { FormInstance } from 'element-plus/lib/components/form/index.js'

const router = useRouter()
queryResources()
getAllResources()
const queryRef = ref<FormInstance>()
const dlgCreateOrEdit = ref<InstanceType<typeof DlgCreateOrEditVue> | null>()
const handleDelete = async (id: number) => {
  await ElMessageBox.confirm('此操作将永久删除该资源, 是否继续?', '提示', {
    confirmButtonText: '确定',
    cancelButtonText: '取消',
    type: 'warning'
  }).catch(() => {
    ElMessage.info('已取消删除')
    return new Promise(() => {})
  })
  const { data } = await deleteResource(id)
  if (data.code === '000000') {
    ElMessage.success('删除成功')
    queryResources({ current: 1 })
  } else {
    ElMessage.error('删除失败')
    throw new Error('删除失败')
  }
}
</script>

<template>
  <div>
    <el-card class="box-card">
      <template #header>
        <el-form :inline="true" :model="queryCondition" ref="queryRef" class="demo-form-inline">
          <el-form-item label="资源名称" prop="name">
            <el-input v-model="queryCondition.name" placeholder="资源名称" clearable />
          </el-form-item>
          <el-form-item label="资源路径" prop="url">
            <el-input v-model="queryCondition.url" placeholder="资源路径" clearable />
          </el-form-item>
          <el-form-item label="资源分类" prop="categoryId" class="w-200px">
            <el-select v-model="queryCondition.categoryId" placeholder="资源分类" clearable>
              <ElOption label="不限" value="" />
              <ElOption
                v-for="item in allResources"
                :key="item.id"
                :label="item.name"
                :value="item.id"
              ></ElOption>
            </el-select>
          </el-form-item>
          <el-form-item>
            <el-button @click="queryRef?.resetFields()">重置</el-button>
            <el-button type="primary" @click="queryResources()">搜索查询</el-button>
          </el-form-item>
        </el-form>
      </template>
      <div class="my-2">
        <ElButton size="large" @click="dlgCreateOrEdit?.initAndShow(0)">添加</ElButton>
        <ElButton size="large" @click="router.push({ name: 'resourcesCategory' })"
          >资源类别</ElButton
        >
      </div>
      <el-table :data="queriedResult.records" border style="width: 100%">
        <el-table-column type="index" label="序号" />
        <el-table-column prop="name" label="资源名称" />
        <el-table-column prop="url" label="资源路径" />
        <el-table-column prop="description" label="描述" />
        <el-table-column prop="createdTime" label="添加时间" :formatter="timeFormatter" />
        <el-table-column prop="address" label="操作">
          <template #default="{ row }">
            <el-button type="primary" size="small" @click="dlgCreateOrEdit?.initAndShow(row.id)"
              >编辑</el-button
            >
            <el-button type="danger" size="small" @click="handleDelete(row.id)">删除</el-button>
          </template>
        </el-table-column>
      </el-table>
      <el-pagination
        @size-change="
          (size: any) => {
            queryResources({ size, current: 1 })
          }
        "
        @current-change="
          (current: any) => {
            queryResources({ current })
          }
        "
        :current-page="queriedResult.current"
        :page-sizes="[5, 10, 20, 30]"
        :page-size="queriedResult.size"
        layout="total, sizes, prev, pager, next, jumper"
        :total="queriedResult.total"
      />
      <DlgCreateOrEditVue ref="dlgCreateOrEdit" />
    </el-card>
  </div>
</template>

<style lang="scss" scoped>
.card-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.text {
  font-size: 14px;
}

.item {
  margin-bottom: 18px;
}
</style>
