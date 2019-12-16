import request from '@/utils/request'

export function index(params) {
    return request({
        url: '/calls',
        method: 'get',
        params
    })
}
export function store(data) {
    return request({
        url: '/calls',
        method: 'post',
        data
    })
}
export function show(id, params) {
    return request({
        url: `/calls/${id}`,
        method: 'get',
        params
    })
}
export function update(data, id) {
    return request({
        url: `/calls/${id}`,
        method: 'put',
        data
    })
}
export function destroy(id) {
    return request({
        url: `/calls/${id}`,
        method: 'delete',
    })
}
export function addCall(data, type, id) {
    return request({
        url: `/calls/${type}/${id}`,
        method: 'post',
        data
    })
}
export function getCalls(params, type, id) {
    return request({
        url: `/calls/${type}/${id}`,
        method: 'get',
        params
    })
}

export function finishCall(id) {
    return request({
        url: `/calls/${id}/finish`,
        method: 'put',
    })
}