<script setup lang="ts">
import { useTokenStore } from '@/stores/mytoken'
import { isCollapse } from './isCollapse'
import { getInfo, logout } from '@/api/users'

const router = useRouter()
const userInfo = ref({
  portrait: '',
  userName: ''
})
getInfo().then((res) => {
  userInfo.value = res.data.content
})
const handleLogout = async () => {
  await ElMessageBox.confirm('确认退出吗？', '提示', {
    confirmButtonText: '确定',
    cancelButtonText: '取消',
    type: 'warning'
  }).catch(() => {
    ElMessage({
      type: 'info',
      message: '已取消退出操作'
    })
    return new Promise(() => {})
  })
  await logout().catch(() => {})
  ElMessage.success('退出成功')
  useTokenStore().saveToken('')
  router.push({
    name: 'login'
  })
}
</script>

<template>
  <el-header class="flex justify-between items-center bg-#d1edc4">
    <div class="flex justify-between items-center">
      <el-icon class="mr-2 cursor-pointer" @click="isCollapse = !isCollapse">
        <IEpExpand v-show="isCollapse" />
        <IEpFold v-show="!isCollapse" />
      </el-icon>
      <!-- 面包屑 -->
      <el-breadcrumb separator="/">
        <el-breadcrumb-item
          v-for="(items, index) in $route.matched"
          :key="index"
          :to="{ path: items.path }"
          >{{ items.meta.title }}</el-breadcrumb-item
        >
      </el-breadcrumb>
    </div>
    <!-- 下拉菜单 -->
    <div>
      <el-dropdown>
        <span class="flex justify-center items-center">
          <el-avatar :size="32" :src="userInfo.portrait" />
          <el-icon class="el-icon-arrow-down ml-2">
            <IEpArrowDown />
          </el-icon>
        </span>
        <template #dropdown>
          <el-dropdown-menu>
            <el-dropdown-item>{{ userInfo.userName }}</el-dropdown-item>
            <el-dropdown-item @click="handleLogout">退出</el-dropdown-item>
          </el-dropdown-menu>
        </template>
      </el-dropdown>
    </div>
  </el-header>
</template>

<style lang="scss" scoped>
.example-showcase .el-dropdown-link {
  cursor: pointer;
  color: var(--el-color-primary);
  display: flex;
  align-items: center;
}
</style>
