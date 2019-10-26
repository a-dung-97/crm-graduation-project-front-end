import request from '@/utils/request'

export function index(params) {
    return request({
        url: '/departments',
        method: 'get',
        params
    })
}
export function store(data) {
    return request({
        url: '/departments',
        method: 'post',
        data
    })
}
export function update(data, id) {
    return request({
        url: `/departments/${id}`,
        method: 'put',
        data
    })
}
export function destroy(id) {
    return request({
        url: `/departments/${id}`,
        method: 'delete',
    })
}
export function recursive() {
    return request({
        url: '/departments/recursive',
        method: 'get',

    })
}