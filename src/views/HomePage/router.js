export default [
    {
        path: "/home",
        name: "home",
        component: () => import("@/views/HomePage/index.vue"),
        meta: {
            title: "首页"
        },
    }
]