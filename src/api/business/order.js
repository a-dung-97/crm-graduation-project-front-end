import request from '@/utils/request'

export function index(params) {
    return request({
        url: '/orders',
        method: 'get',
        params
    })
}
export function show(id) {
    return request({
        url: `/orders/${id}`,
        method: 'get',
    })
}
export function store(data) {
    return request({
        url: '/orders',
        method: 'post',
        data
    })
}
export function update(data, id) {
    return request({
        url: `/orders/${id}`,
        method: 'put',
        data
    })
}
export function destroy(id) {
    return request({
        url: `/orders/${id}`,
        method: 'delete',
    })
}
export function getInvoices(id) {
    return request({
        url: `/orders/${id}/invoice`,
        method: 'get',
    })
}