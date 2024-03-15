<script setup lang="ts">
import { course, courseSAL, loadSAL } from '@/composables/useCourseContent'
const props = defineProps({
  courseId: {
    type: String,
    required: true
  }
})
loadSAL(props.courseId)
console.log(course, courseSAL)
</script>

<template>
  <div>
    <h2>内容id-{{ props.courseId }}</h2>
  </div>
</template>
