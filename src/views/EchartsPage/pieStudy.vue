<template >
  <div>
    <div ref="gridContent" class="grid_group">
      <div
        v-for="(dragData, index) in dragList"
        :key="index"
        v-drag
        class="drag-item"
        :class="classObject[index]"
        onselectstart="return false;"
      >
        <div class="drag-data-div">这是{{ dragData.data }}数据</div>
      </div>
    </div>
  </div>
</template>
<script>
import _ from "lodash";
export default {
  name: "mapStudy",
  directives: {
    drag: {
      bind: function (el, binding, vnode) {
        const moveEl = el;
        // console.log(el);
        moveEl.onmousedown = (event) => {
          moveEl.style.boxShadow = "#e6e6e6 0 0 10px 10px";
          moveEl.style.zIndex = 100;
          vnode.context.dragStart(event);
          //获取点击的元素的当前位置
          const disX = event.clientX;
          const disY = event.clientY;
          vnode.context.fnMatchEvery(moveEl);
          document.onmousemove = (dEvent) => {
            //获取移动的距离
            let x = dEvent.clientX - disX;
            let y = dEvent.clientY - disY;
            //获取当前元素可移动的位置区域
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
            moveEl.style.zIndex = 100;
            vnode.context.changeBlock(moveEl);
            vnode.context.dragEnd(upEvent, vnode.context.dragList);
          };
        };
      },
    },
  },
  data() {
    return {
      column: 3,
      gridAreas: "",
      classObject: {},
      allRow: 0,
      oneWidth: 0,
      oneHeight: 0,
      tempData: [],
      dragDataList: [
        { type: "B", data: 1 },
        { type: "A", data: 2 },
        { type: "A", data: 3 },
        { type: "B", data: 4 },
        { type: "C", data: 5 },
        { type: "C", data: 6 },
        { type: "B", data: 7 },
        { type: "B", data: 8 },
        { type: "C", data: 9 },
      ],
      oldXY: { x: 0, y: 0 },
      dragList: [],
      tempDragList: [],
      type: "resort", //重排resort/替换replace
    };
  },
  mounted: function () {
    this.dragList = _.cloneDeep(this.dragDataList);
    this.fnDisman();
    this.joinGridArea();
  },
  methods: {
    //计算每一个块的位置
    fnMatchEvery(moveEl) {
      let typeName = moveEl.className.split(" ")[1];
      let type =
        typeName.slice(9, typeName.length) == "A"
          ? 3
          : typeName.slice(9, typeName.length) == "B"
          ? 2
          : typeName.slice(9, typeName.length) == "C"
          ? 1
          : null;
      let oneWidth = moveEl.offsetWidth / type;
      let oneHeight = moveEl.offsetHeight;
      this.oneWidth = moveEl.offsetWidth / type;
      this.oneHeight = moveEl.offsetHeight;
      let endData = JSON.parse(JSON.stringify(this.dragList));
      let isNew = true;
      let currentRow = 0;
      let temp = 0;
      for (let i = 0; i < endData.length; i++) {
        endData[i].index = i;
        endData[i].len =
          endData[i].type == "A"
            ? 3
            : endData[i].type == "B"
            ? 2
            : endData[i].type == "C"
            ? 1
            : null;
        if (isNew) {
          endData[i].currentRow = currentRow;
          endData[i].left = 0;
          endData[i].top = currentRow * (oneHeight + 5);
          endData[i].bottom = (currentRow + 1) * oneHeight + currentRow * 5;
          endData[i].right =
            endData[i].len * oneWidth + (endData[i].len - 1) * 5;
          if (endData[i].len < 3) {
            isNew = false;
            temp = endData[i].len;
          } else {
            isNew = true;
            currentRow += 1;
          }
        } else {
          if (temp + endData[i].len <= 3) {
            endData[i].currentRow = currentRow;
            endData[i].left = temp * oneWidth;
            if (temp > 0) {
              endData[i].right =
                temp * oneWidth +
                endData[i].len * oneWidth +
                (temp - 1) * 5 +
                (endData[i].len - 1) * 5;
            } else {
              endData[i].right =
                temp * oneWidth +
                endData[i].len * oneWidth +
                (endData[i].len - 1) * 5;
            }
            endData[i].top = currentRow * (oneHeight + 5);
            endData[i].bottom = (currentRow + 1) * (oneHeight + 5);
            if (temp + endData[i].len == 3) {
              isNew = true;
              currentRow += 1;
              temp = 0;
            } else {
              isNew = false;
              temp = temp + endData[i].len;
            }
          } else {
            endData[i].currentRow = currentRow + 1;
            currentRow += 1;
            endData[i].left = 0;
            endData[i].right =
              endData[i].len * oneWidth + (endData[i].len - 1) * 5;
            endData[i].top = currentRow * (oneHeight + 5);
            endData[i].bottom = (currentRow + 1) * (oneHeight + 5);
            if (endData[i].len < 3) {
              isNew = false;
              temp = endData[i].len;
            } else {
              isNew = true;
              currentRow += 1;
            }
          }
        }
      }
      this.allRow = endData[endData.length - 1].currentRow + 1;
      this.tempData = endData;
    },
    //拆出class
    fnDisman() {
      let Obj = {};
      for (let i = 0; i < this.dragList.length; i++) {
        let str = "drag-item" + this.dragList[i].type + " " + "index" + i;
        Obj[i] = str;
      }
      this.classObject = Obj;
    },
    // grid style拼接
    joinGridArea: function () {
      // console.log(this.dragList);
      const len = this.dragList.length;
      let areaStr = "";
      for (let i = 0; i < len; i++) {
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
      this.gridAreas = areaStr;
    },
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
    //拖拽结束时重排数据或者替换数据
    changeBlock: function (moveEl) {
      // 将方块移入到对应的区域中
      const { nowIndex, index } = this.getIndexOfMoveEL(moveEl);
      if (this.type === "replace") {
        const temp = this.dragList[index];
        this.$set(this.dragList, index, this.dragList[nowIndex]);
        this.$set(this.dragList, nowIndex, temp);
      } else {
        // console.log("最后了！！！", this.dragList);
        // console.log(this.dragList[index]);
        // console.log(this.dragList[nowIndex]);
        const temp = this.dragList[index];
        this.dragList.splice(index, 1);
        this.dragList.splice(nowIndex, 0, temp);
        this.fnDisman();
      }
      moveEl.style.left = 0;
      moveEl.style.top = 0;
    },
    // // 计算当前元素可移动的区域
    getRangeOfEl: function (moveEl) {
      let indexName = moveEl.className.split(" ")[2],
        _this = this;
      let index = indexName.slice(5, indexName.length);
      let currentData = _this.tempData[index];
      const res = {};
      res.minX = -currentData.left - 10;
      res.maxX = _this.oneWidth * 3 + 5 - currentData.right;
      res.minY = -currentData.top;
      res.maxY =
        _this.allRow * _this.oneHeight - currentData.bottom + _this.allRow * 5;
      return res;
    },
    getIndexOfMoveEL: function (moveEl) {
      let allData = this.tempData,
        nowIndex = null;
      const x = parseInt(moveEl.style.left.split("px")[0]);
      const y = parseInt(moveEl.style.top.split("px")[0]);
      let indexName = moveEl.className.split(" ")[2],
        _this = this;
      let index = indexName.slice(5, indexName.length);
      let currentData = _this.tempData[index];
      let moveToX = (currentData.left + currentData.right) / 2 + x;
      let moveToY = (currentData.top + currentData.bottom) / 2 + y;
      if (isNaN(moveToX)) {
        nowIndex = index;
      } else {
        //先判断到哪一行吧
        let row = moveToY / (this.oneHeight + 5);
        let newArr = [];
        for (let x = 0; x < allData.length; x++) {
          if (allData[x].currentRow == Math.ceil(row) - 1) {
            newArr.push(allData[x]);
          }
        }
        let currentNum = null, //覆盖块
          isBefore = true; //看滑动块在覆盖块的前还是后
        for (let c = 0; c < newArr.length; c++) {
          if (moveToX < (newArr[c].left + newArr[c].right) / 2) {
            isBefore = true;
            currentNum = c;
            break;
          } else {
            isBefore = false;
            currentNum = c;
          }
        }
        isBefore
          ? (nowIndex = newArr[currentNum].index)
          : (nowIndex = newArr[currentNum].index + 1);
        if (index < nowIndex) {
          nowIndex -= 1;
        }
      }
      return { nowIndex, index };
    },
  },
};
</script>
<style lang="less" scoped>
.grid_group {
  --columnWidth: "auto";
  --rowHeight: "auto";
  display: grid;
  grid-template-columns: repeat(3, 33.33%);
  grid-template-rows: auto;
  gap: 5px 5px;
  // grid-auto-flow: row dense;
  justify-content: center;
  align-content: center;
  // width: fit-content;
  width: 100%;
  position: relative;
  .drag-item {
    position: relative;
    background-color: gray;
    width: var(--columnWidth);
    height: var(--rowHeight);
    line-height: var(--rowHeight);
    text-align: center;
    user-select: none;
    .drag-data-div {
      color: #ffffff;
      width: 100px;
      height: 100px;
      line-height: 100px;
    }
  }
  .drag-itemA {
    grid-column: span 3;
  }
  .drag-itemB {
    grid-column: span 2;
  }
  .drag-itemC {
    grid-column: span 1;
  }
  // .drag-item4 {
  //   grid-row: 2 / span 2;
  // }
}
</style>