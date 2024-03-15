import type { unique } from 'element-plus/es/utils/arrays.js';
<script setup lang="ts">
import { isCollapse } from './isCollapse'
</script>

<template>
  <el-aside width="200px">
    <el-scrollbar>
      <el-menu router unique-opened :collapse="isCollapse">
        <a href="/" class="logo">
          <img src="@/assets/logo.svg" alt="logo" class="logo" />
          <!-- 不换行 -->
          <h1 class="logo whitespace-nowrap">后台管理系统</h1>
        </a>
        <el-sub-menu index="1">
          <template #title>
            <el-icon>
              <IEplock />
            </el-icon>
            <span>权限管理</span>
          </template>
          <el-menu-item index="/menus">
            <el-icon>
              <IEpSetting />
            </el-icon>
            <span>菜单列表</span>
          </el-menu-item>
          <el-menu-item index="/resources">
            <el-icon>
              <IEpSetting />
            </el-icon>
            <span> 资源列表</span>
          </el-menu-item>
          <el-menu-item index="/roles">
            <el-icon>
              <IEpSetting />
            </el-icon>
            <span>角色列表</span>
          </el-menu-item>
        </el-sub-menu>
        <el-menu-item index="/users">
          <el-icon>
            <IEpUser />
          </el-icon>
          <span>用户管理</span>
        </el-menu-item>
        <el-menu-item index="/course">
          <el-icon>
            <IEpFilm />
          </el-icon>
          <span>课程管理</span>
        </el-menu-item>
        <el-sub-menu index="2">
          <template #title>
            <el-icon>
              <IEpSetting />
            </el-icon>
            <span> 广告管理</span>
          </template>
          <el-menu-item index="/adver">
            <el-icon>
              <IEpSetting />
            </el-icon>
            <span>广告列表</span>
          </el-menu-item>
          <el-menu-item index="/adver-space">
            <el-icon>
              <IEpSetting />
            </el-icon>
            <span>广告位管理</span>
          </el-menu-item>
        </el-sub-menu>
      </el-menu>
    </el-scrollbar>
  </el-aside>
</template>

<style lang="scss" scoped>
.el-aside {
  background-color: #e1f3d8;
  height: 100vh;
  width: auto;
}
.el-menu {
  background-color: #e1f3d8;
  border-right: none;
  width: 200px;
  &.el-menu--collapse {
    width: 60px !important;
    & h1 {
      display: none;
    }
  }
}
.logo {
  display: flex;
  align-items: center;
  justify-content: center;
  height: 60px;
  font-size: 20px;
  text-decoration: none;
  color: black;
  img {
    width: 32px;
    height: 32px;
    margin-right: 10px;
  }
}
</style>
