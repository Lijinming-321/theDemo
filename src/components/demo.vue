<template>
  <el-container class="m_allPage">
    <el-header>
      <TopMenu></TopMenu>
    </el-header>
    <el-container>
      <el-aside width="256px">
        <LeftMenu></LeftMenu>
      </el-aside>
      <el-main>
        <router-view></router-view>
      </el-main>
    </el-container>
  </el-container>
</template>
<script>
import LeftMenu from "@/components/LeftMenu.vue";
import TopMenu from "@/components/TopMenu.vue";
export default {
  data() {
    return {
      isCollapse: false,
    };
  },
  methods: {},
  components: {
    LeftMenu,
    TopMenu,
  },
};
</script>
<style lang="less" scoped>
.m_allPage {
  height: 100%;
  .el-header {
    padding: 0;
  }
  .el-main {
    background-color: #eef2f8;
  }
}
</style>