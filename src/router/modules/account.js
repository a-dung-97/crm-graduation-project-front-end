import Account from '@/layout/account/Account';
const accountRouter = {
    path: "/account",
    name: "Tài khoản",
    redirect: "/account/login",
    component: Account,
    hidden: true,
    children: [{
        path: "login",
        name: "login",
        component: () => import("@/views/account/login/index"),
        meta: {
            title: "Đăng nhập",
        }
    },
    {
        path: "register",
        name: "register",
        component: () => import("@/views/account/register/index"),
        meta: {
            title: "Đăng ký",
        }
    },
    {
        path: "email-confirmation",
        name: "email-confirmation",
        component: () => import("@/views/account/email-confirmation/index"),
        props: true,
        meta: {
            title: "Xác nhận email",
        }
    },
    {
        path: "organization-information",
        name: "organization-information",
        component: () =>
            import("@/views/account/organization-information/index"),
        meta: {
            title: "Thông tin công ty",
        }
    },
    {
        path: "services",
        name: "services",
        component: () => import("@/views/account/services/index"),
        props: true
    }
    ]
}
export default accountRouter