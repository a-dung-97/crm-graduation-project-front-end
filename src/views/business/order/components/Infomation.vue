<template>
    <el-card>
        <el-row>
            <el-col :span="24">
                <span>{{ data.code }}</span>
                <el-button
                    class="fr"
                    @click="$router.push(`/business/order/edit/${$route.params.id}`)"
                    type="primary"
                    size="small"
                >Sửa</el-button>
                <el-button
                    class="fr mr-10"
                    @click="$router.push(`/business/order/create/?cloneId=${$route.params.id}`)"
                    type="primary"
                    size="small"
                >Sao chép</el-button>
                <el-button
                    class="fr"
                    @click="$router.push(`/business/quote/create/?orderId=${$route.params.id}`)"
                    type="primary"
                    size="small"
                >Convert báo giá</el-button>
                <el-button class="fr" @click="showDialog=true" type="primary" size="small">In</el-button>
            </el-col>
        </el-row>

        <h3 class="title">Thông tin đơn hàng</h3>
        <el-row>
            <el-col :span="12">
                <el-row class="item">
                    <el-col :span="10">
                        <p class="my-label">Chủ sở hữu</p>
                    </el-col>
                    <el-col :span="14">
                        <p class="content">{{ data.owner }}</p>
                    </el-col>
                </el-row>
                <el-row class="item">
                    <el-col :span="10">
                        <p class="my-label">Trạng thái</p>
                    </el-col>
                    <el-col :span="14">
                        <p class="content">{{ data.status}}</p>
                    </el-col>
                </el-row>
                <el-row class="item">
                    <el-col :span="10">
                        <p class="my-label">Phương thức thanh toán</p>
                    </el-col>
                    <el-col :span="14">
                        <p class="content">{{ data.payment_method }}</p>
                    </el-col>
                </el-row>
                <el-row class="item">
                    <el-col :span="10">
                        <p class="my-label">Địa chỉ giao hàng</p>
                    </el-col>
                    <el-col :span="14">
                        <p class="content">{{ data.delivery_address }}</p>
                    </el-col>
                </el-row>
            </el-col>
            <el-col :span="12">
                <el-row class="item">
                    <el-col :span="10">
                        <p class="my-label">Phương thức giao hàng</p>
                    </el-col>
                    <el-col :span="14">
                        <p class="content">{{ data.delivery_method }}</p>
                    </el-col>
                </el-row>
                <el-row class="item">
                    <el-col :span="10">
                        <p class="my-label">Ngày đặt</p>
                    </el-col>
                    <el-col :span="14">
                        <p class="content">{{ data.order_date|date }}</p>
                    </el-col>
                </el-row>
                <el-row class="item">
                    <el-col :span="10">
                        <p class="my-label">Ngày giao</p>
                    </el-col>
                    <el-col :span="14">
                        <p class="content">{{ data.delivery_date|date }}</p>
                    </el-col>
                </el-row>
                <el-row class="item">
                    <el-col :span="10">
                        <p class="my-label">Báo giá</p>
                    </el-col>
                    <el-col :span="14">
                        <p class="content">{{ data.quote?data.quote.code:'' }}</p>
                    </el-col>
                </el-row>
            </el-col>
        </el-row>
        <h3 class="title">Thông tin khách hàng</h3>
        <el-row v-if="data.customer">
            <el-col :span="12">
                <el-row class="item">
                    <el-col :span="10">
                        <p class="my-label">Tên</p>
                    </el-col>
                    <el-col :span="14">
                        <p class="content">{{ data.customer.name }}</p>
                    </el-col>
                </el-row>
                <el-row class="item">
                    <el-col :span="10">
                        <p class="my-label">Điện thoại</p>
                    </el-col>
                    <el-col :span="14">
                        <p class="content">{{ data.customer.phone_number }}</p>
                    </el-col>
                </el-row>
            </el-col>
            <el-col :span="12">
                <el-row class="item">
                    <el-col :span="10">
                        <p class="my-label">Email</p>
                    </el-col>
                    <el-col :span="14">
                        <p class="content">{{ data.customer.email }}</p>
                    </el-col>
                </el-row>
                <el-row class="item">
                    <el-col :span="10">
                        <p class="my-label">Số di động</p>
                    </el-col>
                    <el-col :span="14">
                        <p class="content">{{ data.customer.mobile_number }}</p>
                    </el-col>
                </el-row>
            </el-col>
        </el-row>
        <h3 class="title">Thông tin liên hệ</h3>
        <el-row v-if="data.contact">
            <el-col :span="12">
                <el-row class="item">
                    <el-col :span="10">
                        <p class="my-label">Tên</p>
                    </el-col>
                    <el-col :span="14">
                        <p class="content">{{ data.contact.name }}</p>
                    </el-col>
                </el-row>
                <el-row class="item">
                    <el-col :span="10">
                        <p class="my-label">Điện thoại</p>
                    </el-col>
                    <el-col :span="14">
                        <p class="content">{{ data.contact.phone_number }}</p>
                    </el-col>
                </el-row>
            </el-col>
            <el-col :span="12">
                <el-row class="item">
                    <el-col :span="10">
                        <p class="my-label">Email</p>
                    </el-col>
                    <el-col :span="14">
                        <p class="content">{{ data.contact.email }}</p>
                    </el-col>
                </el-row>
                <el-row class="item">
                    <el-col :span="10">
                        <p class="my-label">Số di động</p>
                    </el-col>
                    <el-col :span="14">
                        <p class="content">{{ data.contact.mobile_number }}</p>
                    </el-col>
                </el-row>
            </el-col>
        </el-row>
        <h3 class="title">Thông tin sản phẩm</h3>
        <el-row>
            <el-col :span="24">
                <el-table v-if="data" :data="data.products">
                    <el-table-column type="index" width="50" align="center" label="STT"></el-table-column>
                    <el-table-column prop="name" label="Tên"></el-table-column>
                    <el-table-column prop="price" label="Giá bán">
                        <template slot-scope="scope">{{ scope.row.price|money }}</template>
                    </el-table-column>
                    <el-table-column prop="quantity" align="center" width="100" label="Số lượng"></el-table-column>
                    <el-table-column
                        prop="discount"
                        align="center"
                        width="120"
                        label="Chiết khấu(%)"
                    ></el-table-column>
                    <el-table-column label="Tiền chiết khấu">
                        <template
                            slot-scope="scope"
                        >{{ (data.products[scope.$index].quantity*data.products[scope.$index].price*data.products[scope.$index].discount/100).toFixed(2)|money }}</template>
                    </el-table-column>
                    <el-table-column prop="tax" width="80" align="center" label="Thuế(%)"></el-table-column>
                    <el-table-column label="Tiền thuế">
                        <template
                            slot-scope="scope"
                        >{{ (data.products[scope.$index].quantity*data.products[scope.$index].price*data.products[scope.$index].tax/100).toFixed(2)|money }}</template>
                    </el-table-column>
                    <el-table-column label="Tiền hàng(đ)">
                        <template
                            slot-scope="scope"
                        >{{ (data.products[scope.$index].quantity*data.products[scope.$index].price).toFixed(2)|money }}</template>
                    </el-table-column>
                </el-table>
            </el-col>
            <el-col style="margin-top:10px" :span="7" :offset="17">
                <p>Tổng tiền hàng: {{ total.toFixed(2)|money }} đ</p>
                <p>Tổng tiền thuế: {{ (tax).toFixed(2)|money }} đ</p>
                <p>Tổng tiền chiết khấu: {{ discount.toFixed(2)|money }} đ</p>
                <p>Tổng thanh toán: {{ (total+tax-discount).toFixed(2)|money }} đ</p>
            </el-col>
        </el-row>
        <h3 class="title">
            Cơ hội
            <i class="el-icon-plus" v-if="!data.opportunity"></i>
        </h3>
        <el-row>
            <el-table :data="data.opportunity">
                <el-table-column prop="name" label="Tên"></el-table-column>
                <el-table-column prop="owner" label="Chủ sở hữu"></el-table-column>
                <el-table-column prop="source" label="Nguồn"></el-table-column>
                <el-table-column prop="customer" label="Khách hàng"></el-table-column>
                <el-table-column label="Ngày tạo">
                    <template slot-scope="scope">{{ scope.row.created_at|datetime }}</template>
                </el-table-column>
            </el-table>
        </el-row>
        <Invoice />
        <el-dialog center title="Báo giá" :visible.sync="showDialog" top="5vh" width="80%">
            <div id="print" v-if="showDialog" v-html="order.content"></div>
            <span slot="footer" class="dialog-footer">
                <el-button size="medium" @click="showDialog=false">Hủy</el-button>
                <el-button size="medium" @click="$htmlToPaper('print')" type="primary">In</el-button>
            </span>
        </el-dialog>
    </el-card>
