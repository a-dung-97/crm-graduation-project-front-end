const customerRouter = [
    {
        path: "customer/index",
        name: "Khách hàng",
        component: () => import("@/views/customer/customer/index"),
        meta: {
            title: "Khách hàng",
            icon: 'dashboard'
        }
    },
    {
        path: "customer/create",
        name: "Thêm mới khách hàng",
        component: () => import("@/views/customer/customer/create"),
        hidden: true,
        meta: {
            title: "Thêm mới khách hàng",
        }
    },
    {
        path: "customer/edit/:id",
        name: "Chỉnh sửa khách hàng",
        hidden: true,
        component: () => import("@/views/customer/customer/edit"),
        meta: {
            title: "Chỉnh sửa khách hàng",
        }
    },
    {
        path: "customer/show/:id",
        name: "Chi tiết khách hàng",
        hidden: true,
        component: () => import("@/views/customer/customer/show"),
        meta: {
            title: "Chi tiết khách hàng",
        }
    },
]

export default customerRouter