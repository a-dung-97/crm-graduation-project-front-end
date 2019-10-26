import request from '@/utils/request'

export function index(params) {
    return request({
        url: '/roles',
        method: 'get',
        params
    })
}
export function store(data) {
    return request({
        url: '/roles',
        method: 'post',
        data
    })
}
export function update(data, id) {
    return request({
        url: `/roles/${id}`,
        method: 'put',
        data
    })
}
export function destroy(id) {
    return request({
        url: `/roles/${id}`,
        method: 'delete',
    })
}