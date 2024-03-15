<script setup lang="ts">
import '@wangeditor/editor/dist/css/style.css' // 引入 css
import { onBeforeUnmount, ref, shallowRef, onMounted } from 'vue'
import { Editor, Toolbar } from '@wangeditor/editor-for-vue'

// 声明属性
const props = defineProps({
  modelValue: {
    type: String,
    default: ''
  }
})
// 声明事件消息
const emits = defineEmits<{
  (e: 'update:modelValue', value: string): void
}>()
// 编辑器实例，必须用 shallowRef
const editorRef = shallowRef()

// 内容 HTML
const valueHtml = ref('<p>123124235</p>')
watchEffect(() => {
  valueHtml.value = props.modelValue
})
// 监听内容变化
watch(valueHtml, (newHtml) => {
  emits('update:modelValue', newHtml)
})

// 模拟 ajax 异步获取内容
// onMounted(() => {
//   setTimeout(() => {
//     valueHtml.value = '<p>1</p>'
//   }, 1500)
// })

const toolbarConfig = {}
const editorConfig = {
  placeholder: '请输入内容...',
  MENU_CONF: {
    uploadImage: {
      server: '/boss/course/upload',
      fieldName: 'file',
      customInsert(res: any, insertFn: any) {
        if (res.code === '000000') {
          insertFn(res.data.name)
          console.log('上传成功', res.data.name)
        } else {
          console.error(res.message)
        }
      }
    }
  }
}

// 组件销毁时，也及时销毁编辑器
onBeforeUnmount(() => {
  const editor = editorRef.value
  if (editor == null) return
  editor.destroy()
})

const handleCreated = (editor: any) => {
  editorRef.value = editor // 记录 editor 实例，重要！
}
</script>

<template>
  <div style="border: 1px solid #ccc">
    <Toolbar
      style="border-bottom: 1px solid #ccc"
      :editor="editorRef"
      :defaultConfig="toolbarConfig"
    />
    <Editor
      style="height: 500px; overflow-y: hidden"
      v-model="valueHtml"
      :defaultConfig="editorConfig"
      @onCreated="handleCreated"
    />
  </div>
</template>
