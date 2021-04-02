export default [
    {
        path: "/jsplumbPage",
        name: "jsplumbPage",
        component: () => import("@/views/JsPlumbPage/index.vue"),
        meta: {
            title: "jsPlumb绘制"
        }
    }
]