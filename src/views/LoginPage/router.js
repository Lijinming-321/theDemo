export default [
    {
        path: "/login",
        name: "login",
        component: () => import("@/views/LoginPage/index.vue"),
        meta: {
            title: "登录"
        }
    }
]