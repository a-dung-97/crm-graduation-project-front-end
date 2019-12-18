import Layout from '@/layout';
import invoiceRouter from './invoice';
const accountingRouter = {
    path: "/accounting",
    component: Layout,
    name: "Kế toán",
    alwaysShow: true,
    redirect: "/accounting/cashbook/index",
    meta: {
        title: "Kế toán",
        icon: "accounting"
    },
    children: [

        {
            path: "cashbook/index",
            name: "Sổ quỹ",
            component: () => import("@/views/accounting/cashbook/index"),
            meta: {
                title: "Sổ quỹ",
                icon: 'cashbook'
            }
        },
        ...invoiceRouter,
    ]
}
export default accountingRouter