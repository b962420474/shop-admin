<template>
  <i
    :class="collapseIcon"
    @click="handleCollapse"
  />
</template>
<script lang="ts" setup>
import { useStore } from '@/store'
import { computed } from 'vue-demi'

const store = useStore()
const collapseIcon = computed(() => {
  return !store.state.isCollapse ? 'el-icon-s-fold' : 'el-icon-s-unfold'
})
const handleCollapse = () => {
  store.commit('setIsCollapse', !store.state.isCollapse)
}
</script>
