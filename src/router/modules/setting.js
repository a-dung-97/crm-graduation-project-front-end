import Layout from '@/layout';

const settingRouter = {
    path: "/setting",
    component: Layout,
    redirect: "/setting/catalog",
    name: "Cài đặt",
    meta: {
        title: "Cài đặt",
        icon: "setting",

    },
    alwaysShow: true,
    children: [
        {
            path: "catalog",
            name: "Danh mục",
            component: () => import("@/views/setting/catalog/index"),
            meta: {
                title: "Danh mục",
                icon: "catalog",
            }
        },
        {
            path: "lead-score-rule",
            name: "Quy tắc tính điểm",
            component: () => import("@/views/setting/lead-score-rule/index"),
            meta: {
                title: "Quy tắc tính điểm",
                icon: "rule",
            }
        },
    ]
}
export default settingRouter