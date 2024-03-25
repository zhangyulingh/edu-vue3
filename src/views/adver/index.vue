<script setup lang="ts">
import { ref } from 'vue'
import MyChild1 from './components/MyChild1.vue'
import MyChild2 from './components/MyChild2.vue'
const myData = ref(123)
</script>

<template>
  <div>
    <h2>父组件{{ myData }}</h2>
    <el-button @click="myData++">点击我</el-button>
  </div>
  <MyChild1
    :myData="myData"
    @update:myData="
      (newVal) => {
        myData = newVal
      }
    "
  />
  <MyChild1 v-model:my-data="myData" />
  <MyChild2
    :modelValue="myData"
    @update:modelValue="
      (newVal) => {
        myData = newVal
      }
    "
  />
  <MyChild2 v-model="myData" />
</template>

<style lang="scss" scoped></style>
