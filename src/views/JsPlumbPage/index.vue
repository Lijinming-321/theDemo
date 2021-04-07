<!-- 首页 -->
<template>
  <div class="jsPlumb_page" id="jsPlumb_page">
    <div
      class="left_jsPlumb_page"
      ref="left_jsPlumb_page"
      id="left_jsPlumb_page"
    >
      <div
        v-for="(item, index) in exampleArr"
        :key="index"
        :class="item.type == 'a' ? 'exampleItem' : 'exampleItemB'"
        :id="item.name + item.id"
      >
        {{ item.name }}
      </div>
    </div>
    <div class="right_jsPlumb_page" id="right_jsPlumb_page">
      右
      <div
        v-for="(item, index) in rightData"
        :key="index"
        :class="item.className"
        :id="item.id"
        :style="{ left: item.left + 'px', top: item.top + 'px' }"
        @click="fnGetAll(item.id)"
      >
        {{ item.id }}
      </div>
    </div>
  </div>
</template>

<script>
import $ from "jquery";
// 需要注意的是，jquery-ui引入的时候，
// 直接写 import juqery-ui 没有效果，只能直接写到具体的方法
// 好处是需要引用的也只有两个  draggable  droppable
import "jquery-ui/ui/widgets/draggable";
import "jquery-ui/ui/widgets/droppable";
import "jquery-ui/ui/widgets/resizable";
// import jsPlumb from "../../components/ef/jsplumb";
export default {
  components: {},
  data() {
    return {
      jsPlumb: null,
      exampleArr: [
        { name: "one", id: 1, type: "a" },
        { name: "two", id: 2, type: "b" },
      ],
      num: 0,
      rightData: [],
      visoConfig: {
        baseStyle: {
          endpoint: [
            "Dot",
            {
              radius: 8,
              fill: "pink",
            },
          ], // 端点的形状
          // connectorStyle: {
          //   lineWidth: 2,
          //   strokeStyle: "#61B7CF",
          //   joinstyle: "round",
          //   fill: "#1e8151",
          //   outlineColor: "",
          //   outlineWidth: "",
          // }, // 连接线的颜色，大小样式
          // connectorHoverStyle: {
          //   lineWidth: 2,
          //   strokeStyle: "#1e8151",
          //   outlineWidth: 10,
          //   outlineColor: "#1e8151",
          // },
          paintStyle: {
            strokeStyle: "#1e8151",
            stroke: "#7AB02C",
            fill: "pink",
            fillStyle: "#1e8151",
            radius: 6,
            lineWidth: 2,
          }, // 端点的颜色样式
          // hoverPaintStyle: {
          //   outlineStroke: 'pink'
          // },
          hoverPaintStyle: { stroke: "blue" },
          isSource: true, // 是否可以拖动（作为连线起点）
          connector: [
            "Straight",
            // { stub: 10, gap: 10 },
            { gap: 10, cornerRadius: 0, alwaysRespectStubs: false },
          ], // 连接线的样式种类有[Bezier],[Flowchart],[StateMachine ],[Straight ]
          isTarget: true, // 是否可以放置（连线终点）
          maxConnections: -1, // 设置连接点最多可以连接几条线
          connectorOverlays: [
            [
              "Arrow",
              {
                width: 10,
                length: 10,
                location: 0,
                direction: -1,
              },
            ],
            [
              "Arrow",
              {
                width: 10,
                length: 10,
                location: 1,
              },
            ],
            // [
            //   "Custom",
            //   {

            //   }
            // ]
            // [
            //   "Custom",
            //   {
            //     create: function (component) {
            //       return $(
            //         "<select id='myDropDown'><option value='foo'>foo</option><option value='bar'>bar</option></select>"
            //       );
            //     },
            //     location: 0.5,
            //     id: "customOverlay",
            //   },
            // ],
            ["Label", { label: "foo", location: 0.25, id: "myLabel" }],
            [
              "Label",
              {
                label: "111",
                cssClass: "",
                labelStyle: {
                  color: "#1e8151",
                },
                events: {
                  click: function (labelOverlay, originalEvent) {
                    console.log(
                      "click on label overlay for :" + labelOverlay.component
                    );
                    console.log(labelOverlay);
                    console.log(originalEvent);
                  },
                },
              },
            ],
          ],
        },
      },
      visoConfigB: {
        baseStyle: {
          endpoint: [
            "Dot",
            {
              radius: 8,
              fill: "pink",
            },
          ], // 端点的形状
          paintStyle: {
            strokeStyle: "#1e8151",
            stroke: "#7AB02C",
            fill: "pink",
            fillStyle: "#1e8151",
            radius: 6,
            lineWidth: 2,
          }, // 端点的颜色样式
          // hoverPaintStyle: {
          //   outlineStroke: 'pink'
          // },
          hoverPaintStyle: { stroke: "blue" },
          isSource: true, // 是否可以拖动（作为连线起点）
          connector: [
            "Straight",
            // { stub: 10, gap: 10 },
            { gap: 10, cornerRadius: 0, alwaysRespectStubs: false },
          ], // 连接线的样式种类有[Bezier],[Flowchart],[StateMachine ],[Straight ]
          isTarget: true, // 是否可以放置（连线终点）
          maxConnections: -1, // 设置连接点最多可以连接几条线
          connectorOverlays: [
            [
              "Arrow",
              {
                width: 10,
                length: 10,
                location: 0,
                direction: -1,
              },
            ],
            [
              "Arrow",
              {
                width: 10,
                length: 10,
                location: 1,
              },
            ],
            // [
            //   "Custom",
            //   {

            //   }
            // ]
            [
              "Custom",
              {
                create: function (component) {
                  return $(
                    "<select id='myDropDown'><option value='foo'>foo</option><option value='bar'>bar</option></select>"
                  );
                },
                location: 0.5,
                id: "customOverlay",
              },
            ],
            ["Label", { label: "1111", location: 0.25, id: "myLabel" }],
          ],
        },
      },
    };
  },
  computed: {},
  watch: {},
  methods: {
    setPic() {
      console.log(this.$jsPlumb.draggable);
      let _this = this;
      $("#left_jsPlumb_page").children().draggable({
        helper: "clone",
        scope: "ss",
      });
      $("#right_jsPlumb_page").droppable({
        scope: "ss",
        drop: function (event, ui) {
          console.log(
            ui.draggable[0].className.indexOf("exampleItemB") == -1,
            "!!!!"
          );
          //   debugger;
          _this.dropNode(
            ui.draggable[0].className.indexOf("exampleItemB") == -1,
            ui.position
          );
        },
      });
    },
    fnGetAll(id) {
      console.log(this.$jsPlumb);
      this.jsPlumb.remove(id);
    },
    dropNode(template, position) {
      console.log("$$$", template);
      // position.left -= $("left_jsPlumb_page").outerWidth();
      position.id = this.num;
      position.generateId = this.num;
      this.num++;
      if (template) {
        let obj = {
          id: "right" + this.num,
          generateId: this.num,
          top: position.top,
          left: position.left - $("#left_jsPlumb_page").outerWidth(),
          className: "right_1",
        };
        this.rightData.push(obj);

        this.addDraggable(obj.id);
        // console.log("!@!@!@!@");
      } else {
        let obj = {
          id: "right" + this.num,
          generateId: this.num,
          top: position.top,
          left: position.left - $("#left_jsPlumb_page").outerWidth(),
          className: "right_2",
        };
        this.rightData.push(obj);
        this.addDraggableB(obj.id);
      }
      console.log("!@!@!@!@", this.$jsPlumb.getAllConnections());
      console.log(this.rightData);
      // var html = this.renderHtml(template, position);
      // console.log(html);
      // $("#right_jsPlumb_page").append(html);
    },
    addDraggable(id) {
      // console.log("页面刷新了么");
      let name = "#" + id;
      console.log(name);
      let _this = this;
      _this.$nextTick(() => {
        _this.$jsPlumb.draggable($("" + name), {
          containment: $("#right_jsPlumb_page"),
        });
        _this.setEnterPoint(id);
        _this.setExitPoint(id);
      });
    },
    addDraggableB(id) {
      let name = "#" + id;
      console.log(name);
      let _this = this;
      _this.$nextTick(() => {
        _this.$jsPlumb.draggable($("" + name), {
          containment: $("#right_jsPlumb_page"),
        });
      });
      _this.setEnterPointB(id);
      _this.setExitPointB(id);
    },
    setEnterPoint(id) {
      console.log("加点：", id);
      let _this = this;
      var config = this.getBaseNodeConfig();

      config.isSource = false;
      config.maxConnections = -1;
      console.log(config);
      let name = "#" + id;
      console.log(name);
      _this.$nextTick(() => {
        console.log("走可么");
        debugger;

        _this.jsPlumb.addEndpoint(
          $("" + name),
          {
            anchors: "Left",
            uuid: id,
          },
          config
        );
      });
    },
    setExitPoint(id, position) {
      let _this = this;
      var config = this.getBaseNodeConfig();

      config.isTarget = false;
      config.maxConnections = 1;
      let name = "#" + id;
      _this.$nextTick(() => {
        console.log("？？？？？");
        _this.jsPlumb.addEndpoint(
          id,
          {
            anchors: "Right",
            uuid: id + "-out",
          },
          config
        );
        console.log("!!!!");
      });
    },
    setEnterPointB(id) {
      let _this = this;
      var config = this.getBaseNodeConfigB();

      config.isSource = false;
      config.maxConnections = -1;
      console.log(config, "111");
      let name = "#" + id;
      console.log(name);
      _this.$nextTick(() => {
        _this.jsPlumb.addEndpoint(
          $("" + name),
          {
            anchors: "Left",
            uuid: id,
          },
          config
        );
      });
    },
    setExitPointB(id, position) {
      let _this = this;
      var config = this.getBaseNodeConfigB();

      config.isTarget = false;
      config.maxConnections = 1;
      let name = "#" + id;
      _this.$nextTick(() => {
        _this.jsPlumb.addEndpoint(
          id,
          {
            anchors: "Right",
            uuid: id + "-out",
          },
          config
        );
      });
    },
    getBaseNodeConfig() {
      return Object.assign({}, this.visoConfig.baseStyle);
    },
    getBaseNodeConfigB() {
      return Object.assign({}, this.visoConfigB.baseStyle);
    },
  },
  created() {},
  mounted() {
    console.log("啊啊啊");
    let _this = this;
    _this.jsPlumb = _this.$jsPlumb;
    _this.jsPlumb.ready(() => {
      _this.jsPlumb.getInstance({
        Container: "jsPlumb_page", //选择器id
      });
      _this.jsPlumb.importDefaults({
        ConnectionsDetachable: false,
      });
      _this.jsPlumb.bind("click", function (conn, originalEvent) {
        if (
          confirm(
            "Delete connection from " +
              conn.sourceId +
              " to " +
              conn.targetId +
              "?"
          )
        )
          console.log(_this.jsPlumb);
        _this.jsPlumb.deleteConnection(conn);
      });
      _this.jsPlumb.bind("connectionDetached", function (conn, originalEvent) {
        if (conn.sourceId == conn.targetId) {
          //自己连接自己时会自动取消连接
          _this.jsPlumb.deleteConnection(conn);
        } else {
          alert("删除连接从" + conn.sourceId + "到" + conn.targetId + "！");
        }
      });
      // this.$jsPlumb.bind("connection", function (connInfo, originalEvent) {
      //   if (connInfo.connection.sourceId == connInfo.connection.targetId) {
      //     alert("不能连接自己！", connInfo);
      //     return false;
      //     _this.$jsPlumb.deleteConnection(connInfo.connection);
      //     // return;
      //   } else {
      //     alert(
      //       "连接" +
      //         connInfo.connection.sourceId +
      //         ">>>>" +
      //         connInfo.connection.targetId
      //     );
      //   }
      // });
      _this.jsPlumb.bind("beforeDrop", function (conn) {
        if (conn.sourceId === conn.targetId) {
          return false;
        } else {
          return true;
        }
      });
      this.setPic();
    });
  },
  destroyed() {
    this.$jsPlumb.deleteEveryConnection();
    this.$jsPlumb.deleteEveryEndpoint();
  },
};
</script>
<style lang="less" scoped>
.jsPlumb_page {
  height: 100%;
  width: 100%;
  display: flex;
  position: relative;
  background-color: #ffffff;
  border-radius: 8px;
  .left_jsPlumb_page {
    width: 30%;
    height: 100%;
    border-right: 1px solid #9da3aa;
    display: flex;
    flex-direction: column;
    align-items: center;
    .exampleItem {
      margin-top: 10px;
      // position: absolute;
      width: 200px;
      height: 100px;
      border-radius: 8px;
      text-align: center;
      line-height: 100px;
      background-color: chocolate;
    }
    .exampleItemB {
      margin-top: 10px;
      // position: absolute;
      width: 200px;
      height: 100px;
      border-radius: 8px;
      text-align: center;
      line-height: 100px;
      background-color: rgb(30, 210, 90);
    }
  }
  .right_jsPlumb_page {
    width: 70%;
    height: 100%;
    position: relative;
    .right_1 {
      margin-top: 10px;
      display: inline-block;
      position: absolute;
      width: 200px;
      height: 100px;
      border-radius: 8px;
      text-align: center;
      line-height: 100px;
      background-color: chocolate;
      position: absolute;
      cursor: pointer;
    }
    .right_2 {
      margin-top: 10px;
      display: inline-block;
      position: absolute;
      width: 200px;
      height: 100px;
      border-radius: 8px;
      text-align: center;
      line-height: 100px;
      background-color: rgb(30, 210, 90);
      position: absolute;
      cursor: pointer;
    }
  }
}
</style>