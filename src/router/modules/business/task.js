const taskRouter = [
    {
        path: "task/index",
        name: "Công việc",
        component: () => import("@/views/business/task/index"),
        meta: {
            title: "Công việc",
            icon: 'dashboard'
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
]

export default taskRouter