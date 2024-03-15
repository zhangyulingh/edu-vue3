<script setup lang="ts">
import { allResources, getAllResources, handleDelete } from '@/composables/useResourcesCategory'
import { timeFormatter } from '@/utils/timeHandle'
import DlgResource from './components/DlgResource.vue'
getAllResources()

const dlgCreateOrEidt = ref<InstanceType<typeof DlgResource> | null>()
</script>

<template>
  <el-card class="box-card">
    <template #header>
      <div class="card-header">
        <h3>资源类别列表</h3>
        <el-button class="button" type="primary" @click="dlgCreateOrEidt?.initAndShow()"
          >创建类别</el-button
        >
      </div>
    </template>
    <el-table :data="allResources" border style="width: 100%">
      <el-table-column type="index" label="序号" />
      <el-table-column prop="name" label="类别名称" />
      <el-table-column prop="createdTime" :formatter="timeFormatter" label="创建时间" />
      <el-table-column prop="sort" label="排序" />
      <el-table-column prop="address" label="操作">
        <template #default="{ row }">
          <el-button type="primary" size="small" @click="dlgCreateOrEidt?.initAndShow(row.id)"
            >编辑</el-button
          >
          <el-button type="danger" size="small" @click="handleDelete(row.id)">删除</el-button>
        </template>
      </el-table-column>
    </el-table>
  </el-card>
  <DlgResource ref="dlgCreateOrEidt" />
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

.box-card {
  width: 100%;
}
</style>
@/composables/useResourcesCategory
