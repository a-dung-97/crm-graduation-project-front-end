import Account from '@/layout/account/Account';
const accountRouter = {
    path: "/account",
    name: "Account",
    redirect: "/account/login",
    component: Account,
    hidden: true,
    children: [{
        path: "login",
        name: "login",
        component: () => import("@/views/account/login/index")
    },
    {
        path: "register",
        name: "register",
        component: () => import("@/views/account/register/index")
    },
    {
        path: "email-confirmation",
        name: "email-confirmation",
        component: () => import("@/views/account/email-confirmation/index"),
        props: true
    },
    {
        path: "organization-information",
        name: "organization-information",
        component: () =>
            import("@/views/account/organization-information/index")
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