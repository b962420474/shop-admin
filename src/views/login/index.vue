<template>
  <div>登陆</div>
</template>
<script lang="ts" setup>
import { getInfo } from '@/api/common'
import { onMounted } from '@vue/runtime-core'
onMounted(async () => {
  const data = await getInfo()
  console.log(data)
})
</script>
