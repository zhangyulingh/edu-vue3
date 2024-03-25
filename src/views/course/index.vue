<script setup lang="ts">
import { queryCondition, queriedResult, queryCourses, changeStatus } from '@/composables/useCourse'
queryCourses()
</script>

<template>
  <el-card>
    <template #header>
      <!-- 查询 -->
      <el-form :inline="true" :model="queryCondition" class="demo-form-inline">
        <el-form-item label="课程名称">
          <el-input v-model="queryCondition.courseName" clearableplaceholder="课程名称" />
        </el-form-item>
        <el-form-item label="状态">
          <el-select v-model="queryCondition.status" placeholder="状态" style="width: 100px">
            <el-option label="全部" value="" />
            <el-option label="上架" :value="1" />
            <el-option label="下架" :value="0" />
          </el-select>
        </el-form-item>
        <el-form-item>
          <el-button
            type="primary"
            @click="
              queryCourses({
                currentPage: 1
              })
            "
            >查询</el-button
          >
        </el-form-item>
      </el-form>
      <el-button type="primary" @click="$router.push({ name: 'course-create' })"
        >新增课程</el-button
      >
    </template>
    <el-table :data="queriedResult.records">
      <el-table-column prop="id" label="ID" width="40" />
      <el-table-column prop="courseName" label="课程名称" />
      <el-table-column prop="price" label="价格" width="100" />
      <el-table-column prop="sortNum" label="排序" width="60" />
      <el-table-column prop="status" label="状态" v-slot="{ row }">
        <ElSwitch
          v-model="row.status"
          active-color="#13ce66"
          inactive-color="#ff4949"
          active-text="上架"
          inactive-text="下架"
          :active-value="1"
          :inactive-value="0"
          @change="changeStatus($event as number, row)"
        />
      </el-table-column>
      <el-table-column label="操作">
        <template #default="{ row }">
          <el-button
            type="primary"
            size="small"
            @click="$router.push({ name: 'course-edit', params: { courseId: row.id } })"
            >编辑</el-button
          >
          <el-button
            type="primary"
            size="small"
            @click="$router.push({ name: 'course-content', params: { courseId: row.id } })"
            >课程管理</el-button
          >
        </template>
      </el-table-column>
    </el-table>
    <!-- 分页 -->
    <el-pagination
      class="mt4"
      :current-page="queriedResult.current"
      :page-sizes="[10, 20, 30, 40]"
      :page-size="queriedResult.size"
      background
      layout="total, sizes, prev, pager, next, jumper"
      :total="queriedResult.total || 0"
      @size-change="(pageSize: any) => queryCourses({ pageSize, currentPage: 1 })"
      @current-change="(currentPage: any) => queryCourses({ currentPage })"
    />
  </el-card>
</template>

<style lang="scss" scoped>
.el-form-item {
  margin-bottom: 0px;
}
</style>
