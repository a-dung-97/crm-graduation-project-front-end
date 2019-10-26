import request from '@/utils/request'

export function index(params) {
    return request({
        url: '/positions',
        method: 'get',
        params
    })
}
export function create(data) {
    return request({
        url: '/positions',
        method: 'post',
        data
    })
}
export function update(data, id) {
    return request({
        url: `/positions/${id}`,
        method: 'put',
        data
    })
}
export function destroy(id) {
    return request({
        url: `/positions/${id}`,
        method: 'delete',
    })
}
export function recursive() {
    return request({
        url: '/positions/recursive',
        method: 'get',

    })
}