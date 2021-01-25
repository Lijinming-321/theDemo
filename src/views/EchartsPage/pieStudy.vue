<template >
  <div>
    pie!!!
    <!-- <a-button type="primary" @click="fnGoHome"> 首页 </a-button> -->
  </div>
</template>
<script>
// import { Button } from 'ant-design-vmapStudyue';
export default {
  name: "mapStudy",
  methods: {
    fnGoHome() {
      this.$router.push("/home");
    },
  },
};
</script>
<style lang="less" scoped>
</style>