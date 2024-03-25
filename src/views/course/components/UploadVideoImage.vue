<script setup lang="ts">
import type { UploadRequestHandler, UploadRequestOptions } from 'element-plus'
import {
  getAliOssImagePolicy,
  getAliOssPolicy,
  transcodeVideo,
  getTranscodePercent
} from '@/api/aliOss'

const dialogVisible = ref(false)
const lessonId = ref(0)
const showAndInit = (node: any, data: any) => {
  dialogVisible.value = true
  lessonId.value = data?.id || 0
}

defineExpose({
  showAndInit
})
// 设置tips
const uploadVideo = ref({
  accept: 'video/*',
  tip: '只支持mp4'
})
const uploadImage = ref({
  accept: 'image/*',
  tip: '只支持jpe,png,gif 格式'
})
const uploadPercent = ref(0)
const transPercent = ref(0)
// 获取实例
const initUploader = () => {
  return new AliyunUpload.Vod({
    // userID，必填，您可以使用阿里云账号访问账号中心（https://account.console.aliyun.com/），即可查看账号ID
    userId: '122',
    // 上传到视频点播的地域，默认值为'cn-shanghai'，
    //eu-central-1，ap-southeast-1
    region: '',
    // 分片大小默认1 MB，不能小于100 KB（100*1024）
    partSize: 1048576,
    // 并行上传分片个数，默认5
    parallel: 5,
    // 网络原因失败时，重新上传次数，默认为3
    retryCount: 3,
    // 网络原因失败时，重新上传间隔时间，默认为2秒
    retryDuration: 2,
    // 开始上传
    onUploadstarted: function (uploadInfo: any) {},
    // 文件上传成功
    onUploadSucceed: function (uploadInfo: any) {},
    // 文件上传失败
    onUploadFailed: function (uploadInfo: any, code: any, message: any) {},
    // 文件上传进度，单位：字节
    onUploadProgress: function (uploadInfo: any, totalSize: any, loadedPercent: any) {},
    // 上传凭证或STS token超时
    onUploadTokenExpired: function (uploadInfo: any) {},
    // 全部文件上传结束
    onUploadEnd: function (uploadInfo: any) {}
  })
}
// 上传图片
const imageUrl = ref('')
const handleUploadImage: UploadRequestHandler = (option: UploadRequestOptions): any => {
  uploadImage.value.tip = option.file.name
  // 获取一个上传实例
  const uploader = initUploader()
  // 添加上传文件
  uploader.addFile(option.file)
  // 获取并配置上传凭证
  uploader.options.onUploadstarted = async (uploadInfo: any) => {
    const { data } = await getAliOssImagePolicy()
    if (data.code === '000000') {
      const { uploadAuth, uploadAddress, imageId, imageURL } = data.data
      try {
        uploader.setUploadAuthAndAddress(uploadInfo, uploadAuth, uploadAddress, imageId)
      } catch (error) {
        console.log('上传凭证配置失败', error)
      }
      imageUrl.value = imageURL
    } else {
      ElMessage.error('获取上传凭证失败')
      throw new Error('获取上传凭证失败')
    }
  }
}
// 上传视频
const videoFile = ref()
const handeleBeforeVideoUpload = (file: any) => {
  videoFile.value = file
  uploadVideo.value.tip = file.name
  return false
}
// 开始上传
const videoFileId = ref()
const handleUploadVideo = () => {
  // 获取一个上传实例
  const uploader = initUploader()
  // 添加上传文件
  uploader.addFile(videoFile.value)
  // 获取并配置上传凭证
  uploader.options.onUploadstarted = async (uploadInfo: any) => {
    const { data } = await getAliOssPolicy(videoFile.value.name, imageUrl.value)
    if (data.code === '000000') {
      const { uploadAuth, uploadAddress, videoId } = data.data
      try {
        uploader.setUploadAuthAndAddress(uploadInfo, uploadAuth, uploadAddress, videoId)
        videoFile.value = videoId
      } catch (error) {
        console.log('上传凭证配置失败', error)
      }
      // 模拟
      let n = 0
      const hTimer = setInterval(() => {
        uploadPercent.value = ++n
        if (n === 100) {
          clearInterval(hTimer)
          uploader.options.onUploadEnd()
        }
      }, 50)
      videoFileId.value = videoId
    } else {
      ElMessage.error('获取上传凭证失败')
      throw new Error('获取上传凭证失败')
    }
  }
  // 获取上传进度
  uploader.options.onUploadProgress = (uploadInfo: any, totalSize: number, percent: number) => {
    uploadPercent.value = Math.round(percent * 100)
  }
  // 视频转码
  uploader.options.onUploadEnd = async (uploadInfo: any) => {
    const { data } = await transcodeVideo({
      lessonId: lessonId.value,
      coverImageUrl: imageUrl.value,
      fileId: videoFileId.value,
      fileName: videoFile.value.name
    })
    if (data.code === '000000') {
      const hTimer = setInterval(() => {
        getTranscodePercent(lessonId.value).then((res) => {
          if (res.data.code === '000000') {
            transPercent.value = res.data.data
          }
          if (res.data.data === 100) {
            clearInterval(hTimer)
            ElMessage.success('上传成功')
            dialogVisible.value = false
          }
        })
      }, 500)
    } else {
      ElMessage.error('获取上传凭证失败')
      throw new Error('获取上传凭证失败')
    }
  }
  uploader.startUpload()
}
</script>

<template>
  <el-dialog v-model="dialogVisible" title="上传视频"
    ><div>
      <el-upload
        class="upload-demo"
        action="#"
        accept="video/*"
        :before-upload="handeleBeforeVideoUpload"
        :show-file-list="false"
      >
        <el-button type="primary" plain>选择视频</el-button>
        <template #tip>
          <div class="el-upload__tip my-2">{{ uploadVideo.tip }}</div>
        </template>
      </el-upload>
      <el-upload
        class="upload-demo"
        action="#"
        accept="image/*"
        :http-request="handleUploadImage"
        :show-file-list="false"
      >
        <el-button type="primary" plain>选择封面</el-button>
        <template #tip>
          <div class="el-upload__tip">{{ uploadImage.tip }}</div>
        </template>
      </el-upload>
      <el-button type="primary" class="my-4" @click="handleUploadVideo">开始上传</el-button>
      <!-- 两个进度 -->
      <h4>视频上传进度:{{ uploadPercent }}%</h4>
      <!-- <el-progress :percentage="0" status="success" :text-inside="true" class="my-2" /> -->
      <h4>视频转码进度:{{ transPercent }}%</h4>
      <!-- <el-progress :percentage="0" status="success" :text-inside="true" class="my-2" /> -->
    </div>
  </el-dialog>
</template>

<style lang="scss" scoped></style>
