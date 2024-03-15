<script setup lang="ts">
import type { CheckboxValueType } from 'element-plus'
import type { RoleCategoryItem } from '@/api/roles'

// 接收数据
const props = defineProps<{
  category: RoleCategoryItem
}>()
// 声明触发事件
const emit = defineEmits<{
  (e: 'postCheckedIdsRef', payload: Ref<number[]>): void
}>()
// 初始化数据
const checkAll = ref(props.category.selected)
const checkedIds = ref([] as number[])
const allItemIds = [] as number[]
const isIndeterminate = ref(
  checkedIds.value.length > 0 && checkedIds.value.length < allItemIds.length
)

const handleCheckAllChange = (val: CheckboxValueType) => {
  checkedIds.value = val ? allItemIds : []
  isIndeterminate.value = false
}
// 遍历category的子元素，填充allItemIds checkedIds
props.category.resourceList?.forEach((item) => {
  allItemIds.push(item.id)
  // 如果item.selected为true，将item.id添加到checkedIds
  item.selected && checkedIds.value.push(item.id)
})
emit('postCheckedIdsRef', checkedIds)
watchEffect(() => {
  checkAll.value = checkedIds.value.length === allItemIds.length
  isIndeterminate.value = checkedIds.value.length > 0 && checkedIds.value.length < allItemIds.length
})

const handleCheckedCitiesChange = (checkedItems: CheckboxValueType[]) => {
  const checkedCount = checkedItems.length
  checkAll.value = checkedCount === allItemIds.length
  isIndeterminate.value = checkedCount > 0 && checkedCount < allItemIds.length
}
</script>

<template>
  <el-card class="box-card mb4">
    <template #header>
      <div class="card-header">
        <el-checkbox
          v-model="checkAll"
          :indeterminate="isIndeterminate"
          @change="handleCheckAllChange"
          >{{ props.category.name }}</el-checkbox
        >
      </div>
    </template>
    <el-checkbox-group
      v-model="checkedIds"
      @change="handleCheckedCitiesChange"
      class="grid grid-cols-4 gap-4"
    >
      <div v-for="resource in category.resourceList" :key="resource.id">
        <el-checkbox :label="resource.id">{{ resource.name }}</el-checkbox>
      </div>
    </el-checkbox-group>
  </el-card>
</template>

<style lang="scss" scoped></style>
