import Layout from '@/layout';
import emailAutomationRouter from './email-automation';
const automationRouter = {
    path: "/automation",
    component: Layout,
    name: "Automation",
    alwaysShow: true,
    redirect: "/automation/email-automation/index",
    meta: {
        title: "Automation",
        icon: "automation"
    },
    children: [
        ...emailAutomationRouter,
    ]
}
export default automationRouter