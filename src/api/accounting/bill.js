import request from '@/utils/request'

export function index(params) {
    return request({
        url: '/bills',
        method: 'get',
        params
    })
}
export function store(data) {
    return request({
        url: '/bills',
        method: 'post',
        data
    })
}
export function show(id, params) {
    return request({
        url: `/bills/${id}`,
        method: 'get',
        params
    })
}
export function update(data, id) {
    return request({
        url: `/bills/${id}`,
        method: 'put',
        data
    })
}
export function destroy(id) {
    return request({
        url: `/bills/${id}`,
        method: 'delete',
    })
}
export function verify(id) {
    return request({
        url: `/bills/${id}/verify`,
        method: 'put',

    })
}