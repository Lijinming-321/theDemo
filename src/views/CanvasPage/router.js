export default [
    {
        path: "/canvasPage",
        name: "canvasPage",
        // redirect: "/echarts/mapStudy",
        component: () => import("@/views/CanvasPage/index.vue"),
        meta: {
            title: "canvas画图"
        },
    }
]