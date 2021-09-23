
<template>
  <el-breadcrumb separator-class="el-icon-arrow-right">
    <el-breadcrumb-item
      v-for="route in routes"
      :key="route.path"
      :to="{ path: route.path }"
    >
      {{ route.meta.title }}
    </el-breadcrumb-item>
  </el-breadcrumb>
</template>

<script lang="ts" setup>
import { computed } from 'vue-demi'
import { useRouter } from 'vue-router'

const router = useRouter()
const routes = computed(() => router.currentRoute.value.matched.filter(item => item.meta.title))
</script>

<style>

</style>
