
const issueRouter = [
    {
        path: "issue/index",
        name: "Phiếu xuất",
        component: () => import("@/views/goods/issue/index"),
        meta: {
            title: "Phiếu xuất",
            icon: 'dashboard'
        }
    },
    {
        path: "issue/create",
        name: "Thêm mới phiếu xuất",
        component: () => import("@/views/goods/issue/create"),
        hidden: true,
        meta: {
            title: "Thêm mới phiếu xuất",
        }
    },
    {
        path: "issue/edit/:id",
        name: "Chỉnh sửa phiếu xuất",
        hidden: true,
        component: () => import("@/views/goods/issue/edit"),
        meta: {
            title: "Chỉnh sửa phiếu xuất",
        }
    },
    {
        path: "issue/show/:id",
        name: "Chi tiết phiếu xuất",
        hidden: true,
        component: () => import("@/views/goods/issue/show"),
        meta: {
            title: "Chi tiết phiếu xuất",
        }
    },
]

export default issueRouter