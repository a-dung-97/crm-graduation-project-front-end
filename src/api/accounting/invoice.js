import request from '@/utils/request'

export function index(params) {
    return request({
        url: '/invoices',
        method: 'get',
        params
    })
}
export function store(data) {
    return request({
        url: '/invoices',
        method: 'post',
        data
    })
}
export function show(id, params) {
    return request({
        url: `/invoices/${id}`,
        method: 'get',
        params
    })
}
export function update(data, id) {
    return request({
        url: `/invoices/${id}`,
        method: 'put',
        data
    })
}
export function destroy(id) {
    return request({
        url: `/invoices/${id}`,
        method: 'delete',
    })
}
