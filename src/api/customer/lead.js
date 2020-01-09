import request from '@/utils/request'

export function index(params) {
    return request({
        url: '/leads',
        method: 'get',
        params,
    })
}
export function show(id, params) {
    return request({
        url: `/leads/${id}`,
        method: 'get',
        params
    })
}
export function store(data) {
    return request({
        url: '/leads',
        method: 'post',
        data
    })
}
export function update(data, id) {
    return request({
        url: `/leads/${id}`,
        method: 'put',
        data
    })
}
export function destroy(id) {
    return request({
        url: `/leads/${id}`,
        method: 'delete',
    })
}
export function convert(data, id) {
    return request({
        url: `/leads/convert/${id}`,
        method: 'post',
        data
    })
}