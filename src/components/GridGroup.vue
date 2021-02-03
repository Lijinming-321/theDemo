/* eslint-disable no-debugger */
<template>
  <div
    ref="dragContainer"
    class="uni-drag-group"
    :style="{
      'grid-template-areas': gridAreas,
      'grid-template-rows': gridRows,
    }"
  >
    <div
      v-for="(dragData, index) in dragList"
      :key="index"
      v-drag
      :style="{
        'grid-row-start': dragData.startY,
        'grid-row-end': dragData.endY,
        'grid-column-start': dragData.startX,
        'grid-column-end': dragData.endX,
      }"
      class="drag-item"
      :class="'index' + index"
      onselectstart="return false;"
    >
      <slot :data="dragData"></slot>
    </div>
  </div>
</template>
<script>
export default {
  name: "UniDragGroup",
  directives: {
    drag: {
      bind: function (el, binding, vnode) {
        const moveEl = el;
        moveEl.onmousedown = (event) => {
          moveEl.style.boxShadow = "#e6e6e6 0 0 10px 10px";
          moveEl.style.zIndex = 100;
          vnode.context.$emit("drag-start", event);
          const disX = event.clientX;
          const disY = event.clientY;
          console.log(moveEl);
          document.onmousemove = (dEvent) => {
            let x = dEvent.clientX - disX;
            let y = dEvent.clientY - disY;
            const { minX, maxX, minY, maxY } = vnode.context.getRangeOfEl(
              moveEl
            );
            x = x < minX ? minX : x > maxX ? maxX : x;
            y = y < minY ? minY : y > maxY ? maxY : y;
            moveEl.style.left = x + "px";
            moveEl.style.top = y + "px";
          };
          document.onmouseup = (upEvent) => {
            document.onmousemove = null; // 需要把事件监听取消
            document.onmouseup = null; // 需要把事件监听取消
            moveEl.style.boxShadow = "none";
            moveEl.style.zIndex = 0;
            vnode.context.changeBlock(moveEl);
            vnode.context.$emit("changeData", vnode.context.tempList);
            vnode.context.$emit("drag-end", upEvent, vnode.context.dragList);
          };
        };
      },
    },
  },
  props: {
    // 拖拽列表数据
    dragDataList: {
      type: Array,
      default: () => {
        return [];
      },
    },
    // 列数
    column: {
      type: Number,
      default: 1,
    },
    // 列宽
    columnWidth: {
      type: String,
      default: "auto",
    },
    // 行高
    rowHeight: {
      type: String,
      default: "auto",
    },
    // 拖拽类型：重排resort/替换replace
    type: {
      type: String,
      default: "replace",
    },
  },
  data: function () {
    return {
      allRow: 0,
      tempList: [],
      gridAreas: "",
      gridRows: "",
      dragList: [],
    };
  },
  watch: {
    dragDataList: {
      immediate: true,
      deep: true,
      handler(val, valA) {
        console.log("#########", val, valA);
        this.dragList = val;
        this.joinGridArea();
        // this.$nextTick(() => {
        //   this.dragList = _.cloneDeep(val);
        // });
      },
    },
  },
  mounted: function () {
    // this.$refs.dragContainer.style.setProperty(
    //   "--columnWidth",
    //   this.columnWidth
    // );
    // this.$refs.dragContainer.style.setProperty("--rowHeight", this.rowHeight);
    this.joinGridArea();
  },
  methods: {
    // grid style拼接
    joinGridArea: function () {
      const listLen = this.dragList.length;
      console.log(this.dragList);
      let areaStr = "";
      let maxY = 0;
      for (let x = 0; x < listLen; x++) {
        if (this.dragList[x].endY > maxY) {
          maxY = this.dragList[x].endY;
        }
      }
      console.log(maxY);
      this.allRow = maxY - 2;
      const len = (maxY - 1) * this.column;
      for (let i = 0; i < len; i++) {
        // console.log(i);
        if (i % this.column === 0) {
          areaStr += '"area-' + i + " ";
          if (this.column === 1) {
            areaStr += '"';
          }
        } else if (i % this.column === this.column - 1) {
          areaStr += "area-" + i + '"';
        } else {
          areaStr += "area-" + i + " ";
        }
      }
      if (len % this.column !== 0) {
        const emptyLength = this.column - (len % this.column);
        areaStr += new Array(emptyLength).fill(".").join(" ") + '"';
      }
      console.log(areaStr);
      this.gridAreas = areaStr;
      let strRow = "";
      for (let x = 0; x <= this.allRow; x++) {
        strRow += "100px ";
      }
      this.gridRows = strRow;
    },
    // 计算当前元素可移动的区域
    getRangeOfEl: function (moveEl) {
      let oneWidth =
        moveEl.offsetWidth /
        (moveEl.style.gridColumnEnd - moveEl.style.gridColumnStart);
      let oneHeight = moveEl.offsetHeight;
      const res = {};
      res.minX = -(
        (oneWidth + 5) *
        (parseInt(moveEl.style.gridColumnStart) - 1)
      );
      res.maxX =
        (this.column - moveEl.style.gridColumnEnd + 1) * (oneWidth + 5);
      res.minY = -(
        (oneHeight + 5) *
          (parseInt(
            moveEl.style.gridRowStart == "" ? 0 : moveEl.style.gridRowStart
          ) -
            1) +
        oneHeight / 3
      );
      res.maxY =
        (this.allRow -
          parseInt(
            moveEl.style.gridRowStart == "" ? 0 : moveEl.style.gridRowStart
          ) +
          1) *
          (oneHeight + 5) +
        oneHeight / 3;
      console.log("区域！！！", res);
      return res;
    },

    // 拖拽结束时重排数据或者替换数据
    changeBlock: function (moveEl) {
      //先计算出移动到了哪

      console.log(moveEl.style);
      const x = parseInt(moveEl.style.left.split("px")[0]);
      const y = parseInt(moveEl.style.top.split("px")[0]);
      let oneWidth =
        moveEl.offsetWidth /
        (moveEl.style.gridColumnEnd - moveEl.style.gridColumnStart);
      let oneHeight = moveEl.offsetHeight;
      let moveToX =
        ((moveEl.style.gridColumnEnd - moveEl.style.gridColumnStart) / 2 +
          parseInt(
            moveEl.style.gridColumnStart == ""
              ? 0
              : moveEl.style.gridColumnStart
          ) -
          1) *
          (oneWidth + 5) +
        x;
      let moveToY =
        ((moveEl.style.gridRowEnd - moveEl.style.gridRowStart) / 2 +
          parseInt(
            moveEl.style.gridRowStart == "" ? 0 : moveEl.style.gridRowStart
          ) -
          1) *
          (oneHeight + 5) +
        y;
      console.log(x, y);
      console.log(moveToX, moveToY, oneWidth);
      console.log("移动到了第", Math.ceil(moveToY / (oneHeight + 5)), "行");
      console.log("中心点处于该行的", moveToY % (oneHeight + 5), "位置");
      let indexName = moveEl.className.split(" ")[1];
      let index = indexName.slice(5, indexName.length);
      console.log("滑动的是第", index, "个块");
      console.log(Math.ceil(moveToX / (oneWidth + 5)));
      // // eslint-disable-next-line no-debugger
      // debugger;
      if (moveToY % (oneHeight + 5) <= 20) {
        let newList = JSON.parse(JSON.stringify(this.dragList));
        for (let i = 0; i < newList.length; i++) {
          if (newList[i].startY >= Math.ceil(moveToY / (oneHeight + 5))) {
            newList[i].startY += 1;
            newList[i].endY += 1;
          }
        }
        newList[index].startY = Math.ceil(moveToY / (oneHeight + 5));
        newList[index].endY = Math.ceil(moveToY / (oneHeight + 5)) + 1;
        let temp = newList[index].endX - newList[index].startX;
        if (temp != 3) {
          newList[index].startX = Math.ceil(moveToX / (oneWidth + 5));
          newList[index].endX = newList[index].startX + temp;
        }
        this.tempList = newList;
      } else if (
        20 < moveToY % (oneHeight + 5) &&
        moveToY % (oneHeight + 5) < 80
      ) {
        console.log("就是想放到该行啊");
        console.log("移动的宽占多少");
        // this.tempList = this.dragList;
        let newList = JSON.parse(JSON.stringify(this.dragList));
        let temp = newList[index].endX - newList[index].startX;
        if (temp == 3) {
          let teArr = [];
          for (let i = 0; i < newList.length; i++) {
            if (newList[i].startY == Math.ceil(moveToY / (oneHeight + 5))) {
              teArr.push(newList[i]);
            }
          }
          if (teArr.length == 0) {
            newList[index].startY = Math.ceil(moveToY / (oneHeight + 5));
            newList[index].endY = Math.ceil(moveToY / (oneHeight + 5)) + 1;
            this.tempList = newList;
          } else {
            alert("这里不能放");
          }
        } else {
          console.log("两格系统");
          let teArr = [];
          for (let i = 0; i < newList.length; i++) {
            if (newList[i].startY == Math.ceil(moveToY / (oneHeight + 5))) {
              teArr.push(newList[i]);
            }
          }
          if (teArr.length == 0) {
            newList[index].startX = Math.ceil(moveToX / (oneWidth + 5));
            newList[index].endX = newList[index].startX + temp;
            newList[index].startY = Math.ceil(moveToY / (oneHeight + 5));
            newList[index].endY = Math.ceil(moveToY / (oneHeight + 5)) + 1;
            this.tempList = newList;
          } else {
            let newArr = [];
            newArr.push(Math.ceil(moveToX / (oneWidth + 5)));
            if (temp == 2) {
              newArr.push(Math.ceil(moveToX / (oneWidth + 5)) + 1);
            }
            let newArrB = [];
            for (let x = 0; x < teArr.length; x++) {
              newArrB.push(teArr[x].startX);
              if (teArr[x].endX - teArr[x].startX > 1) {
                for (let d = 1; d < teArr[x].endX - teArr[x].startX; d++) {
                  newArrB.push(d + teArr[x].startX);
                }
              }
            }
            console.log("最终对比：", newArr, newArrB);
            let flag = true;
            for (let q = 0; q < newArr.length; q++) {
              for (let w = 0; w < newArrB.length; w++) {
                if (newArr[q] == newArrB[w]) {
                  flag = false;
                }
              }
            }
            if (flag) {
              newList[index].startX = Math.ceil(moveToX / (oneWidth + 5));
              newList[index].endX = newList[index].startX + temp;
              newList[index].startY = Math.ceil(moveToY / (oneHeight + 5));
              newList[index].endY = Math.ceil(moveToY / (oneHeight + 5)) + 1;
            } else {
              alert("这里不能放");
            }
            this.tempList = newList;
            // alert("这里不能放");
          }
        }
      } else {
        console.log("这是要在该行下！方新增一行了啊");
        let newList = JSON.parse(JSON.stringify(this.dragList));
        for (let i = 0; i < newList.length; i++) {
          if (newList[i].startY > Math.ceil(moveToY / (oneHeight + 5))) {
            newList[i].startY += 1;
            newList[i].endY += 1;
          }
        }
        newList[index].startY = Math.ceil(moveToY / (oneHeight + 5)) + 1;
        newList[index].endY = Math.ceil(moveToY / (oneHeight + 5)) + 2;
        let temp = newList[index].endX - newList[index].startX;
        if (temp != 3) {
          newList[index].startX = Math.ceil(moveToX / (oneWidth + 5));
          newList[index].endX = newList[index].startX + temp;
        }
        this.tempList = newList;
      }
      moveEl.style.left = 0;
      moveEl.style.top = 0;
    },
  },
};
</script>
<style lang="scss" scoped>
.uni-drag-group {
  display: grid;
  gap: 5px 5px;
  justify-content: center;
  align-content: center;
  //   width: fit-content;

  position: relative;
  // grid-auto-rows: auto;
  // grid-auto-columns: auto;
  grid-template-columns: repeat(3, 33.33%);

  .drag-item {
    position: relative;
    width: var(--columnWidth);
    height: var(--rowHeight);
    line-height: var(--rowHeight);
    text-align: center;
    user-select: none;
  }
}
</style>
