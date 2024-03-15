<script setup lang="ts">
import { timeFormatter } from '@/utils/timeHandle'
import { enableUser, forbidUser } from '@/api/users'
import DlgAllocRoles from './components/DlgAllocRoles.vue'
import { queryCondition, queriedResult, queryUsers } from '@/composables/useUsers'
queryUsers()
const dlgAllocRoles = ref<InstanceType<typeof DlgAllocRoles> | null>(null)
// 默认头像
const circleUrl = 'https://cube.elemecdn.com/3/7c/3ea6beec64369c2642b92c6726f1epng.png'
// 修改用户状态
const changeStatus = async (act: 'ENABLE' | 'DISENABLE', userId: number) => {
  let actions = {
    ENABLE: { msg: '启用', fn: enableUser },
    DISENABLE: { msg: '禁用', fn: forbidUser }
  }
  const { data } = await actions[act].fn(userId)
  if (data.code === '00000') {
    ElMessage.success(`${actions[act].msg}成功`)
  } else {
    ElMessage.error(`${actions[act].msg}失败`)
    throw new Error(`${actions[act].msg}失败`)
  }
}
// 时间选取器
const timeRange = ref()
watch(timeRange, (newVal) => {
  queryCondition.value.startCreateTime = newVal ? newVal[0] : ''
  queryCondition.value.endCreateTime = newVal ? newVal[1] : ''
})
</script>

<template>
  <div>
    <el-card class="mr-4">
      <template #header>
        <div class="card-header">
          <el-form :inline="true" :model="queryCondition" class="demo-form-inline">
            <el-form-item label="手机号">
              <el-input v-model="queryCondition.phone" placeholder="手机号" clearable />
            </el-form-item>
            <el-form-item label="注册时间">
              <el-date-picker
                v-model="timeRange"
                type="datetimerange"
                range-separator="至"
                start-placeholder="开始日期"
                end-placeholder="结束日期"
                value-format="yyyy-MM-dd HH:mm:ss"
                clearable
              />
            </el-form-item>
            <el-form-item>
              <el-button
                type="primary"
                @click="
                  queryUsers({
                    currentPage: 1
                  })
                "
                >查询</el-button
              >
            </el-form-item>
          </el-form>
        </div>
      </template>
      <el-table :data="queriedResult.records" border style="width: 100%">
        <el-table-column prop="id" label="用户ID" />
        <el-table-column prop="portrait" label="头像">
          <template #default="{ row }">
            <ElAvatar :size="50" :src="row.portrait" fit="cover"><img :src="circleUrl" /></ElAvatar>
          </template>
        </el-table-column>
        <el-table-column prop="name" label="用户名" />
        <el-table-column prop="phone" label="手机号" />
        <el-table-column prop="createTime" label="注册时间" :formatter="timeFormatter" />
        <el-table-column prop="status" label="状态">
          <template #default="{ row }">
            <ElSwitch
              v-model="row.status"
              class="mb2"
              active-text="启用"
              inactive-text="禁用"
              active-value="ENABLE"
              inactive-value="DISABLE"
              @change="changeStatus($event as 'ENABLE' | 'DISENABLE', row.id)"
            />
          </template>
        </el-table-column>
        <el-table-column label="操作" #default="{ row }">
          <el-button type="default" @click="dlgAllocRoles?.initAndShow(row.id)">分配角色</el-button>
        </el-table-column>
      </el-table>
      <div class="flex justify-center mt-4">
        <el-pagination
          v-model:current-page="queriedResult.current"
          v-model:page-size="queriedResult.size"
          :page-sizes="[5, 10, 20, 30]"
          background
          layout="total, sizes, prev, pager, next, jumper"
          :total="queriedResult.total || 0"
          @size-change="(pageSize) => queryUsers({ pageSize, currentPage: 1 })"
          @current-change="(currentPage) => queryUsers({ currentPage })"
        />
      </div>
      <DlgAllocRoles ref="dlgAllocRoles" />
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
.box-card {
  width: auto;
}
</style>
