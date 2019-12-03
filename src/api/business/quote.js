import request from '@/utils/request'

export function index(params) {
    return request({
        url: '/quotes',
        method: 'get',
        params
    })
}
export function show(id) {
    return request({
        url: `/quotes/${id}`,
        method: 'get',
    })
}
export function store(data) {
    return request({
        url: '/quotes',
        method: 'post',
        data
    })
}
export function update(data, id) {
    return request({
        url: `/quotes/${id}`,
        method: 'put',
        data
    })
}
export function destroy(id) {
    return request({
        url: `/quotes/${id}`,
        method: 'delete',
    })
}

export function getOrders(id) {
    return request({
        url: `/quotes/${id}/order`,
        method: 'get',
    })
}