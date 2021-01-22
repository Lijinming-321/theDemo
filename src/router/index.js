import Vue from 'vue';
import VueRouter from 'vue-router';
import HomeRouter from "@/views/HomePage/router.js";
import LoginRouter from "@/views/LoginPage/router.js";
Vue.use(VueRouter)

const routes = [{
    path: '/',
    redirect: "/login"
},
...HomeRouter,
...LoginRouter
]


const router = new VueRouter({
    mode: 'history',
    base: process.env.BASE_URL,
    routes
});

export default router;