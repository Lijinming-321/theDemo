<template>
  <div class="m_top_menu"></div>
</template>
<script>
export default {
  name: "LeftMenu",
  data() {
    return {
      current: ["mail"],
      openKeys: ["sub1"],
    };
  },
  watch: {
    openKeys(val) {
      console.log("openKeys", val);
    },
  },
  methods: {},
};
</script>
<style lang="less" scoped>
.m_top_menu {
  height: 50px;
  border-bottom: 1px solid #d9d9d9;
}
</style>