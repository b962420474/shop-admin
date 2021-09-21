<template>
  <div>首页</div>
</template>
<script lang="ts" setup>
import { useStore } from '@/store'
const store = useStore()
console.log(store.state.count)
</script>
