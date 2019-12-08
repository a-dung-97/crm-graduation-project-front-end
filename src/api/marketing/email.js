import request from '@/utils/request'

export function index(params) {
    return request({
        url: '/emails',
        method: 'get',
        params
    })
}

export function store(data) {
    return request({
        url: '/emails',
        method: 'post',
        data
    })
}