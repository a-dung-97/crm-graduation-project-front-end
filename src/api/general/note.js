import request from '@/utils/request'

export function index(params) {
    return request({
        url: '/notes',
        method: 'get',
        params
    })
}
export function update(data, id) {
    return request({
        url: `/notes/${id}`,
        method: 'put',
        data
    })
}
export function destroy(id) {
    return request({
        url: `/notes/${id}`,
        method: 'delete',
    })
}