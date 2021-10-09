<template>
  <page-container>
    <app-card>
      <template #header>
        权限规则
      </template>
      <el-form
        :inline="true"
        class="demo-form-inline"
        :disabled="listLoading"
      >
        <el-form-item label="规则状态">
          <el-select
            placeholder="全部"
            v-model="listParams.is_show"
          >
            <el-option
              label="不显示"
              value="0"
            />
            <el-option
              label="显示"
              value="1"
            />
            <el-option
              label="全部"
              value=""
            />
          </el-select>
        </el-form-item>
        <el-form-item label="按钮名称">
          <el-input
            placeholder="请输入按钮名称"
            v-model="listParams.keyword"
          />
        </el-form-item>
        <el-form-item>
          <el-button
            @click="loadList"
            icon="el-icon-search"
          />
        </el-form-item>
      </el-form>
    </app-card>
    <app-card>
      <template #header>
        <el-button @click="handleAdd">
          添加规则
        </el-button>
      </template>
      <vxe-table
        :data="menuList"
        style="width: 100%"
        v-loading="listLoading"
        row-id="id"
        :tree-config="{children: 'children'}"
      >
        <vxe-column
          field="id"
          title="Id"
          tree-node
        />
        <vxe-column
          field="menu_name"
          title="按钮名称"
        />
        <vxe-column
          title="接口路径"
        >
          <template #default="{row}">
            {{ row.api_url ? `[${row.methods}] ${row.api_url}` : '' }}
          </template>
        </vxe-column>
        <vxe-column
          field="unique_auth"
          title="前端权限"
        />
        <vxe-column
          field="menu_path"
          title="页面路由"
        />
        <vxe-column
          title="规则状态"
        >
          <template #default="scope">
            <el-switch
              v-model="scope.row.is_show"
              :active-value="1"
              :inactive-value="0"
              @change="handleStatusChange(scope.row)"
              :loading="scope.row.statusLoading"
            />
          </template>
        </vxe-column>
        <vxe-column
          label="操作"
          min-width="100"
          align="center"
          fixed="right"
        >
          <template #default="scope">
            <el-button
              type="text"
              @click="handleCreate(scope.row.id)"
            >
              添加规则
            </el-button>
            <el-button
              type="text"
              @click="handleUpdate(scope.row.id)"
            >
              编辑
            </el-button>
            <el-popconfirm
              title="确认删除吗？"
              @confirm="handleDelete(scope.row.id)"
            >
              <template #reference>
                <el-button
                  type="text"
                >
                  删除
                </el-button>
              </template>
            </el-popconfirm>
          </template>
        </vxe-column>
      </vxe-table>
    </app-card>
    <rule-form
      v-model:p-id="pId"
      v-model:rule-id="ruleId"
      v-model="formVisible"
      @success="success"
    />
  </page-container>
</template>
<script lang="ts" setup>
import { getmenus, deleteMenu, updateMenuStatus } from '@/api/rule'
import { IRuleParams, Menu } from '@/api/types/rule'
import { ElMessage } from 'element-plus/lib/components/message'
import { onMounted, ref } from 'vue-demi'
import RuleForm from './RuleForm.vue'
const listParams = ref<IRuleParams>({
  is_show: '',
  keyword: ''
})
const menuList = ref<Menu[]>([])
onMounted(() => {
  loadList()
})
const loadList = async () => {
  listLoading.value = true
  const data = await getmenus(listParams.value).finally(() => {
    listLoading.value = false
  })
  data.forEach(item => {
    item.statusLoading = false
  })
  menuList.value = data
}
// 状态切换
const handleStatusChange = async (item:Menu) => {
  item.statusLoading = true
  await updateMenuStatus(item.id, item.is_show).finally(() => {
    item.statusLoading = false
  })
  ElMessage.success(`${item.is_show === 1 ? '启用' : '禁用'}成功`)
}
// 编辑操作
const handleUpdate = (id:number) => {
  ruleId.value = id
  formVisible.value = true
}
// 删除
const handleDelete = async (id:number) => {
  await deleteMenu(id)
  ElMessage.success('删除成功')
  loadList()
}
const handleCreate = (id:number) => {
  pId.value = id
  handleAdd()
}

const handleAdd = () => {
  formVisible.value = true
}
// 分页相关逻辑
const listLoading = ref(false)

//
const formVisible = ref(false)
const pId = ref<number|null>(null)
const ruleId = ref<number|null>(null)
const success = () => {
  formVisible.value = false
  loadList()
}
</script>
<style lang='scss' scoped>
.text-nowrap {
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
}
</style>
