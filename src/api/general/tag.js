import request from '@/utils/request'
export function deleteTags(data, type) {
    return request({
        url: `/tags/${type}`,
        method: 'delete',
        data
    })
}
export function changeTags(data, type) {
    return request({
        url: `/tags/${type}`,
        method: 'put',
        data
    })
}
export function index(type, name) {
    return request({
        url: '/tags',
        method: 'get',
        params: { type, name }
    })
}
export function getTags(type, id) {
    return request({
        url: `/tags/${type}/${id}`,
        method: 'get',
    })
}