<template >
  <div class="m_order_page" ref="linePage">
    <svg v-if="svgArr.length > 0" style="width: 100%; height: 100%">
      <line
        v-for="(val, key) in svgArr"
        :key="key"
        :x1="val.x"
        :y1="val.y"
        :x2="val.x1"
        :y2="val.y1"
        :style="{
          stroke: 'rgb(255, 0, 0)',
          'stroke-width': 5,
          'stroke-dasharray': val.isTrue ? 0 : 8,
        }"
      />
    </svg>
    <div class="left_div" ref="left_div"></div>
    <div class="center_div" ref="center_div"></div>
    <div class="right_div" ref="right_div"></div>
  </div>
</template>
<script>
import Breadcrumb from "@/components/Breadcrumb.vue";
export default {
  name: "Login",
  data() {
    return {
      svgArr: [],
    };
  },
  mounted() {
    this.setLine();
  },
  methods: {
    setLine() {
      let _this = this;
      let startData = _this.changeData("left_div");
      let endData = _this.changeData("right_div");
      console.log(endData);
      this.svgArr.push({
        x: startData.x,
        y: startData.y,
        x1: endData.x,
        y1: endData.y,
        isTrue: true,
      });
      console.log(this.svgArr);
    },
    changeData(val) {
      let _this = this,
        obj = {};
      obj.y = _this.$refs[val].offsetTop + _this.$refs[val].offsetHeight / 2;
      obj.x = _this.$refs[val].offsetLeft + _this.$refs[val].offsetWidth / 2;
      return obj;
    },
  },
  components: {
    Breadcrumb,
  },
};
</script>
<style lang="less" scoped>
.m_order_page {
  position: relative;
  height: 1000px;
  width: 100%;
  .left_div {
    width: 100px;
    height: 100px;
    display: inline-block;
    position: absolute;
    background-color: blue;
    top: 100px;
    left: 100px;
    z-index: 3;
  }
  .center_div {
    width: 100px;
    height: 100px;
    display: inline-block;
    position: absolute;
    background-color: green;
    top: 100px;
    left: 500px;
    z-index: 3;
  }
  .right_div {
    width: 100px;
    height: 100px;
    position: absolute;
    display: inline-block;
    background-color: grey;
    top: 100px;
    right: 100px;
    z-index: 3;
  }
}
</style>