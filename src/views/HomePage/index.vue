<template >
  <div class="m_homepage">
    <Demo></Demo>
    <!-- <div><TopMenu></TopMenu></div>
    <div class="m_homepage_content">
      <div class="m_homepage_content_left">
        <LeftMenu @toWhere="toWhere"></LeftMenu>
      </div>
      <div class="m_homepage_content_right">
        <router-view></router-view>
      </div>
    </div> -->
  </div>
</template>
<script>
// import LeftMenu from "@/components/LeftMenu.vue";
// import TopMenu from "@/components/TopMenu.vue";
import Demo from "@/components/demo.vue";
export default {
  name: "Home",
  methods: {
    toWhere(val) {
      console.log(val, this.$router);
      this.$router.push("/login");
    },
  },
  components: {
    // LeftMenu,
    // TopMenu,
    Demo,
  },
};
</script>
<style lang="less" scoped>
.m_homepage {
  width: 100%;
  height: 100%;
  .m_homepage_content {
    display: flex;
    min-height: ~"calc(100% - 50px)";
  }
}
</style>