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
export function getEmailAddresses(params) {
    return request({
        url: '/email-addresses',
        method: 'get',
        params
    })
}
export function deleteEmailAddress(id) {
    return request({
        url: '/email-addresses/' + id,
        method: 'delete',
    })
}
export function sendConfirmEmail(id) {
    return request({
        url: '/email-addresses/' + id + '/confirm',
        method: 'get',
    })
}
export function setPrimary(id) {
    return request({
        url: '/email-addresses/' + id + '/primary',
        method: 'put',
    })
}
export function createEmailAddress(data) {
    return request({
        url: '/email-addresses',
        method: 'post',
        data
    })
}
export function sendEmailPasswordReset(params) {
    return request({
        url: '/auth/password/reset',
        method: 'get',
        params
    })
}
export function resetPassword(data) {
    return request({
        url: '/auth/password/reset',
        method: 'post',
        data
    })
}
export function changePassword(data) {
    return request({
        url: '/auth/password/change',
        method: 'post',
        data
    })
}