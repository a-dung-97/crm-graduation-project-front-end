import Layout from '@/layout';
import taskRouter from './task';
const businessRouter = {
    path: "/business",
    component: Layout,
    name: "Kinh doanh",
    alwaysShow: true,
    redirect: "/business/task/index",
    meta: {
        title: "Kinh doanh",
        icon: "dashboard"
    },
    children: [
        ...taskRouter,
        {
            path: "note/index",
            name: "Ghi chú",
            component: () => import("@/views/business/note/index"),
            meta: {
                title: "Ghi chú",
                icon: 'dashboard'
            }
        },
    ]
}
export default businessRouter