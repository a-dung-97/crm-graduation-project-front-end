const emailCampaignRouter = [
    {
        path: "email-campaign/index",
        name: "Chiến dịch email",
        component: () => import("@/views/marketing/email-campaign"),
        meta: {
            title: "Chiến dịch email",
            icon: 'campaign'
        }
    },
    {
        path: "email-campaign/show/:id",
        name: "Chi tiết chiến dịch email",
        component: () => import("@/views/marketing/email-campaign/show"),
        hidden: true,
        meta: {
            title: "Chi tiết chiến dịch email",
        }
    },
]

export default emailCampaignRouter