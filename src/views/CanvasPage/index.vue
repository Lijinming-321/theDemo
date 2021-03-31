<template >
  <div class="m_login_page">
    <canvas
      ref="canvasImg"
      width="400"
      height="400"
      style="border: 1px solid black"
    ></canvas>
  </div>
</template>
<script>
export default {
  name: "Login",
  data() {
    return {};
  },
  mounted() {
    this.fnSetCanvas();
  },
  methods: {
    fnSetCanvas() {
      let cav = this.$refs.canvasImg;
      console.log(cav);
      let ctx = cav.getContext("2d");
      let getPixelRatio = function (context) {
        let backingStore =
          ctx.backingStorePixelRatio ||
          ctx.webkitBackingStorePixelRatio ||
          ctx.mozBackingStorePixelRatio ||
          ctx.msBackingStorePixelRatio ||
          ctx.oBackingStorePixelRatio ||
          ctx.backingStorePixelRatio ||
          1;
        return (window.devicePixelRatio || 1) / backingStore;
      };
      let ratio = getPixelRatio(ctx);
      cav.style.width = cav.width + "px";
      cav.style.height = cav.height + "px";
      cav.width = cav.width * ratio;
      cav.height = cav.height * ratio;
      this.drawPolyArrow(ctx, 100, 20, 100, 100, 222, 100, 30, 30, 4, "#f36");
      //   this.drawStraightArrow(ctx, 200, 200, 200, 300, 30, 30, 4, "#f36");
      // 线条的颜色
      ctx.font = "12px Georgia"; //一倍屏下18px字体
      ctx.fillText("我是清晰的文字", 115 * ratio, 95 * ratio); // 坐标位置乘以像素比
    },
    drawPolyArrow(
      ctx,
      fromX,
      fromY,
      centerX,
      centerY,
      toX,
      toY,
      theta,
      headlen,
      width,
      color
    ) {
      theta = typeof theta != "undefined" ? theta : 30;
      headlen = typeof theta != "undefined" ? headlen : 10;
      width = typeof width != "undefined" ? width : 1;
      color = typeof color != "color" ? color : "#000";

      let angle =
          (Math.atan2(fromY - centerY, fromX - centerX) * 180) / Math.PI,
        angle1 = ((angle + theta) * Math.PI) / 180,
        angle2 = ((angle - theta) * Math.PI) / 180,
        topX = headlen * Math.cos(angle1),
        topY = headlen * Math.sin(angle1),
        botX = headlen * Math.cos(angle2),
        botY = headlen * Math.sin(angle2);

      ctx.save();
      ctx.beginPath();

      let arrowX = fromX - topX,
        arrowY = fromY - topY;
      ctx.moveTo(arrowX, arrowY);
      ctx.lineTo(fromX, fromY);
      arrowX = fromX - botX;
      arrowY = fromY - botY;
      ctx.lineTo(arrowX, arrowY);
      ctx.moveTo(fromX, fromY);
      //   ctx.lineTo(toX, toY);

      ctx.lineTo(centerX, centerY);
      ctx.lineTo(toX, toY);
      let demon = (Math.atan2(centerY - toY, centerX - toX) * 180) / Math.PI,
        demon1 = ((demon + theta) * Math.PI) / 180,
        demon2 = ((demon - theta) * Math.PI) / 180,
        ttX = headlen * Math.cos(demon1),
        ttY = headlen * Math.sin(demon1),
        bbX = headlen * Math.cos(demon2),
        bbY = headlen * Math.sin(demon2);
      // Reverse length on the other side
      arrowX = toX + ttX;
      arrowY = toY + ttY;
      ctx.moveTo(arrowX, arrowY);
      ctx.lineTo(toX, toY);
      arrowX = toX + bbX;
      arrowY = toY + bbY;
      ctx.lineTo(arrowX, arrowY);
      ctx.strokeStyle = color;
      ctx.lineWidth = width;
      ctx.stroke();
      ctx.restore();
    },
    drawStraightArrow(
      ctx,
      fromX,
      fromY,
      toX,
      toY,
      theta,
      headlen,
      width,
      color
    ) {
      theta = typeof theta != "undefined" ? theta : 30;
      headlen = typeof theta != "undefined" ? headlen : 10;
      width = typeof width != "undefined" ? width : 1;
      color = typeof color != "color" ? color : "#000";

      var angle = (Math.atan2(fromY - toY, fromX - toX) * 180) / Math.PI,
        angle1 = ((angle + theta) * Math.PI) / 180,
        angle2 = ((angle - theta) * Math.PI) / 180,
        topX = headlen * Math.cos(angle1),
        topY = headlen * Math.sin(angle1),
        botX = headlen * Math.cos(angle2),
        botY = headlen * Math.sin(angle2);

      ctx.save();
      ctx.beginPath();

      var arrowX = fromX - topX,
        arrowY = fromY - topY;
      ctx.moveTo(arrowX, arrowY);
      ctx.lineTo(fromX, fromY);
      arrowX = fromX - botX;
      arrowY = fromY - botY;
      ctx.lineTo(arrowX, arrowY);
      ctx.moveTo(fromX, fromY);
      ctx.lineTo(toX, toY);

      // Reverse length on the other side
      arrowX = toX + topX;
      arrowY = toY + topY;
      ctx.moveTo(arrowX, arrowY);
      ctx.lineTo(toX, toY);
      arrowX = toX + botX;
      arrowY = toY + botY;
      ctx.lineTo(arrowX, arrowY);
      ctx.strokeStyle = color;
      ctx.lineWidth = width;
      ctx.stroke();
      ctx.restore();
    },
  },
};
</script>
<style lang="less" scoped>
.m_login_page {
  height: 100%;
  width: 100%;
  display: flex;
}
</style>