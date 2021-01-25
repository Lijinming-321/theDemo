<template >
  <div class="m_homepage">
    <Demo></Demo>
  </div>
</template>
<script>
import Demo from "@/components/demo.vue";
export default {
  name: "Home",
  methods: {
    toWhere(val) {
      console.log(val, this.$router);
      this.$router.push("/roles");
    },
  },
  components: {
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