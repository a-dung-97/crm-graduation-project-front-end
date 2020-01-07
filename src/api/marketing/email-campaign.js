import request from '@/utils/request'

export function index(params) {
    return request({
        url: '/email-campaigns',
        method: 'get',
        params
    })
}
export function show(id) {
    return request({
        url: `/email-campaigns/${id}`,
        method: 'get',
    })
}
export function getListEmail(params, id) {
    return request({
        url: `/email-campaigns/${id}/list`,
        method: 'get',
        params
    })
}
export function store(data) {
    return request({
        url: '/email-campaigns',
        method: 'post',
        data
    })
}
export function destroy(id) {
    return request({
        url: `/email-campaigns/${id}`,
        method: 'delete',
    })
}
