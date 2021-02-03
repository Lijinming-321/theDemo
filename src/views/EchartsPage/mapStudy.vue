<template>
  <GridGroup
    :column="3"
    :drag-data-list="dragDataList"
    @drag-start="dragStart"
    @drag-end="dragEnd"
    @changeData="fnChangeData"
  >
    <template v-slot:default="dragData"
      ><div class="drag-data-divddd">
        这是{{ dragData.data.title }}数据
      </div></template
    >
  </GridGroup>
</template>
<script>
import GridGroup from "@/components/GridGroup.vue";
export default {
  data: function () {
    return {
      aaa: true,
      dragDataList: [
        {
          startX: 3,
          endX: 4,
          startY: 1,
          endY: 2,
          title: "2",
        },
        {
          startX: 1,
          endX: 2,
          startY: 1,
          endY: 2,
          title: "1",
        },
        {
          startX: 2,
          endX: 4,
          startY: 2,
          endY: 3,
          title: "3",
        },
        {
          startX: 1,
          endX: 4,
          startY: 3,
          endY: 4,
          title: "4",
        },
        {
          startX: 3,
          endX: 4,
          startY: 4,
          endY: 5,
          title: "5",
        },
        {
          startX: 3,
          endX: 4,
          startY: 6,
          endY: 7,
          title: "6",
        },
      ],
    };
  },
  methods: {
    dragStart: function (event) {
      this.$message({
        type: "info",
        message: `拖拽开始，通过console可以查看event参数, ${JSON.stringify(
          event
        )}`,
      });
      console.info("拖拽开始", event);
    },
    dragEnd: function (event, dragList) {
      this.$message({
        type: "info",
        message: `拖拽结束，通过console可以查看event参数, ${JSON.stringify(
          event
        )}, ${dragList}`,
      });
      console.info("拖拽结束", event, dragList);
    },
    fnChangeData(val) {
      console.log("回到了父亲", val);
      console.log(val[0]);
      console.log(val[1]);
      console.log(val[2]);
      console.log(val[3]);
      console.log(val[4]);
      // this.$nextTick(() => {
      //   this.dragDataList = val;
      // });
      this.dragDataList = JSON.parse(JSON.stringify(val));
      console.log("***", this.dragDataList);
    },
  },
  components: {
    GridGroup,
  },
};
</script>
<style scoped>
.drag-data-divddd {
  background-color: green;
  color: #ffffff;
  /* width: 100px; */
  min-width: 100px;
  height: 100px;
  line-height: 100px;
}
</style>