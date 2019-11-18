import request from '@/utils/request'

export function index(params) {
    return request({
        url: '/customers',
        method: 'get',
        params
    })
}
export function show(id, params) {
    return request({
        url: `/customers/${id}`,
        method: 'get',
        params
    })
}
export function store(data) {
    return request({
        url: '/customers',
        method: 'post',
        data
    })
}
export function update(data, id) {
    return request({
        url: `/customers/${id}`,
        method: 'put',
        data
    })
}
export function destroy(id) {
    return request({
        url: `/customers/${id}`,
        method: 'delete',
    })
}
export function addNote(data, id) {
    return request({
        url: `/customers/${id}/note`,
        method: 'post',
        data
    })
}
export function addFile(data, id) {
    return request({
        url: `/customers/${id}/file`,
        method: 'post',
        data
    })
}
export function getNotes(id, params) {
    return request({
        url: `/customers/${id}/note`,
        method: 'get',
        params
    })
}
export function getFiles(id, params) {
    return request({
        url: `/customers/${id}/file`,
        method: 'get',
        params
    })
}