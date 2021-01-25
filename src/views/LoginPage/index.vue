<template >
  <div class="m_login_page">
    <div class="m_login_page_left"></div>
    <div class="m_login_page_right">
      <div class="m_login_page_right_top"><span>联系我们</span></div>
      <div class="m_login_page_right_content">
        <div class="m_content_title">密码登录</div>
        <div class="m_content_account">
          <el-input placeholder="请输入用户名" v-model="userName">
            <i slot="prefix" class="el-input__icon el-icon-user"></i>
          </el-input>
        </div>
        <div class="m_content_password">
          <el-input placeholder="请输入登录密码" v-model="passWord">
            <i slot="prefix" class="el-input__icon el-icon-lock"></i>
          </el-input>
        </div>
        <div class="m_content_btn" @click="fnLogin">
          <el-button type="primary" :loading="loginStatus">
            {{ login_btn }}</el-button
          >
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import { mapMutations } from "vuex";
export default {
  name: "Login",
  data() {
    return {
      userName: "",
      passWord: "",
      login_btn: "登录",
      loginStatus: false,
    };
  },
  methods: {
    ...mapMutations({
      changeShowPage: "HomeModule/changeShowPage",
    }),
    fnGoHome() {
      this.$router.push("/roles");
      this.changeShowPage(true);
      localStorage.setItem("loginFlag", true);
    },
    fnLogin() {
      this.login_btn = "正在登陆...";
      this.loginStatus = true;
      this.$router.push("/roles");
      this.changeShowPage(true);
      localStorage.setItem("loginFlag", true);
    },
  },
};
</script>
<style lang="less" scoped>
.m_login_page {
  height: 100%;
  width: 100%;
  display: flex;

  .m_login_page_left {
    width: 65%;
    height: 100%;
    background: url(../../assets/like.jpg) no-repeat;
    background-size: 100% 100%;
    border-right: 1px solid #d9d9d9;
  }

  .m_login_page_right {
    width: 35%;
    height: 100%;

    .m_login_page_right_top {
      height: 50px;
      text-align: right;
      padding: 20px 20px;

      span {
        cursor: pointer;
      }
    }

    .m_login_page_right_content {
      min-height: ~"calc(100% - 50px)";
      padding: 70% 20% 20% 20%;
      /* background-color: gray; */

      .m_content_title {
        border-left: 5px solid #3f66ff;
        padding-left: 20px;
        text-align: left;
        font-size: 18px;
        font-weight: 600;
        margin-bottom: 50px;
      }

      .m_content_account {
        margin-bottom: 30px;
      }

      .m_content_password {
        margin-bottom: 50px;
      }

      .m_content_btn {
        .el-button--primary {
          width: 100%;
          background-color: #3f66ff;
        }
      }
    }
  }
}
</style>