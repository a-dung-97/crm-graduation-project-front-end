<template>
    <el-card>
        <el-row>
            <el-col :span="24">
                <el-button
                    class="fr"
                    @click="$router.push(`/business/quote/edit/${$route.params.id}`)"
                    type="primary"
                    size="small"
                >Sửa</el-button>
                <el-button
                    class="fr mr-10"
                    @click="$router.push(`/business/quote/create/?cloneId=${$route.params.id}`)"
                    type="primary"
                    size="small"
                >Sao chép</el-button>
                <el-button class="fr" type="primary" size="small">In</el-button>
            </el-col>
        </el-row>
        <h3 class="title">Thông tin báo giá</h3>
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
                        <p class="my-label">Mã</p>
                    </el-col>
                    <el-col :span="14">
                        <p class="content">{{ data.code}}</p>
                    </el-col>
                </el-row>
                <el-row class="item">
                    <el-col :span="10">
                        <p class="my-label">Khách hàng</p>
                    </el-col>
                    <el-col :span="14">
                        <p class="content">{{ data.customer }}</p>
                    </el-col>
                </el-row>
                <el-row class="item">
                    <el-col :span="10">
                        <p class="my-label">Liên hệ</p>
                    </el-col>
                    <el-col :span="14">
                        <p class="content">{{ data.contact }}</p>
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
                        <p class="my-label">Ngày báo giá</p>
                    </el-col>
                    <el-col :span="14">
                        <p class="content">{{ data.quote_date|date }}</p>
                    </el-col>
                </el-row>
                <el-row class="item">
                    <el-col :span="10">
                        <p class="my-label">Ngày hết hiệu lực</p>
                    </el-col>
                    <el-col :span="14">
                        <p class="content">{{ data.expiration_date|date }}</p>
                    </el-col>
                </el-row>
                <el-row class="item">
                    <el-col :span="10">
                        <p class="my-label">Trạng thái</p>
                    </el-col>
                    <el-col :span="14">
                        <p class="content">{{ data.status }}</p>
                    </el-col>
                </el-row>
                <el-row class="item">
                    <el-col :span="10">
                        <p class="my-label">Tỷ giá</p>
                    </el-col>
                    <el-col :span="14">
                        <p class="content">{{ data.exchange_rate }}</p>
                    </el-col>
                </el-row>
                <el-row class="item">
                    <el-col :span="10">
                        <p class="my-label">Địa chỉ hóa đơn</p>
                    </el-col>
                    <el-col :span="14">
                        <p class="content">{{ data.invoice_address }}</p>
                    </el-col>
                </el-row>
            </el-col>
        </el-row>
        <h3 class="title">Ghi chú</h3>
        <el-row>
            <el-col :span="24">
                <p class="content">{{ data.description }}</p>
            </el-col>
        </el-row>
        <h3 class="title">Giấy phép và điều kiện</h3>
        <el-row>
            <el-col :span="24">
                <p class="content">{{ data.license_and_conditions }}</p>
            </el-col>
        </el-row>
        <h3 class="title">Vận chuyển</h3>
        <el-row>
            <el-col :span="24">
                <p class="content">{{ data.transport }}</p>
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
        <Order />
    </el-card>
</template>
<script>
import { show } from "@/api/business/quote";
import Order from "./Order/index";
export default {
    components: { Order },
    data() {
        return {
            data: {
                products: []
            }
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
        async getOpportunity() {
            try {
                this.openFullScreen();
                const { data } = await show(this.$route.params.id);
                this.data = data;
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
        this.getOpportunity();
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