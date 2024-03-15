<script setup lang="ts">
import router from '@/router'
import { useMenus } from '@/composables/useMenus'
const { allMenus, getAllMenus, handleDelete } = useMenus()
getAllMenus()
</script>

<template>
  <el-card class="w-full mr4">
    <template #header>
      <div class="flex justify-between items-center">
        <el-button type="primary" @click="router.push({ name: 'menu-create' })">添加菜单</el-button>
      </div>
    </template>
    <el-table :data="allMenus" style="width: 100%">
      <el-table-column type="index" label="编号" width="100" />
      <el-table-column prop="name" label="菜单名称" />
      <el-table-column prop="level" label="菜单层级" />
      <el-table-column prop="icon" label="菜单图标" />
      <el-table-column prop="orderNum" label="排序" />
      <el-table-column prop="address" label="操作" v-slot="scope">
        <el-button
          type=""
          size="small"
          @click="router.push({ name: 'menu-edit', params: { id: scope.row.id } })"
          >编辑</el-button
        >
        <el-button type="danger" size="small" @click="handleDelete(scope.row.id)">删除</el-button>
      </el-table-column>
    </el-table>
  </el-card>
</template>

<style lang="scss" scoped></style>
