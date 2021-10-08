<template>
  <app-dialog
    :title="props.roleId?'编辑角色':'添加角色'"
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
        label="角色名称"
        prop="role_name"
      >
        <el-input
          placeholder="请输入角色名称"
          type="text"
          v-model="formData.role_name"
        />
      </el-form-item>
      <el-form-item
        label="是否启用"
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
      <el-form-item
        label="角色权限"
      >
        <el-tree
          ref="tree"
          :data="roles"
          show-checkbox
          node-key="id"
          :props="{
            label: 'title',
          }"
        />
      </el-form-item>
    </el-form>
  </app-dialog>
</template>
<script lang="ts" setup>
import { getRole, getRulesList, createRole } from '@/api/role'
import { IRlue, RolePostData } from '@/api/types/role'
import { IFormRules, IElForm, IElTree } from '@/types/element-plus'
import { nextTick } from 'vue'
import { ref, PropType } from 'vue-demi'
const props = defineProps({
  roleId: {
    type: Number as PropType<number | null>,
    default: null
  }
})
const isLoading = ref(false)
const form = ref<IElForm|null>(null)
const roles = ref<IRlue[]|null>(null)
const tree = ref<IElTree|null>(null)
const loadRulesList = async () => {
  const data = await getRulesList()
  roles.value = data.menus
}
const rules = ref<IFormRules>({
  role_name: [
    { required: true, message: '请输入角色名称', trigger: 'blur' }
  ],
  status: [
    { required: true, message: '请选择状态', trigger: 'change' }
  ]
})

const formData = ref<RolePostData>({
  role_name: '',
  status: 0 as 0 | 1,
  checked_menus: []
})
const loadRole = async () => {
  if (props.roleId) {
    const data = await getRole(props.roleId)
    roles.value = data.menus
    await nextTick()
    formData.value.role_name = data.role.role_name
    formData.value.status = data.role.status
    setTree(data.role.rules.split(',').map(id => parseInt(id)))
  }
}
const setTree = (menus:number[]) => {
  menus.forEach(menuId => {
    const node = tree.value?.getNode(menuId)
    if (node && node.isLeaf) {
      tree.value?.setChecked(menuId, true, false)
    }
  })
}
const onOpen = () => {
  isLoading.value = true
  props.roleId
    ? loadRole().finally(() => {
      isLoading.value = false
    })
    : loadRulesList().finally(() => {
      isLoading.value = false
    })
}
interface IEmit{
  (e:'success'):void
  (e:'update:role-id', value:null|number):void
}
const emit = defineEmits<IEmit>()
const handleSubmit = async () => {
  const data = await form.value?.validate()
  if (!data) return
  formData.value.checked_menus = [
    ...tree.value?.getCheckedKeys(true) as any,
    ...tree.value?.getHalfCheckedKeys() as any
  ]
  if (props.roleId) {
    await createRole(props.roleId, formData.value)
  } else {
    await createRole(0, formData.value)
  }
  emit('success')
}
const onClose = () => {
  form.value?.clearValidate()
  form.value?.resetFields()
  emit('update:role-id', null)
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
