import request from '@/utils/request'

export function getDebt(params) {
    return request({
        url: '/reports/debt',
        method: 'get',
        params
    })
}
export function getTaskReport(params) {
    return request({
        url: '/reports/tasks',
        method: 'get',
        params
    })
}
export function getLeadReport(params) {
    return request({
        url: '/reports/leads',
        method: 'get',
        params
    })
}
export function getEmailCampaignReport(params) {
    return request({
        url: '/reports/email-campaigns',
        method: 'get',
        params
    })
}
export function getRevenueReport(params) {
    return request({
        url: '/reports/revenue',
        method: 'get',
        params
    })
}
export function getProductReport(params) {
    return request({
        url: '/reports/products',
        method: 'get',
        params
    })
}
export function getConvertedReport(params) {
    return request({
        url: '/reports/converted',
        method: 'get',
        params
    })
}

