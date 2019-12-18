import Layout from '@/layout';
import dynamicRouter from './dynamic';
const reportRouter = {
    path: "/report",
    component: Layout,
    name: "Báo cáo",
    alwaysShow: true,
    redirect: "/report/dynamic/index",
    meta: {
        title: "Báo cáo",
        icon: "report1"
    },
    children: [
        {
            path: "debt/index",
            name: "Báo cáo công nợ",
            component: () => import("@/views/report/debt/index"),
            meta: {
                title: "Báo cáo công nợ",
                icon: 'debt'
            }
        },
        ...dynamicRouter
    ]
}
export default reportRouter