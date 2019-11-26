const opportunityRouter = [
    {
        path: "opportunity/index",
        name: "Cơ hội",
        component: () => import("@/views/business/opportunity/index"),
        meta: {
            title: "Cơ hội",
            icon: 'dashboard'
        }
    },
    {
        path: "opportunity/create",
        name: "Thêm mới cơ hội",
        component: () => import("@/views/business/opportunity/create"),
        hidden: true,
        meta: {
            title: "Thêm mới cơ hội",
        }
    },
    {
        path: "opportunity/edit/:id",
        name: "Chỉnh sửa cơ hội",
        hidden: true,
        component: () => import("@/views/business/opportunity/edit"),
        meta: {
            title: "Chỉnh sửa cơ hội",
        }
    },
    {
        path: "opportunity/show/:id",
        name: "Chi tiết cơ hội",
        hidden: true,
        component: () => import("@/views/business/opportunity/show"),
        meta: {
            title: "Chi tiết cơ hội",
        }
    },
]

export default opportunityRouter