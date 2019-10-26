import request from '@/utils/request'

export function login(data) {
    return request({
        url: '/auth/login',
        method: 'post',
        data
    })
}

export function getInfo(token) {
    return request({
        url: '/auth/me',
        method: 'post',
    })
}
export function resendEmail(id) {
    return request({
        url: '/auth/resend/' + id,
        method: 'get',
    })
}
export function logout() {
    return request({
        url: '/auth/logout',
        method: 'post'
    })
}
export function register(data) {
    return request({
        url: '/auth/register',
        method: 'post',
        data
    })
}
export function refreshToken() {
    return request({
        url: '/auth/refresh',
        method: 'post',
    })
}
export function checkCompanyCode(data) {
    return request({
        url: '/auth/check-company',
        method: 'post',
        data
    })
}
export function setup(data) {
    return request({
        url: '/auth/setup',
        method: 'post',
        data
    })
}
export function changeAvatar(data) {
    return request({
        url: '/users/avatar',
        method: 'post',
        data
    })
}
export function index(params) {
    return request({
        url: '/users',
        method: 'get',
        params
    })
}
export function invite(data) {
    return request({
        url: '/users/invite',
        method: 'post',
        data
    })
}
export function update(data, id) {
    return request({
        url: `/users/${id}`,
        method: 'put',
        data
    })
}
export function destroy(id) {
    return request({
        url: `/users/${id}`,
        method: 'delete',
    })
}

export function updateCompany(data) {
    return request({
        url: '/users/company',
        method: 'put',
        data
    })
}
export function getCompany() {
    return request({
        url: '/users/company',
        method: 'get',
    })
}
