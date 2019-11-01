import Layout from '@/layout';
import productRouter from './product';
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
        ...productRouter
    ]
}
export default goodsRouter