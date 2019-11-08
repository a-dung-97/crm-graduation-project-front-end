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
    ]
}
export default settingRouter