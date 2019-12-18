const activityRouter = [
    {
        path: "task/index",
        name: "Công việc",
        component: () => import("@/views/business/task/index"),
        meta: {
            title: "Công việc",
            icon: 'task'
        }
    },
    {
        path: "task/create",
        name: "Thêm mới công việc",
        component: () => import("@/views/business/task/create"),
        hidden: true,
        meta: {
            title: "Thêm mới công việc",
        }
    },
    {
        path: "task/edit/:id",
        name: "Chỉnh sửa công việc",
        hidden: true,
        component: () => import("@/views/business/task/edit"),
        meta: {
            title: "Chỉnh sửa công việc",
        }
    },
    {
        path: "task/show/:id",
        name: "Chi tiết công việc",
        hidden: true,
        component: () => import("@/views/business/task/show"),
        meta: {
            title: "Chi tiết công việc",
        }
    },
    {
        path: "call/show/:id",
        name: "Chi tiết cuộc gọi",
        hidden: true,
        component: () => import("@/views/business/call/show"),
        meta: {
            title: "Chi tiết cuộc gọi",
        }
    },
    {
        path: "appointment/show/:id",
        name: "Chi tiết cuộc hẹn",
        hidden: true,
        component: () => import("@/views/business/appointment/show"),
        meta: {
            title: "Chi tiết cuộc hẹn",
        }
    },
]

export default activityRouter