import Vue from "vue";
import Router from "vue-router";

Vue.use(Router);

import Layout from "@/layout";
import Customer from "@/layout/customer/Customer";

export const constantRoutes = [{
    path: "/customer",
    name: "Customer",
    redirect: "/customer/login",
    component: Customer,
    hidden: true,
    children: [{
        path: "login",
        name: "login",
        component: () => import("@/views/customer/login/index")
    },
    {
        path: "register",
        name: "register",
        component: () => import("@/views/customer/register/index")
    },
    {
        path: "email-confirmation",
        name: "email-confirmation",
        component: () => import("@/views/customer/email-confirmation/index"),
        props: true
    },
    {
        path: "organization-information",
        name: "organization-information",
        component: () =>
            import("@/views/customer/organization-information/index")
    },
    {
        path: "services",
        name: "services",
        component: () => import("@/views/customer/services/index"),
        props: true
    }
    ]
},

{
    path: "/",
    component: Layout,
    redirect: "/dashboard",
    children: [{
        path: "dashboard",
        name: "Dashboard",
        component: () => import("@/views/dashboard/index"),
        meta: {
            title: "Dashboard",
            icon: "dashboard",
        }
    }]
},

{
    path: "/404",
    component: () => import("@/views/404"),
    hidden: true
}
];

export const asyncRoutes = [];
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
