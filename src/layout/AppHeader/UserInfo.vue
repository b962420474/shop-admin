
<template>
  <el-dropdown>
    <span class="el-dropdown-link">
      <el-avatar
        :src="store.state.user?.head_pic"
      >{{ store.state.user?.account }}</el-avatar>
    </span>
    <template #dropdown>
      <el-dropdown-menu>
        <el-dropdown-item>个人中心</el-dropdown-item>
        <el-dropdown-item @click="handleLogout">
          退出登录
        </el-dropdown-item>
      </el-dropdown-menu>
    </template>
  </el-dropdown>
</template>

<script lang="ts" setup>
import { useStore } from '@/store'
import { logout } from '@/api/common'
import { useRouter } from 'vue-router'
import { ElMessage, ElMessageBox } from 'element-plus'
const store = useStore()
const router = useRouter()
const handleLogout = async () => {
  const result = await ElMessageBox.confirm('确认退出吗？', '退出提示', {
    confirmButtonText: '确定',
    cancelButtonText: '取消',
    type: 'warning'
  }).then(() => {
    return true
  })
    .catch(() => {
      ElMessage({
        type: 'info',
        message: '已取消退出'
      })
      return false
    })
  if (!result) return
  await logout()
  store.commit('setUser', null)
  ElMessage({
    type: 'success',
    message: '退出成功!'
  })
  router.push({ name: 'login' })
}
</script>

<style>
</style>
