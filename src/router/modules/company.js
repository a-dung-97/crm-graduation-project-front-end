import Layout from '@/layout';

const companyRouter = {
    path: "/company",
    component: Layout,
    redirect: "/company/position",
    meta: {
        title: "Công ty",
        icon: "dashboard"
    },
    children: [
        {
            path: "information",
            name: "Thông tin công ty",
            component: () => import("@/views/company/information/index"),
            meta: {
                title: "Thông tin công ty",
                icon: "people",
            }
        },
        {
            path: "department",
            name: "Phòng ban",
            component: () => import("@/views/company/department/index"),
            meta: {
                title: "Phòng ban",
                icon: "people",
            }
        },
        {
            path: "position",
            name: "Chức vụ",
            component: () => import("@/views/company/position/index"),
            meta: {
                title: "Chức vụ",
                icon: "people",
            }
        },
        {
            path: "user",
            name: "Người dùng",
            component: () => import("@/views/company/user/index"),
            meta: {
                title: "Người dùng",
                icon: "people",
            }
        },
        {
            path: "group",
            name: "Nhóm người dùng",
            component: () => import("@/views/company/group/index"),
            meta: {
                title: "Nhóm người dùng",
                icon: "people",
            }
        },
        {
            path: "role",
            name: "Quyền hạn",
            component: () => import("@/views/company/role/index"),
            meta: {
                title: "Quyền hạn",
                icon: "people",
            }
        },


    ]
}
export default companyRouter