
const productRouter = [
    {
        path: "product/index",
        name: "Sản phẩm",
        component: () => import("@/views/goods/product/index"),
        meta: {
            title: "Sản phẩm",
            icon: 'dashboard'
        }
    },
    {
        path: "product/create",
        name: "Thêm mới sản phẩm",
        component: () => import("@/views/goods/product/create"),
        hidden: true,
        meta: {
            title: "Thêm mới sản phẩm",
        }
    },
    {
        path: "product/edit/:id",
        name: "Chỉnh sửa sản phẩm",
        hidden: true,
        component: () => import("@/views/goods/product/edit"),
        meta: {
            title: "Chỉnh sửa sản phẩm",
        }
    },
    {
        path: "product/show/:id",
        name: "Chi tiết sản phẩm",
        hidden: true,
        component: () => import("@/views/goods/product/show"),
        meta: {
            title: "Chi tiết sản phẩm",
        }
    },
]

export default productRouter