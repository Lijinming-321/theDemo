<template>
  <DragGroup
    :column="3"
    :drag-data-list.sync="dragDataList"
    @drag-start="dragStart"
    @drag-end="dragEnd"
  >
    <template v-slot:default="dragData"
      ><div class="drag-data-div">这是{{ dragData.data }}数据</div></template
    >
  </DragGroup>
</template>
<script>
import DragGroup from "@/components/DragGroup.vue";
export default {
  data: function () {
    return {
      dragDataList: ["1", "2", "3", "4", "5", "6"],
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
  },
  components: {
    DragGroup,
  },
};
</script>
<style scoped>
.drag-data-div {
  background-color: green;
  color: #ffffff;
  width: 100px;
  height: 100px;
  line-height: 100px;
}
</style>