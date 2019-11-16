import request from '@/utils/request'
export function destroy(id) {
    return request({
        url: `/files/${id}`,
        method: 'delete',
    })
}
export function download(data) {
    return request({
        url: `/files/download`,
        method: 'post',
        data,
        responseType: "arraybuffer",
    })
}
export function addFiles(data, type, id) {
    return request({
        url: `/files/${type}/${id}`,
        method: 'post',
        data
    })
}
export function getFiles(params, type, id) {
    return request({
        url: `/files/${type}/${id}`,
        method: 'get',
        params
    })
}