import request from '@/utils/request'

export function index(params) {
    return request({
        url: '/email-templates',
        method: 'get',
        params
    })
}
export function show(id) {
    return request({
        url: `/email-templates/${id}`,
        method: 'get',
    })
}
export function store(data) {
    return request({
        url: '/email-templates',
        method: 'post',
        data
    })
}
export function update(data, id) {
    return request({
        url: `/email-templates/${id}`,
        method: 'put',
        data
    })
}
export function destroy(id) {
    return request({
        url: `/email-templates/${id}`,
        method: 'delete',
    })
}
