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