import Layout from '@/layout';
import activityRouter from './activity';
import opportunityRouter from './opportunity';
import quoteRouter from './quote';
import orderRouter from './order';
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
        ...activityRouter,
        ...opportunityRouter,
        ...quoteRouter,
        ...orderRouter,
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