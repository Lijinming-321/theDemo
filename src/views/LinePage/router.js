export default [
    {
        path: "/linePage",
        name: "linePage",
        // redirect: "/echarts/mapStudy",
        component: () => import("@/views/LinePage/index.vue"),
        meta: {
            title: "leader-line画线"
        },
    }
]