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
        class="exampleItem"
        :id="item.name + item.id"
      >
        {{ item.name }}
      </div>
    </div>
    <div class="right_jsPlumb_page" id="right_jsPlumb_page">
      右
      <div class="aaa"></div>
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
        { name: "one", id: 1 },
        // { name: "two", id: 2 },
      ],
      num: 0,
      visoConfig: {
        baseStyle: {
          endpoint: [
            "Dot",
            {
              radius: 8,
              fill: "pink",
            },
          ], // 端点的形状
          connectorStyle: {
            lineWidth: 2,
            strokeStyle: "#61B7CF",
            joinstyle: "round",
            fill: "pink",
            outlineColor: "",
            outlineWidth: "",
          }, // 连接线的颜色，大小样式
          connectorHoverStyle: {
            lineWidth: 2,
            strokeStyle: "red",
            outlineWidth: 10,
            outlineColor: "",
          },
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
            "Flowchart",
            { gap: 10, cornerRadius: 5, alwaysRespectStubs: true },
          ], // 连接线的样式种类有[Bezier],[Flowchart],[StateMachine ],[Straight ]
          isTarget: true, // 是否可以放置（连线终点）
          maxConnections: -1, // 设置连接点最多可以连接几条线
          connectorOverlays: [
            [
              "Arrow",
              {
                width: 10,
                length: 10,
                location: 1,
              },
            ],
            [
              "Arrow",
              {
                width: 10,
                length: 10,
                location: 0.2,
              },
            ],
            [
              "Arrow",
              {
                width: 10,
                length: 10,
                location: 0.7,
              },
            ],
            [
              "Label",
              {
                label: "",
                cssClass: "",
                labelStyle: {
                  color: "red",
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
    };
  },
  computed: {},
  watch: {},
  methods: {
    setPic() {
      console.log(this.jsPlumb.draggable);
      let _this = this;
      $("#left_jsPlumb_page").children().draggable({
        helper: "clone",
        scope: "ss",
      });
      $("#right_jsPlumb_page").droppable({
        scope: "ss",
        drop: function (event, ui) {
          console.log(ui, "!!!!");
          //   debugger;
          _this.dropNode("tpl-audio", ui.position);
        },
      });
    },
    renderHtml(type, position) {
      // console.log($("#" + type).html(), position);
      let num = this.num;
      let a = `<div 
        class="aaa"
        :id="${position.id}"
        :style="top:${position.top}"
      >
        111
      </div>`;
      return a;
    },
    dropNode(template, position) {
      position.left -= $("left_jsPlumb_page").outerWidth();
      position.id = this.num;
      position.generateId = this.num;
      this.num++;
      var html = this.renderHtml(template, position);
      console.log(html);
      $("#right_jsPlumb_page").append(html);

      this.initSetNode(template, position.id);
    },
    initSetNode(template, id) {
      console.log(id);
      // debugger;
      this.addDraggable(id);

      // if (template === 'tpl-audio') {
      // this.setEnterPoint(id);
      // this.setExitPoint(id);
      // } else if (template === 'tpl-menu') {
      //   setEnterPoint(id + '-heading')
      //   setExitMenuItem(id)
      // }
    },
    addDraggable(id) {
      jsPlumb.draggable(id, {
        containment: "parent",
      });
    },
    setEnterPoint(id) {
      var config = this.getBaseNodeConfig();

      config.isSource = false;
      config.maxConnections = -1;
      console.log(config);
      jsPlumb.addEndpoint(
        id,
        {
          anchors: "Top",
          uuid: id,
        },
        config
      );
    },
    getBaseNodeConfig() {
      return Object.assign({}, this.visoConfig.baseStyle);
    },
  },
  created() {
    this.jsPlumb = this.$jsPlumb.getInstance({
      Container: "jsPlumb_page", //选择器id
      EndpointStyle: { radius: 4, fill: "#acd" }, //端点样式
      PaintStyle: { stroke: "#fafafa", strokeWidth: 3 }, // 绘画样式，默认8px线宽  #456
      HoverPaintStyle: { stroke: "#1E90FF" }, // 默认悬停样式  默认为null
      EndpointHoverStyle: { fill: "#F00", radius: 6 }, // 端点悬停样式
      ConnectionOverlays: [
        //连线上的默认样式  这里是箭头
        [
          "Arrow",
          {
            location: 1,
            paintStyle: {
              stroke: "#00688B",
              fill: "#00688B",
            },
          },
        ],
      ],
      Connector: ["Straight", { gap: 1 }], //要使用的默认连接器的类型：折线，流程等
    });
  },
  mounted() {
    this.setPic();
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
      position: absolute;
      width: 200px;
      height: 100px;
      border-radius: 8px;
      text-align: center;
      line-height: 100px;
      background-color: chocolate;
    }
  }
  .right_jsPlumb_page {
    width: 70%;
    height: 100%;
    position: relative;
    .aaa {
      margin-top: 10px;
      display: inline-block;
      position: absolute;
      width: 200px;
      height: 100px;
      border-radius: 8px;
      text-align: center;
      line-height: 100px;
      background-color: chocolate;
    }
  }
}
</style>