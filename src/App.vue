<template>
  <div id="app">
    <!-- <router-link to="/home">Home</router-link> -->
    <!-- <Demo></Demo> -->
    <router-view />
  </div>
</template>

<script>
// import Demo from "@/components/demo.vue";
export default {
  name: "App",
  components: {
    // Demo,
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
