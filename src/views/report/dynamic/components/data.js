const customer = [
    {
        label: "Mã khách hàng",
        value: "code"
    },
    {
        label: "Tên khách hàng",
        value: "name"
    },
    {
        label: "Chủ sở hữu",
        value: "owner"
    },
    {
        label: "Email",
        value: "email"
    },
    {
        label: "SĐT",
        value: "phone_number"
    },
    {
        label: "Địa chỉ giao hàng",
        value: "delivery_address"
    },
]
const order = [
    {
        label: "Mã đơn hàng",
        value: "order_code"
    },
    {
        label: "Người bán",
        value: "seller"
    },
    {
        label: "Phương thức vận chuyển",
        value: "delivery_method"
    },
    {
        label: "Ngày đặt hàng",
        value: "order_date"
    },
    {
        label: "Thành tiền",
        value: "total"
    },
    {
        label: "Chiết khấu",
        value: "discount"
    },
    {
        label: "Đã thanh toán",
        value: "paid"
    },
    {
        label: "Còn nợ",
        value: "owed"
    },
]
const quote = [
    {
        label: "Mã báo giá",
        value: "quote_code"
    },
    {
        label: "Thành tiền báo giá",
        value: "total"
    }
]
const user = [
    {
        label: "Tên người dùng",
        value: "name"
    },
    {
        label: "Email",
        value: "email"
    },
    {
        label: "SĐT",
        value: "phone_number"
    },
]
const task = [
    {
        label: "Tiêu đề",
        value: "title"
    },
    {
        label: "Trạng thái",
        value: "status"
    },
    {
        label: "Ngày bắt đầu",
        value: "start_date"
    },
]
const opportunity = [
    {
        label: "Tên cơ hội",
        value: "order_name"
    },
    {
        label: "Kiểu",
        value: "type"
    },
    {
        label: "Nguồn",
        value: "source"
    },
    {
        label: "Trạng thái",
        value: "status"
    },
    {
        label: "Xác suất thành công",
        value: "probability_of_success"
    },
]
export default {
    customer,
    order,
    quote,
    user,
    task,
    opportunity
}