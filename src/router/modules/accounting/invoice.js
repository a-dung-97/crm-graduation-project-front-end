const invoiceRouter = [
    {
        path: "invoice/index",
        name: "Hóa đơn",
        component: () => import("@/views/accounting/invoice/index"),
        meta: {
            title: "Hóa đơn",
            icon: 'dashboard'
        }
    },
    {
        path: "invoice/create",
        name: "Thêm mới hóa đơn",
        component: () => import("@/views/accounting/invoice/create"),
        hidden: true,
        props: true,
        meta: {
            title: "Thêm mới hóa đơn",
        }
    },
    {
        path: "invoice/edit/:id",
        name: "Chỉnh sửa hóa đơn",
        hidden: true,
        component: () => import("@/views/accounting/invoice/edit"),
        meta: {
            title: "Chỉnh sửa hóa đơn",
        }
    },
    {
        path: "invoice/show/:id",
        name: "Chi tiết hóa đơn",
        hidden: true,
        component: () => import("@/views/accounting/invoice/show"),
        meta: {
            title: "Chi tiết hóa đơn",
        }
    },
]

export default invoiceRouter