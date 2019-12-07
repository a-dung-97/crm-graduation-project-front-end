import request from '@/utils/request'

export function index(params) {
    return request({
        url: '/mailing-lists',
        method: 'get',
        params
    })
}
export function show(id) {
    return request({
        url: `/mailing-lists/${id}`,
        method: 'get',
    })
}
export function store(data) {
    return request({
        url: '/mailing-lists',
        method: 'post',
        data
    })
}
export function update(data, id) {
    return request({
        url: `/mailing-lists/${id}`,
        method: 'put',
        data
    })
}
export function destroy(id) {
    return request({
        url: `/mailing-lists/${id}`,
        method: 'delete',
    })
}
export function addMembers(data) {
    return request({
        url: `/mailing-lists/members`,
        method: 'post',
        data
    })
}
export function deleteMembers(data, id) {
    return request({
        url: `/mailing-lists/${id}/members`,
        method: 'delete',
        data
    })
}