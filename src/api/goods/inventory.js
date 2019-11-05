import request from '@/utils/request'

export function index(params) {
    return request({
        url: '/inventories',
        method: 'get',
        params
    })
}

