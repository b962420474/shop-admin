<template>
  <el-pagination
    :current-page="props.page"
    :page-sizes="[10, 20, 30, 40,50]"
    :page-size="props.limit"
    layout="total, sizes, prev, pager, next, jumper"
    :total="props.total"
    @size-change="handleSizeChange"
    @current-change="handleCurrentChange"
  />
</template>
<script lang="ts" setup>
import { PropType } from 'vue-demi'

const props = defineProps({
  page: {
    type: Number,
    default: 1
  },
  limit: {
    type: Number,
    default: 10
  },
  total: {
    type: Number,
    default: 0
  },
  loadList: {
    type: Function as PropType<(...args:any[]) => void>,
    default: () => {}
  }
})
interface EmitsType{
  (e:'update:page', page:number): void
  (e:'update:limit', page:number): void
}
const emit = defineEmits<EmitsType>()
const handleSizeChange = (num:number) => {
  emit('update:limit', num)
  emit('update:page', 1)
  props.loadList()
}
const handleCurrentChange = (num:number) => {
  emit('update:page', num)
  props.loadList()
}
</script>
<style scoped lang="scss">
.el-pagination {
  display: flex;
  justify-content: flex-end;
}
</style>
