<script setup lang="ts">
import type { UploadProgressEvent, UploadProps } from 'element-plus'
import { Plus } from '@element-plus/icons-vue'

// 声明属性
const props = defineProps({
  modelValue: {
    type: String,
    default: ''
  }
})
const emits = defineEmits<{
  (e: 'updata:modelValue', value: string): void
}>()
const imageUrl = ref('')
watchEffect(() => {
  imageUrl.value = props.modelValue
})
const isShowProgress = ref(false)

const handleAvatarSuccess: UploadProps['onSuccess'] = (response, uploadFile) => {
  imageUrl.value = URL.createObjectURL(uploadFile.raw!)
  // course.value.courseListImg = response.dasta.name
  emits('updata:modelValue', response.data.name)
}

const beforeAvatarUpload: UploadProps['beforeUpload'] = (rawFile) => {
  isShowProgress.value = true
  if (rawFile.type !== 'image/jpeg') {
    ElMessage.error('Avatar picture must be JPG format!')
    return false
  } else if (rawFile.size / 1024 / 1024 > 2) {
    ElMessage.error('Avatar picture size can not exceed 2MB!')
    return false
  }
  return true
}
const percentage = ref(0)
const handleProgress = (evt: UploadProgressEvent) => {
  percentage.value = Math.floor(evt.percent)
}
</script>

<template>
  <el-progress type="circle" v-show="isShowProgress" :percentage="percentage" :width="178" />
  <el-upload
    v-show="!isShowProgress"
    class="avatar-uploader"
    action="/boss/course/upload"
    :show-file-list="false"
    :on-success="handleAvatarSuccess"
    :before-upload="beforeAvatarUpload"
    :on-progress="handleProgress"
  >
    <img v-if="imageUrl" :src="imageUrl" class="avatar" @load="isShowProgress = false" />
    <el-icon v-else class="avatar-uploader-icon"><Plus /></el-icon>
  </el-upload>
</template>
<style scoped>
.avatar-uploader .avatar {
  width: 178px;
  height: 178px;
  display: block;
}
</style>
<style>
.avatar-uploader .el-upload {
  border: 1px dashed var(--el-border-color);
  border-radius: 6px;
  cursor: pointer;
  position: relative;
  overflow: hidden;
  transition: var(--el-transition-duration-fast);
}

.avatar-uploader .el-upload:hover {
  border-color: var(--el-color-primary);
}

.el-icon.avatar-uploader-icon {
  font-size: 28px;
  color: #8c939d;
  width: 178px;
  height: 178px;
  text-align: center;
}
</style>
