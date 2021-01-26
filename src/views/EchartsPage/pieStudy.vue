<template >
  <div>
    <div id="container">
      <div class="item item-1">1</div>
      <div class="item item-2">2</div>
      <div class="item item-3">3</div>
      <div class="item item-4">4</div>
      <div class="item item-5">5</div>
      <div class="item item-6">6</div>
      <div class="item item-7">7</div>
      <div class="item item-8">8</div>
      <div class="item item-9">9</div>
    </div>
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
#container {
  display: grid;
  grid-template-columns: 100px 100px 100px;
  grid-template-rows: 100px 100px 100px;
}

.item {
  font-size: 2em;
  text-align: center;
  border: 1px solid #e5e4e9;
}

.item-1 {
  background-color: #4ba946;
  justify-self: start;
  align-self: end;
}

.item-2 {
  background-color: #4ba946;
}

.item-3 {
  background-color: #4ba946;
}

.item-4 {
  background-color: #4ba946;
}

.item-5 {
  background-color: #4ba946;
}

.item-6 {
  background-color: #4ba946;
}

.item-7 {
  background-color: #4ba946;
}

.item-8 {
  background-color: #4ba946;
}
.item-9 {
  background-color: #4ba946;
}
</style>