<template >
  <div class="m_login_page" ref="linePage">
    <div ref="demo1" class="demo1">元素1</div>
    <div ref="demo2" class="demo2">元素2</div>
    <div ref="demo3" class="demo3">元素3</div>
  </div>
</template>
<script>
import LeaderLine from "../../assets/line.js";
export default {
  name: "Login",
  data() {
    return {
      leader_line: null,
      leader_lineB: null,
    };
  },
  mounted() {
    this.fnSetLine();

    console.log(this.$attrs);
    this.$refs.linePage.addEventListener("scroll", this.getScroll); // 绑定页面的滚动事件
    // scrollableBox.addEventListener(
    //   "scroll",
    //   AnimEvent.add(function () {
    //     leader_line.position();
    //   }),
    //   false
    // );
  },
  methods: {
    getScroll() {
      console.log("页面滚动了");
      this.leader_line.position();
      this.leader_lineB.position();
    },
    fnSetLine() {
      console.log("开始画线");
      this.leader_line = new LeaderLine(this.$refs.demo1, this.$refs.demo2, {
        startPlugColor: "#ff3792", // 渐变色开始色
        endPlugColor: "#aaaaaa", // 渐变色结束色
        gradient: true, // 使用渐变色
        dash: {
          // 虚线样式
          animation: true, // 让线条滚动起来
        },
      });
      this.leader_line = new LeaderLine(this.$refs.demo3, this.$refs.demo1, {
        startPlug: "arrow1",
        endPlug: "arrow1",
        color: "#0198F9",
        path: "grid",
        startSocket: "left",
        endSocket: "left",
      });
      this.leader_line = new LeaderLine(this.$refs.demo3, this.$refs.demo1, {
        endPlug: "arrow1",
        color: "#ff6462",
        path: "straight",
        startSocket: "left",
        endSocket: "bottom",
      });
      this.leader_line = new LeaderLine(this.$refs.demo3, this.$refs.demo2, {
        endPlug: "arrow1",
        color: "#3b3d5a",
        path: "magnet",
        startSocket: "right",
        endSocket: "right",
      });
      this.leader_lineB = new LeaderLine(this.$refs.demo2, this.$refs.demo3);
    },
  },
};
</script>
<style lang="less" scoped>
.m_login_page {
  height: 100%;
  width: 100%;
  position: relative;
  overflow: auto;
  .demo1 {
    width: 200px;
    height: 200px;
    position: absolute;
    top: 200px;
    left: 100px;
    line-height: 200px;
    background-color: green;
    color: white;
  }
  .demo2 {
    width: 200px;
    height: 200px;
    position: absolute;
    top: 200px;
    left: 600px;
    line-height: 200px;
    background-color: red;
    color: white;
  }
  .demo3 {
    width: 200px;
    height: 200px;
    position: absolute;
    top: 600px;
    right: 200px;
    line-height: 200px;
    background-color: grey;
    color: white;
  }
}
</style>