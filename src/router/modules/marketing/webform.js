const webformRouter = [
    {
        path: "webform/index",
        name: "Webform",
        component: () => import("@/views/marketing/webform/index"),
        meta: {
            title: "Webform",
            icon: 'dashboard'
        }
    },
    {
        path: "webform/create",
        name: "Thêm mới webform",
        component: () => import("@/views/marketing/webform/create"),
        hidden: true,
        props: true,
        meta: {
            title: "Thêm mới webform",
        }
    },
    {
        path: "webform/edit/:id",
        name: "Chỉnh sửa webform",
        hidden: true,
        component: () => import("@/views/marketing/webform/edit"),
        meta: {
            title: "Chỉnh sửa webform",
        }
    },
    {
        path: "webform/show/:id",
        name: "Chi tiết webform",
        hidden: true,
        component: () => import("@/views/marketing/webform/show"),
        meta: {
            title: "Chi tiết webform",
        }
    },
]

export default webformRouter