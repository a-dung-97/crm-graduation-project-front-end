import request from '@/utils/request'

export function index(params) {
    return request({
        url: '/email-automations',
        method: 'get',
        params
    })
}
export function show(id) {
    return request({
        url: `/email-automations/${id}`,
        method: 'get',
    })
}
export function store(data) {
    return request({
        url: '/email-automations',
        method: 'post',
        data
    })
}
export function update(data, id) {
    return request({
        url: `/email-automations/${id}`,
        method: 'put',
        data
    })
}
export function changeActive(id) {
    return request({
        url: `/email-automations/${id}/active`,
        method: 'put',
    })
}
export function getEmails(id) {
    return request({
        url: `/email-automations/${id}/email`,
        method: 'get',
    })
}
export function addEmail(data, id) {
    return request({
        url: `/email-automations/${id}/email`,
        method: 'post',
        data
    })
}
export function updateEmail(data, id) {
    return request({
        url: `/email-automations/email/${id}`,
        method: 'put',
        data
    })
}
export function destroy(id) {
    return request({
        url: `/email-automations/${id}`,
        method: 'delete',
    })
}
