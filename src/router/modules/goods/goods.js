import Layout from '@/layout';
import productRouter from './product';
import receiptRouter from './receipt';
import issueRouter from './issue';
const goodsRouter = {
    path: "/goods",
    component: Layout,
    name: "Hàng hóa",
    alwaysShow: true,
    redirect: "/goods/product/index",
    meta: {
        title: "Hàng hóa",
        icon: "dashboard"
    },
    children: [
        ...productRouter,
        {
            path: "warehouse/index",
            name: "Kho hàng",
            component: () => import("@/views/goods/warehouse/index"),
            meta: {
                title: "Kho hàng",
                icon: 'dashboard'
            }
        },
        ...receiptRouter,
        ...issueRouter,
        {
            path: "inventory/index",
            name: "Hàng tồn kho",
            component: () => import("@/views/goods/inventory/index"),
            meta: {
                title: "Hàng tồn kho",
                icon: 'dashboard'
            }
        },

    ]
}
export default goodsRouter