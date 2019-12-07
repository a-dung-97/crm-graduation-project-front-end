import Layout from '@/layout';
import emailTemplateRouter from './email-template';
import emailCampaignRouter from './email-campaign';
const marketingRouter = {
    path: "/marketing",
    component: Layout,
    name: "Marketing",
    alwaysShow: true,
    redirect: "/marketing/mailing-list/index",
    meta: {
        title: "Marketing",
        icon: "dashboard"
    },
    children: [
        {
            path: "mailing-list/index",
            name: "Danh sách email",
            component: () => import("@/views/marketing/mailing-list/index"),
            meta: {
                title: "Danh sách email",
                icon: 'dashboard'
            }
        },
        ...emailTemplateRouter,
        ...emailCampaignRouter
    ]
}
export default marketingRouter