import Customer from '@/layout/customer/Customer';
const customerRouters = {
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
}
export default customerRouters