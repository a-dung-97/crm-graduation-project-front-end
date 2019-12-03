
const orderRouter = [
    {
        path: "order/index",
        name: "Đơn hàng",
        component: () => import("@/views/business/order/index"),
        meta: {
            title: "Đơn hàng",
            icon: 'dashboard'
        }
    },
    {
        path: "order/create",
        name: "Thêm mới đơn hàng",
        component: () => import("@/views/business/order/create"),
        hidden: true,
        props: true,
        meta: {
            title: "Thêm mới đơn hàng",
        }
    },
    {
        path: "order/edit/:id",
        name: "Chỉnh sửa đơn hàng",
        hidden: true,
        component: () => import("@/views/business/order/edit"),
        meta: {
            title: "Chỉnh sửa đơn hàng",
        }
    },
    {
        path: "order/show/:id",
        name: "Chi tiết đơn hàng",
        hidden: true,
        component: () => import("@/views/business/order/show"),
        meta: {
            title: "Chi tiết đơn hàng",
        }
    },
]

export default orderRouter