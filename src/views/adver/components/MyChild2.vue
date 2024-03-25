<script setup lang="ts">
import { useVModel } from '@vueuse/core'
const props = defineProps<{
  modelValue: number
}>()
const emits = defineEmits<{
  (e: 'update:modelValue', value: number): void
}>()
const myData_local = useVModel(props, 'modelValue', emits)
</script>

<template>
  <div>
    <h2>{{ modelValue }}</h2>
    <el-button @click="myData_local++">点击我</el-button>
  </div>
</template>

<style lang="scss" scoped></style>
