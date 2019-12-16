
const dynamicRouter = [
    {
        path: "dynamic/index",
        name: "Báo cáo động",
        component: () => import("@/views/report/dynamic/index"),
        meta: {
            title: "Báo cáo động",
            icon: 'dashboard'
        }
    },
    {
        path: "dynamic/show/:id",
        name: "Chi tiết báo cáo",
        hidden: true,
        component: () => import("@/views/report/dynamic/show"),
        meta: {
            title: "Chi tiết báo cáo",
        }
    },
]

export default dynamicRouter