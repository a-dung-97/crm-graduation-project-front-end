import request from '@/utils/request'

export function index(params) {
    return request({
        url: '/reports',
        method: 'get',
        params
    })
}
export function show(id) {
    return request({
        url: `/reports/${id}`,
        method: 'get',
    })
}
export function store(data) {
    return request({
        url: '/reports',
        method: 'post',
        data
    })
}
export function update(data, id) {
    return request({
        url: `/reports/${id}`,
        method: 'put',
        data
    })
}
export function destroy(id) {
    return request({
        url: `/reports/${id}`,
        method: 'delete',
    })
}

