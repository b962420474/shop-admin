<template>
  <el-space size="large">
    <ToggleSidebar />
    <app-breadcrumb />
  </el-space>
  <el-space size="large">
    <full-screen />
    <user-info />
  </el-space>
</template>
<script lang="ts" setup>
import ToggleSidebar from './ToggleSidebar.vue'
import AppBreadcrumb from './AppBreadcrumb.vue'
import FullScreen from './FullScreen.vue'
import UserInfo from './UserInfo.vue'
</script>
