import Layout from '@/layout';

const companyRouter = {
    path: "/company",
    component: Layout,
    redirect: "/company/position",
    name: "Công ty",
    meta: {
        title: "Công ty",
        icon: "company"
    },
    children: [
        {
            path: "information",
            name: "Thông tin công ty",
            component: () => import("@/views/company/information/index"),
            meta: {
                title: "Thông tin công ty",
                icon: "info",
            }
        },
        {
            path: "department",
            name: "Phòng ban",
            component: () => import("@/views/company/department/index"),
            meta: {
                title: "Phòng ban",
                icon: "department",
            }
        },
        {
            path: "position",
            name: "Chức vụ",
            component: () => import("@/views/company/position/index"),
            meta: {
                title: "Chức vụ",
                icon: "position",
            }
        },
        {
            path: "user",
            name: "Người dùng",
            component: () => import("@/views/company/user/index"),
            meta: {
                title: "Người dùng",
                icon: "user",
            }
        },
        {
            path: "group",
            name: "Nhóm người dùng",
            component: () => import("@/views/company/group/index"),
            meta: {
                title: "Nhóm người dùng",
                icon: "group-user",
            }
        },
        {
            path: "role",
            name: "Quyền hạn",
            component: () => import("@/views/company/role/index"),
            meta: {
                title: "Quyền hạn",
                icon: "role",
            }
        },


    ]
}
export default companyRouter