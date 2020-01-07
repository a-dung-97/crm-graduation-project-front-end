const emailAutomationRouter = [
    {
        path: "email-automation/index",
        name: "Email tự động",
        component: () => import("@/views/automation/email-automation"),
        meta: {
            title: "Email tự động",
            icon: 'email'
        }
    },
    {
        path: "email-automation/show/:id",
        name: "Chi tiết email tự động",
        component: () => import("@/views/automation/email-automation/show"),
        hidden: true,
        meta: {
            title: "Chi tiết email tự động",
        }
    },
]

export default emailAutomationRouter