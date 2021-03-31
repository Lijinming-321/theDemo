export default [
    {
        path: "/easyflow",
        name: "easyflow",
        // redirect: "/echarts/mapStudy",
        component: () => import("@/views/EasyPage/index.vue"),
        meta: {
            title: "拓扑图"
        },
    }
]