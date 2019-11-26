import request from '@/utils/request'

export function index(params) {
    return request({
        url: '/lead-score-rules',
        method: 'get',
        params
    })
}
export function store(data) {
    return request({
        url: '/lead-score-rules',
        method: 'post',
        data
    })
}
export function update(data, id) {
    return request({
        url: `/lead-score-rules/${id}`,
        method: 'put',
        data
    })
}
export function destroy(id) {
    return request({
        url: `/lead-score-rules/${id}`,
        method: 'delete',
    })
}
