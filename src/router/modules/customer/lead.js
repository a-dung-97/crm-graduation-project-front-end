const leadRouter = [
    {
        path: "lead/index",
        name: "Tiềm năng",
        component: () => import("@/views/customer/lead/index"),
        meta: {
            title: "Tiềm năng",
            icon: 'dashboard'
        }
    },
    {
        path: "lead/create",
        name: "Thêm mới tiềm năng",
        component: () => import("@/views/customer/lead/create"),
        hidden: true,
        meta: {
            title: "Thêm mới tiềm năng",
        }
    },
    {
        path: "lead/edit/:id",
        name: "Chỉnh sửa tiềm năng",
        hidden: true,
        component: () => import("@/views/customer/lead/edit"),
        meta: {
            title: "Chỉnh sửa tiềm năng",
        }
    },
    {
        path: "lead/show/:id",
        name: "Chi tiết tiềm năng",
        hidden: true,
        component: () => import("@/views/customer/lead/show"),
        meta: {
            title: "Chi tiết tiềm năng",
        }
    },
    {
        path: "lead/convert/:id",
        name: "Chuyển đổi tiềm năng",
        hidden: true,
        component: () => import("@/views/customer/lead/convert"),
        meta: {
            title: "Chuyển đổi tiềm năng",
        }
    },
]

export default leadRouter