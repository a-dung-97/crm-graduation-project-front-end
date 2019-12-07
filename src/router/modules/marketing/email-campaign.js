const emailCampaignRouter = [
    {
        path: "email-campaign/index",
        name: "Chiến dịch email",
        component: () => import("@/views/marketing/email-campaign"),
        meta: {
            title: "Chiến dịch email",
            icon: 'dashboard'
        }
    },
    {
        path: "email-campaign/create",
        name: "CHi tiết chiến dịch email",
        component: () => import("@/views/marketing/email-campaign/show"),
        hidden: true,
        meta: {
            title: "CHi tiết chiến dịch email",
        }
    },
]

export default emailCampaignRouter