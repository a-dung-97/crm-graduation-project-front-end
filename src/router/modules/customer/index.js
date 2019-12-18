import Layout from '@/layout';
import leadRouter from './lead';
import customerRouter from './customer';
import contactRouter from './contact';
const customerManagementRouter = {
    path: "/customer",
    component: Layout,
    name: "Quản lý khách hàng",
    alwaysShow: true,
    redirect: "/customer/lead/index",
    meta: {
        title: "Khách hàng",
        icon: "customer"
    },
    children: [
        ...leadRouter,
        ...customerRouter,
        ...contactRouter
    ]
}
export default customerManagementRouter