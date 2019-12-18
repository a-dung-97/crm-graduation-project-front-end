
const receiptRouter = [
    {
        path: "receipt/index",
        name: "Phiếu nhập",
        component: () => import("@/views/goods/receipt/index"),
        meta: {
            title: "Phiếu nhập",
            icon: 'receipt'
        }
    },
    {
        path: "receipt/create",
        name: "Thêm mới phiếu nhập",
        component: () => import("@/views/goods/receipt/create"),
        hidden: true,
        meta: {
            title: "Thêm mới phiếu nhập",
        }
    },
    {
        path: "receipt/edit/:id",
        name: "Chỉnh sửa phiếu nhập",
        hidden: true,
        component: () => import("@/views/goods/receipt/edit"),
        meta: {
            title: "Chỉnh sửa phiếu nhập",
        }
    },
    {
        path: "receipt/show/:id",
        name: "Chi tiết phiếu nhập",
        hidden: true,
        component: () => import("@/views/goods/receipt/show"),
        meta: {
            title: "Chi tiết phiếu nhập",
        }
    },
]

export default receiptRouter