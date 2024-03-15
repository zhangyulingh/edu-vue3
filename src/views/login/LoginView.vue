<script setup lang="ts">
import type { FormInstance, FormRules } from 'element-plus'
import { login } from '@/api/users'
import { useTokenStore } from '@/stores/mytoken'

const store = useTokenStore()
const router = useRouter()
const route = useRoute()

const form = reactive({
  phone: '18201288771',
  password: '111111'
})
const onSubmit = async () => {
  isLogin.value = true
  await formref.value?.validate().catch((err) => {
    ElMessage.error('请检查输入')
    isLogin.value = false
    throw err
  })
  const data = await login(form).then((res) => {
    if (!res.data.success) {
      ElMessage.error('登录信息有误!')
      throw new Error('登录信息有误!')
    }
    return res.data
  })
  store.saveToken(data.content)
  isLogin.value = false
  ElMessage.success('登录成功!')
  router.push((route.query.redirect as string) || '/')
}
const rules = reactive<FormRules>({
  phone: [
    { required: true, message: '请输入手机号', trigger: 'blur' },
    { pattern: /^1\d{10}$/, message: '请输入正确的手机号', trigger: 'blur' }
  ],
  password: [
    { required: true, message: '请输入密码', trigger: 'blur' },
    { min: 6, max: 20, message: '密码长度为6-20位', trigger: 'blur' }
  ]
})
const formref = ref<FormInstance | null>(null)
const isLogin = ref(false)
</script>

<template>
  <div class="flex w-full h-100vh bg-#eee justify-center items-center">
    <div class="w-300px bg-white p-4 rd-2">
      <h2 class="my-2">登录</h2>
      <el-form :model="form" :rules="rules" ref="formref" label-position="top" size="large">
        <el-form-item label="手机号" prop="phone">
          <el-input v-model="form.phone" />
        </el-form-item>
        <el-form-item label="密码" prop="password">
          <el-input v-model="form.password" />
        </el-form-item>
        <el-form-item>
          <el-button type="primary" class="w-full" :loading="isLogin" @click="onSubmit()"
            >登录</el-button
          >
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>

<style lang="scss" scoped></style>
