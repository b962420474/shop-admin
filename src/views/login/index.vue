
<template>
  <div class="login-container">
    <el-form
      :model="user"
      status-icon
      :rules="rules"
      ref="form"
      class="login-form"
      @submit.prevent="handleSubmit"
      :disabled="loading"
    >
      <el-form-item prop="account">
        <el-input
          v-model="user.account"
          placeholder="请输入用户名"
          prefix-icon="el-icon-user"
        />
      </el-form-item>
      <el-form-item prop="pwd">
        <el-input
          type="password"
          v-model="user.pwd"
          placeholder="请输入密码"
          prefix-icon="el-icon-lock"
        />
      </el-form-item>
      <el-form-item prop="imgcode">
        <div class="imgcode-wrap">
          <el-input
            v-model="user.imgcode"
            placeholder="请输入验证码"
            prefix-icon="el-icon-key"
          />
          <img
            class="imgcode"
            alt="验证码"
            @click="getImage"
            :src="captchaSrc"
          >
        </div>
      </el-form-item>
      <el-form-item>
        <el-button
          type="primary"
          native-type="submit"
        >
          登录
        </el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script lang="ts" setup>
import { onMounted, reactive, ref } from 'vue-demi'
import { IElForm, IFormRules } from '@/types/element-plus'
import type { ILoginParams } from '@/api/types/common'
import { login, getCaptcha } from '@/api/common'
import { ElMessage } from 'element-plus'
import { useStore } from '@/store'
import { useRouter } from 'vue-router'
const user = reactive<ILoginParams>({
  account: 'admin',
  pwd: '123456',
  imgcode: ''
})
const form = ref<IElForm|null>(null)
const rules = ref<IFormRules>({
  account: [
    { required: true, message: '请输入账号', trigger: 'change' }
  ],
  pwd: [
    { required: true, message: '请输入密码', trigger: 'change' }
  ],
  imgcode: [
    { required: true, message: '请输入验证码', trigger: 'change' }
  ]
})
const loading = ref(false)
const captchaSrc = ref('')
const store = useStore()
const router = useRouter()
onMounted(() => {
  getImage()
})
const getImage = async () => {
  const data = await getCaptcha()
  captchaSrc.value = URL.createObjectURL(data)
}
const handleSubmit = async () => {
  const valid = await form.value?.validate()
  if (!valid) {
    return false
  }
  loading.value = true
  const data = await login(user).finally(() => {
    loading.value = false
  })
  if (data) {
    ElMessage.success({
      message: '登陆成功',
      type: 'success'
    })
  }
  store.commit('setUser', {
    token: data.token,
    ...data.user_info
  })
  let redirect = router.currentRoute.value.query.redirect
  if (typeof redirect !== 'string') {
    redirect = '/'
  }
  router.replace(redirect)
}
</script>

<style lang="scss" scoped>
.login-container {
  min-width: 400px;
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: #2d3a4b;
}

.login-form {
  padding: 30px;
  border-radius: 6px;
  background: #fff;
  min-width: 350px;
  .login-form__header {
    display: flex;
    justify-content: center;
    align-items: center;
    padding-bottom: 30px;
  }

  .el-form-item:last-child {
    margin-bottom: 0;
  }

  .login__form-title {
    display: flex;
    justify-content: center;
    color: #fff;
  }

  .submit-button {
    width: 100%;
  }

  .login-logo {
    width: 271px;
    height: 74px;
  }
  .imgcode-wrap {
    display: flex;
    align-items: center;
    .imgcode {
      height: 37px;
    }
  }
}
</style>