</template>
<script>
import { show, sendOrder } from "@/api/business/order";
import Invoice from "./Invoice/index";
export default {
    components: { Invoice },
    data() {
        return {
            data: {
                products: []
            },
            order: "",
            showDialog: false
        };
    },
    computed: {
        total() {
            if (this.data.products.length == 0) return 0;
            return this.data.products
                .map(item => item.quantity * item.price)
                .reduce((total, value) => total + value);
        },
        tax() {
            if (this.data.products.length == 0) return 0;
            return this.data.products
                .map(item => (item.quantity * item.price * item.tax) / 100)
                .reduce((total, value) => total + value);
        },
        discount() {
            if (this.data.products.length == 0) return 0;
            return this.data.products
                .map(item => (item.quantity * item.price * item.discount) / 100)
                .reduce((total, value) => total + value);
        }
    },
    methods: {
        async getOrder() {
            try {
                this.openFullScreen();
                const [data, order] = await Promise.all([
                    show(this.$route.params.id),
                    sendOrder(this.$route.params.id)
                ]);
                this.data = data.data;
                this.order = order.data;
                console.log(data);
                this.data.opportunity = this.data.opportunity
                    ? [this.data.opportunity]
                    : [];
                this.closeFullScreen();
            } catch (error) {
                console.log(error);
                this.closeFullScreen();
            }
        }
    },
    created() {
        this.getOrder();
    }
};
</script>
<style lang="scss" scoped>
.my-label {
    color: gray;
}
.content,
.my-label {
    margin-top: 13px;
    margin-bottom: 13px;
}
.item {
    border-bottom: 1px solid #ecf0f1;
}
.title {
    margin-bottom: 10px;
}
.infomation {
    margin-top: 10px;
    font-size: 14px;
    color: #7f10c10d;
}
.infomation i {
    padding-right: 5px;
}
.el-icon-plus {
    float: right;
    cursor: pointer;
    &:hover {
        color: #3498db;
    }
}
</style>