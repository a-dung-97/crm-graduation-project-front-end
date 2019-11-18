import request from '@/utils/request'

export function index(params) {
    return request({
        url: '/tasks',
        method: 'get',
        params
    })
}
export function store(data) {
    return request({
        url: '/tasks',
        method: 'post',
        data
    })
}
export function show(id, params) {
    return request({
        url: `/tasks/${id}`,
        method: 'get',
        params
    })
}
export function update(data, id) {
    return request({
        url: `/tasks/${id}`,
        method: 'put',
        data
    })
}
export function destroy(id) {
    return request({
        url: `/tasks/${id}`,
        method: 'delete',
    })
}
export function addTask(data, type, id) {
    return request({
        url: `/tasks/${type}/${id}`,
        method: 'post',
        data
    })
}
export function getTasks(params, type, id) {
    return request({
        url: `/tasks/${type}/${id}`,
        method: 'get',
        params
    })
}

export function finishTask(id) {
    return request({
        url: `/tasks/${id}/finish`,
        method: 'put',
    })
}