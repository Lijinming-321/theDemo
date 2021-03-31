<template>
  <div class="m_left_menu">
    <el-menu
      class="el-menu-vertical-demo"
      @open="handleOpen"
      @close="handleClose"
      @select="handleSelect"
      :collapse="isCollapse"
      background-color="#545c64"
      text-color="#fff"
      active-text-color="#ffd04b"
    >
      <el-submenu index="1">
        <template slot="title">
          <i class="el-icon-location"></i>
          <span slot="title">Echarts学习</span>
        </template>
        <el-menu-item index="echarts/mapStudy">地图</el-menu-item>
        <el-menu-item index="echarts/pieStudy">pie</el-menu-item>
      </el-submenu>
      <el-submenu index="2">
        <template slot="title">
          <i class="el-icon-location"></i>
          <span slot="title">可视化视图</span>
        </template>
        <el-menu-item index="easyflow">拓扑图</el-menu-item>
        <el-menu-item index="canvasPage">canvas画图</el-menu-item>
        <el-menu-item index="linePage">leader-line画线</el-menu-item>
        <el-menu-item index="svgLine">svg画线</el-menu-item>
        <!-- <el-menu-item index="echarts/pieStudy">pie</el-menu-item> -->
      </el-submenu>
      <el-submenu index="3">
        <template slot="title">
          <i class="el-icon-location"></i>
          <span slot="title">项目实践</span>
        </template>
        <el-menu-item index="orderPage">下单页</el-menu-item>
        <!-- <el-menu-item index="echarts/pieStudy">pie</el-menu-item> -->
      </el-submenu>
      <el-menu-item index="4">
        <i class="el-icon-setting"></i>
        <span slot="title">导航四</span>
      </el-menu-item>
    </el-menu>
    <!-- <el-radio-group v-model="isCollapse" style="margin-bottom: 20px">
          <el-radio-button :label="false">展开</el-radio-button>
          <el-radio-button :label="true">收起</el-radio-button>
        </el-radio-group> -->
  </div>
</template>
<script>
export default {
  name: "LeftMenu",
  data() {
    return {
      isCollapse: false,
    };
  },
  watch: {},
  methods: {
    handleOpen(key, keyPath) {
      console.log(key, keyPath);
    },
    handleClose(key, keyPath) {
      console.log(key, keyPath);
    },
    handleSelect(key, keyPath) {
      console.log("选中的是：", key, keyPath);
      this.$router.push("/" + keyPath[1]);
    },
  },
};
</script>
<style lang="less" scoped>
.m_left_menu {
  height: 100%;
  .el-menu {
    height: 100%;
    text-align: left;
  }
  .el-menu-vertical-demo:not(.el-menu--collapse) {
    width: 255px;
  }
  //   border-bottom: 1px solid #d9d9d9;
}
</style>