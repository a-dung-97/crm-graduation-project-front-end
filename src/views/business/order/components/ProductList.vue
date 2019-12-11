<template>
    <el-row>
        <el-form :disabled="isShow" size="mini">
            <el-table :data="products" style="width: 100%">
                <el-table-column align="center" type="index" width="80" label="STT"></el-table-column>
                <el-table-column prop="name" width="250" label="Tên"></el-table-column>
                <el-table-column prop="code" width="250" label="Mã"></el-table-column>
                <el-table-column width="100" label="Số lượng">
                    <template slot-scope="scope">
                        <el-form-item class="mb-0">
                            <el-input-number
                                style="width:80px"
                                v-model="products[scope.$index].quantity"
                                controls-position="right"
                                :min="1"
                            ></el-input-number>
                        </el-form-item>
                    </template>
                </el-table-column>
                <el-table-column width="150" label="Giá bán(đ)">
                    <template slot-scope="scope">
                        <el-form-item class="mb-0">
                            <el-input-number
                                style="width:130px"
                                v-model="products[scope.$index].price"
                                controls-position="right"
                                :min="0"
                            ></el-input-number>
                        </el-form-item>
                    </template>
                </el-table-column>
                <el-table-column width="120" label="Chiết khấu(%)">
                    <template slot-scope="scope">
                        <el-form-item class="mb-0">
                            <el-input-number
                                style="width:80px"
                                v-model="products[scope.$index].discount"
                                controls-position="right"
                                :min="0"
                            ></el-input-number>
                        </el-form-item>
                    </template>
                </el-table-column>
                <el-table-column width="200" label="Tiền chiết khấu">
                    <template
                        slot-scope="scope"
                    >{{ (products[scope.$index].quantity*products[scope.$index].price*products[scope.$index].discount/100).toFixed(2)|money }}</template>
                </el-table-column>
                <el-table-column width="100" label="Thuế">
                    <template slot-scope="scope">
                        <el-form-item class="mb-0">
                            <el-input-number
                                style="width:80px"
                                v-model="products[scope.$index].tax"
                                controls-position="right"
                                :min="0"
                            ></el-input-number>
                        </el-form-item>
                    </template>
                </el-table-column>
                <el-table-column width="200" label="Tiền thuế">
                    <template
                        slot-scope="scope"
                    >{{ (products[scope.$index].quantity*products[scope.$index].price*products[scope.$index].tax/100).toFixed(2)|money }}</template>
                </el-table-column>
                <el-table-column width="200" label="Tiền hàng">
                    <template
                        slot-scope="scope"
                    >{{ (products[scope.$index].quantity*products[scope.$index].price).toFixed(2)|money }}</template>
                </el-table-column>
                <el-table-column fixed="right" align="center" label="Xóa" v-if="!isShow" width="50">
                    <template slot-scope="scope">
                        <el-button
                            circle
                            type="danger"
                            @click="deleteProduct(scope.$index)"
                            icon="el-icon-delete"
                            size="mini"
                        ></el-button>
                    </template>
                </el-table-column>
            </el-table>
        </el-form>
        <el-col :span="8" :offset="16">
            <p>Tổng tiền hàng: {{ total.toFixed(2)|money }} đ</p>
            <p>Tổng tiền thuế: {{ (tax).toFixed(2)|money }} đ</p>
            <p>Tổng tiền chiết khấu: {{ discount.toFixed(2)|money }} đ</p>
            <p>Phí giao hàng: {{ (fee).toFixed(2)|money }} đ</p>
            <p>Tổng thanh toán: {{ (total+tax+fee-discount).toFixed(2)|money }} đ</p>
        </el-col>
    </el-row>
</template>

<script>
export default {
    props: ["products", "isShow", "shippingFee"],
    computed: {
        fee() {
            return this.shippingFee != "" ? Number(this.shippingFee) : 0;
        },
        total() {
            if (this.products.length == 0) return 0;
            return this.products
                .map(item => item.quantity * item.price)
                .reduce((total, value) => total + value);
        },
        tax() {
            if (this.products.length == 0) return 0;
            return this.products
                .map(item => (item.quantity * item.price * item.tax) / 100)
                .reduce((total, value) => total + value);
        },
        discount() {
            if (this.products.length == 0) return 0;
            return this.products
                .map(item => (item.quantity * item.price * item.discount) / 100)
                .reduce((total, value) => total + value);
        }
    },
    data() {
        return {
            rules: [{}]
        };
    },

    methods: {
        deleteProduct(index) {
            this.products.splice(index, 1);
        }
    }
};
</script>

<style scoped>
.mb-0 {
    margin-bottom: 0;
}
</style>