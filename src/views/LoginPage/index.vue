<template >
  <div>
    登录页
    <a-button type="primary" @click="fnGoHome"> 首页 </a-button>
  </div>
</template>
<script>
// import { Button } from 'ant-design-vue';
export default {
  name: "Login",
  methods: {
    fnGoHome() {
      this.$router.push("/home");
    },
  },
};
</script>
<style lang="less" scoped>
</style>