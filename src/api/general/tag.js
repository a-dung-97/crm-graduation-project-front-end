import request from '@/utils/request'
export function deleteTag(name, type, id) {
    return request({
        url: `/tags/${type}/${id}`,
        method: 'delete',
        params: { name }
    })
}
export function changeTags(data, type, id) {
    return request({
        url: `/tags/${type}/${id}`,
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