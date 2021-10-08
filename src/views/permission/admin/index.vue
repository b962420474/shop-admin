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
        <el-form-item label="管理员名称">
          <el-input
            placeholder="请输入身份昵称"
            v-model="listParams.name"
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
          添加管理员
        </el-button>
      </template>
      <el-table
        :data="adminList"
        style="width: 100%"
        v-loading="listLoading"
      >
        <el-table-column
          prop="id"
          label="Id"
        />
        <el-table-column
          prop="real_name"
          label="姓名"
        />
        <el-table-column
          prop="account"
          label="账号"
        />
        <el-table-column
          prop="roles"
          label="身份"
          min-width="180"
        >
          <template #default="scope">
            <el-space>
              <el-tag
                v-for="item in scope.row.roles.split(',')"
                :key="item"
              >
                {{ item }}
              </el-tag>
            </el-space>
          </template>
        </el-table-column>
        <el-table-column
          prop="last_time"
          label="最后一次登陆时间"
        />
        <el-table-column
          prop="last_ip"
          label="最后一次登陆IP"
        />
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
    <admin-form
      v-model:admin-id="adminId"
      v-model="formVisible"
      @success="success"
    />
  </page-container>
</template>
<script lang="ts" setup>
import { getAdmins, deleteAdmin, updateAdminStatus } from '@/api/admin'
import { Admin, IListParams } from '@/api/types/admin'
import { ElMessage } from 'element-plus/lib/components/message'
import { onMounted, ref } from 'vue-demi'
import AdminForm from './AdminForm.vue'
const listParams = ref<IListParams>({
  limit: 10,
  page: 1
})
const adminList = ref<Admin[]>([])
onMounted(() => {
  loadList()
})
const loadList = async () => {
  listLoading.value = true
  const data = await getAdmins(listParams.value).finally(() => {
    listLoading.value = false
  })
  data.list.forEach(item => {
    item.statusLoading = false
  })
  adminList.value = data.list
  total.value = data.count
}
// 状态切换
const handleStatusChange = async (item:Admin) => {
  console.log('change...')
  item.statusLoading = true
  await updateAdminStatus(item.id, item.status).finally(() => {
    item.statusLoading = false
  })
  ElMessage.success(`${item.status === 1 ? '启用' : '禁用'}成功`)
}
// 编辑操作
const handleUpdate = (id:number) => {
  adminId.value = id
  formVisible.value = true
}
// 删除
const handleDelete = async (id:number) => {
  await deleteAdmin(id)
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
const adminId = ref<number|null>(null)
const success = () => {
  formVisible.value = false
  loadList()
}
</script>
