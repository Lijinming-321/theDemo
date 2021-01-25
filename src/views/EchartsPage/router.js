export default [
    {
        path: "/echarts",
        name: "echarts",
        // redirect: "/echarts/mapStudy",
        component: () => import("@/views/EchartsPage/index.vue"),
        meta: {
            title: "地图"
        },
        children: [
            {
                path: '/echarts/mapStudy',
                name: "/echarts/mapStudy",
                component: () => import("@/views/EchartsPage/mapStudy.vue"),
                meta: {
                    title: "地图"
                },
            },
            {
                path: '/echarts/pieStudy',
                name: "/echarts/pieStudy",
                component: () => import("@/views/EchartsPage/pieStudy.vue"),
                meta: {
                    title: "地图"
                },
            },
        ]
    }
]