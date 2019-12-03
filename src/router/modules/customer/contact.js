const contactRouter = [
    {
        path: "contact/index",
        name: "Liên hệ",
        component: () => import("@/views/customer/contact/index"),
        meta: {
            title: "Liên hệ",
            icon: 'dashboard'
        }
    },
    {
        path: "contact/create",
        name: "Thêm mới liên hệ",
        component: () => import("@/views/customer/contact/create"),
        hidden: true,
        meta: {
            title: "Thêm mới liên hệ",
        }
    },
    {
        path: "contact/edit/:id",
        name: "Chỉnh sửa liên hệ",
        hidden: true,
        component: () => import("@/views/customer/contact/edit"),
        meta: {
            title: "Chỉnh sửa liên hệ",
        }
    },
    {
        path: "contact/show/:id",
        name: "Chi tiết liên hệ",
        hidden: true,
        component: () => import("@/views/customer/contact/show"),
        meta: {
            title: "Chi tiết liên hệ",
        }
    },
]

export default contactRouter