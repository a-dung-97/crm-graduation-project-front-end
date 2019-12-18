
const quoteRouter = [
    {
        path: "quote/index",
        name: "Báo giá",
        component: () => import("@/views/business/quote/index"),
        meta: {
            title: "Báo giá",
            icon: 'quote'
        }
    },
    {
        path: "quote/create",
        name: "Thêm mới báo giá",
        component: () => import("@/views/business/quote/create"),
        hidden: true,
        props: true,
        meta: {
            title: "Thêm mới báo giá",
        }
    },
    {
        path: "quote/edit/:id",
        name: "Chỉnh sửa báo giá",
        hidden: true,
        component: () => import("@/views/business/quote/edit"),
        meta: {
            title: "Chỉnh sửa báo giá",
        }
    },
    {
        path: "quote/show/:id",
        name: "Chi tiết báo giá",
        hidden: true,
        component: () => import("@/views/business/quote/show"),
        meta: {
            title: "Chi tiết báo giá",
        }
    },
]

export default quoteRouter