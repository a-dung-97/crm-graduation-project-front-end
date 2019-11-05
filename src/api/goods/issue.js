import request from '@/utils/request'

export function index(params) {
    return request({
        url: '/issues',
        method: 'get',
        params
    })
}
export function show(id) {
    return request({
        url: `/issues/${id}`,
        method: 'get',
    })
}
export function store(data) {
    return request({
        url: '/issues',
        method: 'post',
        data
    })
}
export function update(data, id) {
    return request({
        url: `/issues/${id}`,
        method: 'put',
        data
    })
}
export function destroy(id) {
    return request({
        url: `/issues/${id}`,
        method: 'delete',
    })
}
