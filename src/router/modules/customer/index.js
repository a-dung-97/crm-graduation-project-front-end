import Layout from '@/layout';
import leadRouter from './lead';
const customerRouter = {
    path: "/customer",
    component: Layout,
    name: "Quản lý khách hàng",
    alwaysShow: true,
    redirect: "/customer/lead/index",
    meta: {
        title: "Quản lý khách hàng",
        icon: "dashboard"
    },
    children: [
        ...leadRouter,
    ]
}
export default customerRouter