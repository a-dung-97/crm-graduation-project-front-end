import Vue from "vue";
import Router from "vue-router";

Vue.use(Router);

import Layout from "@/layout";
import companyRouter from './modules/company';
import accountRouter from './modules/account';
import customerManagementRouter from './modules/customer/index';
import goodsRouter from './modules/goods/index';
import settingRouter from './modules/setting';
import businessRouter from './modules/business/index';
import accountingRouter from './modules/accounting/index';
import marketingRouter from './modules/marketing/index';
import reportRouter from './modules/report/index';
export const constantRoutes = [
    accountRouter,
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
        path: "/webform/generated",
        component: () => import("@/views/marketing/webform/generated"),
        hidden: true
    },
    {
        path: "/404",
        component: () => import("@/views/404"),
        hidden: true
    },
    {
        path: "/pdf/download",
        name: "pdf",
        component: () => import("@/views/pdf.vue"),
        hidden: true,
        props: true
    },

];

export const asyncRoutes = [
    companyRouter, goodsRouter, customerManagementRouter, businessRouter, accountingRouter, marketingRouter, settingRouter, reportRouter,
    { path: '*', redirect: '/404', hidden: true }
];
const createRouter = () =>
    new Router({
        mode: 'history',
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
