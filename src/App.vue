<template>
  <div id="app">
    <!-- <router-link to="/home">Home</router-link> -->
    <Home v-if="showPage"></Home>
    <Login v-if="!showPage"></Login>
    <!-- <router-link to="/home">H1页面</router-link>
    <router-link to="/roles">H2页面</router-link> -->
    <!-- <router-view /> -->
  </div>
</template>

<script>
import Home from "@/views/HomePage/index.vue";
import Login from "@/views/LoginPage/index.vue";
import { mapState, mapMutations } from "vuex";
export default {
  name: "App",
  data() {
    return {};
  },
  computed: {
    ...mapState({
      showPage: (state) => state.HomeModule.showPage,
    }),
  },
  components: {
    Home,
    Login,
  },
  mounted() {
    console.log(this.showPage, localStorage.getItem("loginFlag"));
    let flag = localStorage.getItem("loginFlag")
      ? Boolean(localStorage.getItem("loginFlag"))
      : this.showPage;
    this.changeShowPage(flag);
    flag ? this.$router.push("/roles") : this.$router.push("/login");
  },
  methods: {
    ...mapMutations({
      changeShowPage: "HomeModule/changeShowPage",
    }),
  },
};
</script>

<style>
html,
body {
  height: 100%;
  width: 100%;
  padding: 0;
  margin: 0;
}
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  height: 100%;
  width: 100%;
}
</style>
