import request from '@/utils/request'

export function index(params) {
    return request({
        url: '/webforms',
        method: 'get',
        params
    })
}
export function show(id) {
    return request({
        url: `/webforms/${id}`,
        method: 'get',
    })
}
export function store(data) {
    return request({
        url: '/webforms',
        method: 'post',
        data
    })
}
export function update(data, id) {
    return request({
        url: `/webforms/${id}`,
        method: 'put',
        data
    })
}
export function destroy(id) {
    return request({
        url: `/webforms/${id}`,
        method: 'delete',
    })
}
export function createLead(data, id) {
    return request({
        url: `/webforms/${id}/lead`,
        method: 'post',
        data
    })
}
export function getWebformFromIframe(id) {
    return request({
        url: `/webforms/${id}/iframe`,
        method: 'get',
    })
}