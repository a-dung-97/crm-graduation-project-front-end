import request from '@/utils/request'

export function index(params) {
    return request({
        url: '/receipts',
        method: 'get',
        params
    })
}
export function show(id) {
    return request({
        url: `/receipts/${id}`,
        method: 'get',
    })
}
export function store(data) {
    return request({
        url: '/receipts',
        method: 'post',
        data
    })
}
export function update(data, id) {
    return request({
        url: `/receipts/${id}`,
        method: 'put',
        data
    })
}
export function destroy(id) {
    return request({
        url: `/receipts/${id}`,
        method: 'delete',
    })
}
