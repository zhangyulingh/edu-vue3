import request from '@/utils/request'
// 类型
type Common<T> = {
  code: string
  data: T
  mesg: string
  time: string
}
interface VideoAuth {
  requestId: string
  videoId: string
  uploadAddress: string
  uploadAuth: string
}
// 获取凭证
export function getAliOssPolicy(filnName: string, imageUrl: string) {
  return request<Common<VideoAuth>>({
    url: '/boss/course/upload/aliyunVideoUploadAddressAdnAuth.json',
    method: 'get',
    params: {
      filnName,
      imageUrl
    }
  })
}
interface ImageAuth {
  requestId: string
  imageId: string
  imageURL: string
  uploadAddress: string
  uploadAuth: string
  fileURL: string
}

// 上传图片凭证
export function getAliOssImagePolicy() {
  return request<Common<ImageAuth>>({
    url: '/boss/course/upload/aliyunImageUploadAddressAdnAuth.json',
    method: 'get'
  })
}

// 刷新视频上传凭证
export function refreshVideoAuth(videoId: string) {
  return request<Common<VideoAuth>>({
    url: '/boss/course/upload/refreshVideoUploadAddressAdnAuth.json',
    method: 'get',
    params: {
      videoId
    }
  })
}
export interface VideoOpt {
  lessonId: number
  coverImageUrl: string
  fileId: number
  fileName: string
}
// 阿里云转码请求
export function transcodeVideo(opt: VideoOpt) {
  return request<Common<boolean>>({
    url: '/boss/course/upload/aliyunTranscode.json',
    method: 'post',
    data: opt
  })
}
// 转码进度
export function getTranscodePercent(lessonId: number) {
  return request<Common<number>>({
    url: '/boss/course/upload/aliyunTranscodePercent.json',
    method: 'get',
    params: {
      lessonId
    }
  })
}
// 获取媒体信息
export function getMediaInfo(lessonId: number) {
  return request<Common<any>>({
    url: '/boss/course/upload/getMediaInfo.json',
    method: 'get',
    params: {
      lessonId
    }
  })
}
