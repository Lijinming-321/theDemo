import Vue from 'vue';
import VueRouter from 'vue-router';
import HomeRouter from "@/views/HomePage/router.js";
import LoginRouter from "@/views/LoginPage/router.js";
import OverviewRouter from "@/views/OverviewPage/router.js";
import EchartsRouter from "@/views/EchartsPage/router.js";
import EasyRouter from "@/views/EasyPage/router.js";
import CanvasRouter from "@/views/CanvasPage/router.js";
import LineRouter from "@/views/LinePage/router.js";
import OrderRouter from "@/views/OrderPage/router.js"
import SvgRouter from "@/views/SvgPage/router.js"
Vue.use(VueRouter)

const routes = [{
    path: '/',
},
...HomeRouter,
...LoginRouter,
...OverviewRouter,
...EchartsRouter,
...EasyRouter,
...CanvasRouter,
...LineRouter,
...OrderRouter,
...SvgRouter
]


const router = new VueRouter({
    mode: 'history',
    base: process.env.BASE_URL,
    routes
});
//解决 点击同一路由报错问题
const originalPush = VueRouter.prototype.push
VueRouter.prototype.push = function push(location) {
    return originalPush.call(this, location).catch(err => err)
}
router.beforeEach((to, from, next) => {
    to.meta.title && (document.title = to.meta.title);
    localStorage.setItem('path', from.path)
    next();


});
export default router;