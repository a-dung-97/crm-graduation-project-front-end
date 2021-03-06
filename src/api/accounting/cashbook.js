import request from '@/utils/request'

export function index(params) {
    return request({
        url: '/cashbooks',
        method: 'get',
        params
    })
}
export function store(data) {
    return request({
        url: '/cashbooks',
        method: 'post',
        data
    })
}

export function update(data, id) {
    return request({
        url: `/cashbooks/${id}`,
        method: 'put',
        data
    })
}
export function destroy(id) {
    return request({
        url: `/cashbooks/${id}`,
        method: 'delete',
    })
}
