<template>
  <app-dialog
    title="添加规则"
    @open="onOpen"
    @close="onClose"
    :confirm="handleSubmit"
  >
    <el-form
      label-width="110px"
      :rules="formRules"
      :model="formData"
      ref="form"
      v-loading="isLoading"
    >
      <el-row>
        <el-col :span="24">
          <el-form-item
            label="类型"
          >
            <el-radio-group
              v-model="formData.auth_type"
            >
              <el-radio
                :label="2"
              >
                接口
              </el-radio>
              <el-radio
                :label="1"
              >
                菜单（只显示三级）
              </el-radio>
            </el-radio-group>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="12">
          <el-form-item
            label="名称"
            prop="menu_name"
          >
            <el-input
              type="text"
              v-model="formData.menu_name"
            />
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item
            label="父级分类"
            prop="path"
          >
            <el-cascader
              placeholder="请选择"
              v-model="formData.path"
              :options="menus"
              :props="{ checkStrictly: true }"
              clearable
              @change="handleChange"
            />
          </el-form-item>
        </el-col>
        <template v-if="formData.auth_type===1">
          <el-col :span="12">
            <el-form-item
              label="接口参数"
              prop="params"
            >
              <el-input
                type="text"
                v-model="formData.params"
              />
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item
              label="路由路径"
              prop="menu_path"
            >
              <el-input
                type="text"
                v-model="formData.menu_path"
              />
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item
              label="图标"
              prop="icon"
            >
              <el-input
                type="text"
                v-model="formData.icon"
              />
            </el-form-item>
          </el-col>
        </template>
        <template v-else>
          <el-col :span="12">
            <el-form-item
              label="请求方法"
              prop="methods"
            >
              <el-select v-model="formData.methods">
                <el-option
                  v-for="item in methods"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value"
                />
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item
              label="接口地址"
              prop="api_url"
            >
              <el-input
                type="text"
                v-model="formData.api_url"
              />
            </el-form-item>
          </el-col>
        </template>
        <el-col :span="12">
          <el-form-item
            label="权限标识"
            prop="unique_auth"
          >
            <el-input
              type="text"
              v-model="formData.unique_auth"
            />
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item
            label="排序"
            prop="sort"
          >
            <el-input
              type="text"
              v-model="formData.sort"
            />
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item
            label="状态"
            prop="is_show"
          >
            <el-radio-group
              v-model="formData.is_show"
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
        </el-col>
        <el-col :span="12">
          <el-form-item
            label="是否展示"
            prop="is_show_path"
          >
            <el-radio-group
              v-model="formData.is_show_path"
            >
              <el-radio
                :label="1"
              >
                是
              </el-radio>
              <el-radio
                :label="0"
              >
                否
              </el-radio>
            </el-radio-group>
          </el-form-item>
        </el-col>
      </el-row>
    </el-form>
  </app-dialog>
</template>
<script lang="ts" setup>
import { getRule, getMenu, createRule, updateRule } from '@/api/rule'
import { Menu } from '@/api/types/rule'
import { IFormRules, IElForm } from '@/types/element-plus'
import { computed } from 'vue'
import { ref, PropType } from 'vue-demi'
const props = defineProps({
  pId: {
    type: Number as PropType<number | null>,
    default: null
  },
  ruleId: {
    type: Number as PropType<number | null>,
    default: null
  }
})
const isLoading = ref(false)
const form = ref<IElForm|null>(null)
const menus = ref<Menu[]>([])
const methods = ['GET', 'POST', 'PUT', 'PATCH', 'DELETE'].map(item => ({
  label: item,
  value: item
}))

const menuRules:IFormRules = {
  menu_path: [
    { message: '请输入路由路径', required: true, trigger: 'change' }
  ],
  unique_auth: [
    { message: '请输入权限标识', required: true, trigger: 'change' }
  ]
}

const apiRules:IFormRules = {
  methods: [
    { message: '请选择请求方式', required: true, trigger: 'change' }
  ],
  api_url: [
    { message: '请输入接口地址', required: true, trigger: 'change' }
  ]
}

const commonRules:IFormRules = {
  menu_name: [
    { message: '请输入按钮名称', required: true, trigger: 'change' }
  ]
}

const formRules = computed(() => {
  // 清除验证结果
  form.value?.clearValidate()
  return formData.value.auth_type === 1
    ? { ...menuRules, ...commonRules }
    : { ...apiRules, ...commonRules }
})
const formData = ref<{ path: number[] } & Omit<Menu, 'id' | 'children' | 'is_del' | 'path'>>({
  auth_type: 1,
  menu_name: '',
  pid: 0,
  params: '',
  controller: '',
  module: '',
  action: '',
  icon: '',
  path: [],
  menu_path: '',
  api_url: '',
  methods: '',
  unique_auth: '',
  header: '',
  is_header: 0,
  sort: 0,
  access: 0,
  is_show: 0,
  is_show_path: 1
})
const loadRule = async () => {
  if (props.ruleId) {
    const data = await getRule(props.ruleId)
    data.path = [
      ...data.path,
      data.id
    ]
    formData.value = data
  }
}
const loadMenus = async () => {
  const data = await getMenu()
  menus.value = data
}
const loadDefault = async () => {
  if (!props.pId) return null
  const data = await getRule(props.pId)
  formData.value.pid = props.pId
  formData.value.path = [...data.path, props.pId]
}
const onOpen = () => {
  isLoading.value = true
  Promise.all([loadMenus(), loadRule(), loadDefault()]).finally(() => {
    isLoading.value = false
  })
}
interface IEmit{
  (e:'success'):void
  (e:'update:p-id', value:null|number):void
  (e:'update:rule-id', value:null|number):void
}
const emit = defineEmits<IEmit>()
const handleChange = (value:number[]) => {
  formData.value.path = [...value]
}
const handleSubmit = async () => {
  const data = await form.value?.validate()
  if (!data) return
  if (props.ruleId) {
    await updateRule(props.ruleId, formData.value)
  } else {
    await createRule(formData.value)
  }
  emit('success')
}
const onClose = () => {
  form.value?.clearValidate()
  form.value?.resetFields()
  emit('update:p-id', null)
  emit('update:rule-id', null)
}
</script>
<style lang="scss" scoped>
.el-select {
  width: 100%;
}

.el-tree {
  height: 250px;
  overflow: auto;
}</style>
