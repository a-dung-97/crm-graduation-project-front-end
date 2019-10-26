import request from '@/utils/request'

export function index(params) {
    return request({
        url: '/groups',
        method: 'get',
        params
    })
}
export function store(data) {
    return request({
        url: '/groups',
        method: 'post',
        data
    })
}
export function update(data, id) {
    return request({
        url: `/groups/${id}`,
        method: 'put',
        data
    })
}
export function destroy(id) {
    return request({
        url: `/groups/${id}`,
        method: 'delete',
    })
}
export function updateUsers(id, data) {
    return request({
        url: `/groups/user/${id}`,
        method: 'post',
        data
    })
}