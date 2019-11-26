import Layout from '@/layout';

const settingRouter = {
    path: "/setting",
    component: Layout,
    redirect: "/setting/catalog",
    meta: {
        title: "Cài đặt",
        icon: "dashboard",

    },
    alwaysShow: true,
    children: [
        {
            path: "catalog",
            name: "Danh mục",
            component: () => import("@/views/setting/catalog/index"),
            meta: {
                title: "Danh mục",
                icon: "dashboard",
            }
        },
        {
            path: "lead-score-rule",
            name: "Quy tắc tính điểm",
            component: () => import("@/views/setting/lead-score-rule/index"),
            meta: {
                title: "Quy tắc tính điểm",
                icon: "dashboard",
            }
        },
    ]
}
export default settingRouter