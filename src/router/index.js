import Vue from "vue";
import Router from "vue-router";

Vue.use(Router);

import Layout from "@/layout";
import companyRouters from './modules/company';
import customerRouters from './modules/customer';
import goodsRouter from './modules/goods/goods';
export const constantRoutes = [
    customerRouters,
    {
        path: "/",
        component: Layout,
        redirect: "/home",
        children: [{
            path: "home",
            name: "Trang chủ",
            component: () => import("@/views/dashboard/index"),
            meta: {
                title: "Trang chủ",
                icon: "dashboard",
            }
        }]
    },
    {
        path: '/profile',
        component: Layout,
        redirect: '/profile/index',
        hidden: true,
        children: [
            {
                path: 'index',
                component: () => import('@/views/profile/index'),
                name: 'Thông tin người dùng',
                meta: { title: 'Thông tin người dùng', icon: 'user' }
            }
        ]
    },
    {
        path: "/404",
        component: () => import("@/views/404"),
        hidden: true
    }
];

export const asyncRoutes = [
    companyRouters, goodsRouter,
    { path: '*', redirect: '/404', hidden: true }
];
const createRouter = () =>
    new Router({
        scrollBehavior: () => ({
            y: 0
        }),
        routes: constantRoutes
    });
const router = createRouter();
export function resetRouter() {
    const newRouter = createRouter();
    router.matcher = newRouter.matcher; // reset router
}

export default router;
