<template>
  <page-container>
    <app-card>
      <template #header>
        数据筛选
      </template>
      <el-form
        :inline="true"
        class="demo-form-inline"
        :disabled="listLoading"
      >
        <el-form-item label="状态">
          <el-select
            placeholder="全部"
            v-model="listParams.status"
          >
            <el-option
              label="关"
              value="0"
            />
            <el-option
              label="开"
              value="1"
            />
            <el-option
              label="全部"
              value=""
            />
          </el-select>
        </el-form-item>
        <el-form-item label="身份昵称">
          <el-input
            placeholder="请输入身份昵称"
            v-model="listParams.role_name"
          />
        </el-form-item>
        <el-form-item>
          <el-button @click="loadList">
            查询
          </el-button>
        </el-form-item>
      </el-form>
    </app-card>
    <app-card>
      <template #header>
        <el-button @click="handleAdd">
          添加角色
        </el-button>
      </template>
      <el-table
        :data="roleList"
        style="width: 100%"
        v-loading="listLoading"
      >
        <el-table-column
          prop="id"
          label="Id"
        />
        <el-table-column
          prop="role_name"
          label="身份昵称"
        />
        <el-table-column
          label="权限"
          min-width="180"
        >
          <template #default="scope">
            <div
              class="text-nowrap"
              :title="scope.row.rules"
            >
              {{ scope.row.rules }}
            </div>
          </template>
        </el-table-column>
        <el-table-column
          label="状态"
        >
          <template #default="scope">
            <el-switch
              v-model="scope.row.status"
              :active-value="1"
              :inactive-value="0"
              @change="handleStatusChange(scope.row)"
              :loading="scope.row.statusLoading"
            />
          </template>
        </el-table-column>
        <el-table-column
          label="操作"
          min-width="100"
          align="center"
          fixed="right"
        >
          <template #default="scope">
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
        </el-table-column>
      </el-table>
      <app-pagination
        v-model:page="listParams.page"
        v-model:limit="listParams.limit"
        :total="total"
        :disabled="listLoading"
        :load-list="loadList"
      />
    </app-card>
    <role-form
      v-model:role-id="roleId"
      v-model="formVisible"
      @success="success"
    />
  </page-container>
</template>
<script lang="ts" setup>
import { getRoles, deleteRole, updateRoleStatus } from '@/api/role'
import { IRoleListParams, Role } from '@/api/types/role'
import { ElMessage } from 'element-plus/lib/components/message'
import { onMounted, ref } from 'vue-demi'
import RoleForm from './RoleForm.vue'
const listParams = ref<IRoleListParams>({
  limit: 10,
  page: 1
})
const roleList = ref<Role[]>([])
onMounted(() => {
  loadList()
})
const loadList = async () => {
  listLoading.value = true
  const data = await getRoles(listParams.value).finally(() => {
    listLoading.value = false
  })
  data.list.forEach(item => {
    item.statusLoading = false
  })
  roleList.value = data.list
  total.value = data.count
}
// 状态切换
const handleStatusChange = async (item:Role) => {
  item.statusLoading = true
  await updateRoleStatus(item.id, item.status).finally(() => {
    item.statusLoading = false
  })
  ElMessage.success(`${item.status === 1 ? '启用' : '禁用'}成功`)
}
// 编辑操作
const handleUpdate = (id:number) => {
  roleId.value = id
  formVisible.value = true
}
// 删除
const handleDelete = async (id:number) => {
  await deleteRole(id)
  ElMessage.success('删除成功')
  loadList()
}

const handleAdd = () => {
  formVisible.value = true
}
// 分页相关逻辑
const total = ref(0)
const listLoading = ref(false)

//
const formVisible = ref(false)
const roleId = ref<number|null>(null)
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
