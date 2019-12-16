import request from '@/utils/request'

export function index(params) {
    return request({
        url: '/appointments',
        method: 'get',
        params
    })
}
export function store(data) {
    return request({
        url: '/appointments',
        method: 'post',
        data
    })
}
export function show(id, params) {
    return request({
        url: `/appointments/${id}`,
        method: 'get',
        params
    })
}
export function update(data, id) {
    return request({
        url: `/appointments/${id}`,
        method: 'put',
        data
    })
}
export function destroy(id) {
    return request({
        url: `/appointments/${id}`,
        method: 'delete',
    })
}

export function getAppointments(params, type, id) {
    return request({
        url: `/appointments/${type}/${id}`,
        method: 'get',
        params
    })
}
