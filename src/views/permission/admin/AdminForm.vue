<template>
  <app-dialog
    :title="props.adminId?'修改管理员':'添加管理员'"
    @open="onOpen"
    @close="onClose"
    :confirm="handleSubmit"
  >
    <el-form
      label-width="100px"
      :rules="rules"
      :model="formData"
      ref="form"
      v-loading="isLoading"
    >
      <el-form-item
        label="管理员账号"
        prop="account"
      >
        <el-input
          placeholder="请输入管理员账号"
          type="text"
          v-model="formData.account"
        />
      </el-form-item>
      <el-form-item
        label="管理员密码"
        prop="pwd"
      >
        <el-input
          placeholder="请输入管理员密码"
          type="password"
          v-model="formData.pwd"
        />
      </el-form-item>
      <el-form-item
        label="确认密码"
        prop="conf_pwd"
      >
        <el-input
          placeholder="请输入确认密码"
          type="password"
          v-model="formData.conf_pwd"
        />
      </el-form-item>
      <el-form-item
        label="管理员姓名"
        prop="real_name"
      >
        <el-input
          placeholder="请输入管理员姓名"
          type="text"
          v-model="formData.real_name"
        />
      </el-form-item>
      <el-form-item
        label="管理员身份"
        prop="roles"
      >
        <el-select
          v-model="formData.roles"
          multiple
          placeholder="请选择"
        >
          <el-option
            v-for="item in roles"
            :key="item.value"
            :label="item.label"
            :value="item.value"
          />
        </el-select>
      </el-form-item>
      <el-form-item
        label="状态"
      >
        <el-radio-group
          v-model="formData.status"
        >
          <el-radio
            :label="1"
          >
            开启
          </el-radio>
          <el-radio
            :label="0"
          >
            关闭
          </el-radio>
        </el-radio-group>
      </el-form-item>
    </el-form>
  </app-dialog>
</template>
<script lang="ts" setup>
import { createAdmin, getAdmin, getRoles, updateAdmin } from '@/api/admin'
import { ISelectOptions } from '@/api/types/form'
import { IFormRules, IElForm } from '@/types/element-plus'
import { ref, PropType } from 'vue-demi'
const props = defineProps({
  adminId: {
    type: Number as PropType<number | null>,
    default: null
  }
})
const isLoading = ref(false)
const form = ref<IElForm|null>(null)
const roles = ref<ISelectOptions[]>([])
const loadRoles = async () => {
  const data = await getRoles()
  roles.value = data
}
const rules = ref<IFormRules>({
  account: [
    { required: true, message: '请输入管理员账户', trigger: 'blur' }
  ],
  pwd: [
    { required: true, message: '请输入管理员密码', trigger: 'blur' }
  ],
  conf_pwd: [
    { required: true, message: '请输入确认密码', trigger: 'blur' }
  ],
  roles: [
    { required: true, message: '请选择管理员角色', trigger: 'change' }
  ],
  real_name: [
    { required: true, message: '请输入管理员姓名', trigger: 'blur' }
  ]
})

const formData = ref({
  account: '',
  pwd: '',
  conf_pwd: '',
  roles: [] as number[],
  status: 0 as 0 | 1,
  real_name: ''
})
const loadAdmin = async () => {
  if (props.adminId) {
    const data = await getAdmin(props.adminId)
    formData.value = {
      ...data,
      roles: data.roles.map(item => Number.parseInt(item))
    }
  }
}
const onOpen = () => {
  isLoading.value = true
  Promise.all([loadRoles(), loadAdmin()]).finally(() => {
    isLoading.value = false
  })
}
interface IEmit{
  (e:'success'):void
  (e:'update:admin-id', value:null|number):void
}
const emit = defineEmits<IEmit>()
const handleSubmit = async () => {
  const data = await form.value?.validate()
  if (!data) return
  if (props.adminId) {
    await updateAdmin(props.adminId, formData.value)
  } else {
    await createAdmin(formData.value)
  }
  emit('success')
}
const onClose = () => {
  form.value?.clearValidate()
  form.value?.resetFields()
  emit('update:admin-id', null)
}
</script>
