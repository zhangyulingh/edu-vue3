<script setup lang="ts">
import SectionCreateOrEdit from './SectionCreateOrEdit.vue'
import SectionStatusChange from './SectionStatusChange.vue'
import LessonDlgCreatOredit from './LessonDlgCreatOredit.vue'
import LessonStatusChange from './LessonStatusChange.vue'
import UploadVideoImage from './UploadVideoImage.vue'
import { Plus } from '@element-plus/icons-vue'
import { course, courseSAL, loadSAL } from '@/composables/useCourseContent'
import type Node from 'element-plus/es/components/tree/src/model/node.mjs'
import type { AllowDropType } from 'element-plus/es/components/tree/src/tree.type.mjs'
import { saveOrUpdateLesson, saveOrUpdateSection } from '@/api/course'

const props = defineProps({
  courseId: {
    type: String,
    required: true
  }
})
loadSAL(props.courseId)
const handleNodeClick = (data: any, node: any) => {
  console.log(data, node)
}

const defaultProps = {
  children: 'lessonDTOS',
  label: (data: any) => data.sectionName || data.theme
}
//  章节状态提示文字
const sectionStatus = ['隐藏', '待更新', '已发布']
//  课时状态提示文字
const lessonStatus = ['隐藏', '未发布', '已发布']
const sectionDlg = ref<InstanceType<typeof SectionCreateOrEdit>>()
const sectionStatusDlg = ref<InstanceType<typeof SectionStatusChange>>()
const lessonDlg = ref<InstanceType<typeof LessonDlgCreatOredit>>()
const lessonStatusDlg = ref<InstanceType<typeof LessonStatusChange>>()
const uploadVideoImageDlg = ref<InstanceType<typeof UploadVideoImage>>()

const handlAllowDrop = (draggingNode: Node, dropNode: Node, type: AllowDropType) => {
  return type !== 'inner' && draggingNode.parent === dropNode.parent
}
const onNodeDrop = (draggingNode: Node, dropNode: Node) => {
  const orderFn = dropNode.level === 1 ? saveOrUpdateSection : saveOrUpdateLesson
  const changePromiseArr = dropNode.parent.childNodes.map((node: Node, index) => {
    return orderFn({ id: node.data.id, orderNum: index + 1 })
  })
  Promise.all(changePromiseArr)
    .then((resArr) => {
      // ElMessage.success('排序成功')
      const result = resArr.every((res) => res.data.code === '000000')
      if (result) {
        ElMessage.success('排序成功')
      } else {
        throw 1
      }
    })
    .catch(() => {
      ElMessage.error('排序失败')
      throw new Error('排序失败')
    })
}
</script>

<template>
  <el-page-header @back="$router.go(-1)" class="mb-4">
    <template #content>
      <div class="flex items-center">
        <span class="text-large font-600 mr-3"> {{ course.courseName }} </span>
      </div>
    </template>
    <template #extra>
      <div class="flex items-center">
        <el-button
          :icon="Plus"
          type="primary"
          class="mr4"
          @click="sectionDlg?.showAndInit(course, undefined)"
          >添加章节</el-button
        >
      </div>
    </template>
  </el-page-header>
  <el-card class="mr4">
    <el-tree
      :data="courseSAL"
      draggable
      :allow-drop="handlAllowDrop"
      :props="defaultProps"
      @node-click="handleNodeClick"
      @node-drop="onNodeDrop"
    >
      <template #default="{ node, data }">
        <span class="custom-tree-node">
          <span>{{ node.label }}</span>
          <span v-if="node.level === 1">
            <el-link type="primary" @click.stop="sectionDlg?.showAndInit(course, data.id)"
              >编辑</el-link
            >
            <el-button
              type="primary"
              class="mx4"
              @click.stop="lessonDlg?.showAndInit(node, data, course)"
              >添加课时</el-button
            >
            <el-link
              type="primary"
              class="w-18"
              @click.stop="sectionStatusDlg?.showAndInit(course, data)"
              >{{ sectionStatus[data.status] }}</el-link
            >
          </span>
          <span v-else-if="node.level === 2">
            <el-link type="primary" @click.stop="lessonDlg?.showAndInit(node, data, course)"
              >编辑</el-link
            >
            <el-button
              type="success"
              class="mx4"
              @click.stop="uploadVideoImageDlg?.showAndInit(node, data)"
              >上传视频</el-button
            >
            <el-link
              type="primary"
              class="w-18"
              @click="lessonStatusDlg?.showAndInit(node, course, data)"
              >{{ lessonStatus[data.status] }}</el-link
            >
          </span>
        </span>
      </template></el-tree
    ></el-card
  >
  <SectionCreateOrEdit ref="sectionDlg" @sectionRefresh="loadSAL(props.courseId)" />
  <SectionStatusChange ref="sectionStatusDlg" @statusChange="loadSAL(props.courseId)" />
  <LessonDlgCreatOredit ref="lessonDlg" @lessonChange="loadSAL(props.courseId)" />
  <LessonStatusChange ref="lessonStatusDlg" @lessonStatusChange="loadSAL(props.courseId)" />
  <UploadVideoImage ref="uploadVideoImageDlg" />
</template>
<style lang="scss" scoped>
.el-page-header {
  margin-bottom: 17px;
}
:deep(.el-tree-node) {
  padding: 15px 0px;
  border-bottom: 1px solid rgba(0, 0, 0, 0.05);
  font-size: 18px;
}
</style>
<style>
.el-tree-node__content {
  padding: 15px 0px;
  border-bottom: 1px solid rgba(0， 0，0，0.05);
  font-size: 18px;
}
.custom-tree-node {
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: space-between;
  font-size: 14px;
  padding-right: 8px;
}
</style>
./LessonStatusChange.vue
