<script setup lang="ts">
import { useMenus } from '@/composables/useMenus'
const { getAllMenus, topMenus, form, onSubmit, getMenuInfoById, msgText } = useMenus()
getAllMenus()

const route = useRoute()
getMenuInfoById(route.params.id as string)
</script>

<template>
  <div class="pr-4">
    <el-form :model="form" label-width="120px" size="large">
      <el-form-item label="菜单名称" prop="name">
        <el-input v-model="form.name" />
      </el-form-item>
      <el-form-item label="菜单路径" prop="href">
        <el-input v-model="form.href" />
      </el-form-item>
      <el-form-item label="上级菜单" prop="parentId">
        <el-select v-model="form.parentId" placeholder="">
          <el-option label="顶层菜单" :value="-1" />
          <el-option v-for="menu in topMenus" :key="menu.id" :label="menu.name" :value="menu.id" />
        </el-select>
      </el-form-item>
      <el-form-item label="描述" prop="description">
        <el-input v-model="form.description" />
      </el-form-item>
      <el-form-item label="图标名称" prop="icon">
        <el-input v-model="form.icon" />
      </el-form-item>
      <el-form-item label="是否显示" prop="shown">
        <el-radio-group v-model="form.shown">
          <el-radio :label="true">显示</el-radio>
          <el-radio :label="false">隐藏</el-radio>
        </el-radio-group>
      </el-form-item>
      <el-form-item label="排序" prop="orderNum">
        <el-input v-model="form.orderNum" />
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="onSubmit">立即{{ msgText }}</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>
