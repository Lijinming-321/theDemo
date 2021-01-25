export default [
    {
        path: "/roles",
        name: "roles",
        component: () => import("@/views/OverviewPage/index.vue"),
        meta: {
            title: "规则"
        }
    }
]