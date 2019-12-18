import Layout from '@/layout';
import emailTemplateRouter from './email-template';
import emailCampaignRouter from './email-campaign';
import webformRouter from './webform';
const marketingRouter = {
    path: "/marketing",
    component: Layout,
    name: "Marketing",
    alwaysShow: true,
    redirect: "/marketing/mailing-list/index",
    meta: {
        title: "Marketing",
        icon: "marketing"
    },
    children: [
        {
            path: "mailing-list/index",
            name: "Danh sách email",
            component: () => import("@/views/marketing/mailing-list/index"),
            meta: {
                title: "Danh sách email",
                icon: 'group-user'
            }
        },
        ...emailTemplateRouter,
        ...emailCampaignRouter,
        ...webformRouter
    ]
}
export default marketingRouter