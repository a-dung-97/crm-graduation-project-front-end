const emailTemplateRouter = [
    {
        path: "email-template/index",
        name: "Mẫu Email",
        component: () => import("@/views/marketing/email-template"),
        meta: {
            title: "Mẫu Email",
            icon: 'dashboard'
        }
    },
    {
        path: "email-template/create",
        name: "Thêm mới mẫu email",
        component: () => import("@/views/marketing/email-template/create"),
        hidden: true,
        meta: {
            title: "Thêm mới mẫu email",
        }
    },
    {
        path: "email-template/edit/:id",
        name: "Chỉnh sửa mẫu email",
        hidden: true,
        component: () => import("@/views/marketing/email-template/edit"),
        meta: {
            title: "Chỉnh sửa mẫu email",
        }
    },
]

export default emailTemplateRouter