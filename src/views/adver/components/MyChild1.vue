<script setup lang="ts">
import { useVModel } from '@vueuse/core'
const props = defineProps<{
  myData: number
}>()
const emits = defineEmits<{
  (e: 'update:myData', value: number): void
}>()
const myData_local = useVModel(props, 'myData', emits)
</script>

<template>
  <div>
    <h2>{{ myData }}</h2>
    <el-button @click="myData_local += 10">点击我</el-button>
  </div>
</template>

<style lang="scss" scoped></style>
