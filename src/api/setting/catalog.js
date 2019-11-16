import request from '@/utils/request'

export function index(params) {
    return request({
        url: '/catalogs',
        method: 'get',
        params
    })
}
export function store(data) {
    return request({
        url: '/catalogs',
        method: 'post',
        data
    })
}
export function update(data, id) {
    return request({
        url: `/catalogs/${id}`,
        method: 'put',
        data
    })
}
export function destroy(id) {
    return request({
        url: `/catalogs/${id}`,
        method: 'delete',
    })
}
export function list(root, parent) {
    return request({
        url: '/catalogs/list',
        method: 'get',
        params: { root, parent }
    })
}