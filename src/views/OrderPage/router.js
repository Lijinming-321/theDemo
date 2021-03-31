export default [
    {
        path: "/orderPage",
        name: "orderPage",
        // redirect: "/echarts/mapStudy",
        component: () => import("@/views/OrderPage/index.vue"),
        meta: {
            title: "下单页"
        },
    }
]