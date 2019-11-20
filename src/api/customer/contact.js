import request from '@/utils/request'

export function index(params) {
    return request({
        url: '/contacts',
        method: 'get',
        params
    })
}
export function show(id, params) {
    return request({
        url: `/contacts/${id}`,
        method: 'get',
        params
    })
}
export function store(data) {
    return request({
        url: '/contacts',
        method: 'post',
        data
    })
}
export function update(data, id) {
    return request({
        url: `/contacts/${id}`,
        method: 'put',
        data
    })
}
export function destroy(id) {
    return request({
        url: `/contacts/${id}`,
        method: 'delete',
    })
}
