<template>
  <el-menu
    :unique-opened="false"
    default-active="/"
    :collapse="$store.state.isCollapse"
    class="el-menu-vertical-demo"
    background-color="#304156"
    text-color="#bcc0c5"
    router
    active-text-color="#2d8cf0"
  >
    <el-menu-item index="/">
      <i class="el-icon-menu" />
      <template #title>
        首页
      </template>
    </el-menu-item>
    <el-sub-menu index="1">
      <template #title>
        <i class="el-icon-location" />
        <span>商品</span>
      </template>
      <el-menu-item index="/product/product_list">
        <i class="el-icon-menu" />
        <template #title>
          商品列表
        </template>
      </el-menu-item>
      <el-menu-item index="/product/product_classify">
        <i class="el-icon-menu" />
        <template #title>
          商品分类
        </template>
      </el-menu-item>
      <el-menu-item index="/product/product_attr">
        <i class="el-icon-menu" />
        <template #title>
          商品规格
        </template>
      </el-menu-item>
      <el-menu-item index="/product/product_reply">
        <i class="el-icon-menu" />
        <template #title>
          商品评论
        </template>
      </el-menu-item>
    </el-sub-menu>
    <el-sub-menu index="2">
      <template #title>
        <i class="el-icon-location" />
        <span>设置</span>
      </template>
      <el-sub-menu index="2-1">
        <template #title>
          <i class="el-icon-location" />
          <span>权限管理</span>
        </template>
        <el-menu-item index="/system_admin/index">
          <i class="el-icon-menu" />
          <template #title>
            管理员
          </template>
        </el-menu-item>
        <el-menu-item index="/system_role/index">
          <i class="el-icon-menu" />
          <template #title>
            角色
          </template>
        </el-menu-item>
        <el-menu-item index="/system_menus/index">
          <i class="el-icon-menu" />
          <template #title>
            规则
          </template>
        </el-menu-item>
      </el-sub-menu>
    </el-sub-menu>
  </el-menu>
</template>
<script lang="ts" setup>
</script>
<style lang="scss" scoped>
.el-menu{
  border-right: none;
}
.el-menu:not(.el-menu--collapse) {
  width: 200px;
  min-height: 400px;
}
</style>
