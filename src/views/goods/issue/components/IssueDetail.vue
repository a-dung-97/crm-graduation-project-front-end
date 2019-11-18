<template>
    <el-row
        v-loading.fullscreen.lock="loading"
        element-loading-text="Xin vui lòng chờ"
        element-loading-background="rgba(0, 0, 0, 0.8)"
    >
        <el-card>
            <el-row slot="header">
                <el-col style="margin-top:10px" :span="12">Thông tin phiếu xuất</el-col>

                <el-col v-if="!isShow" :span="12">
                    <el-button
                        @click="createIssue"
                        v-if="!isEdit"
                        type="primary"
                        size="small"
                        class="fr"
                    >Thêm phiếu xuất</el-button>
                    <el-button
                        v-else
                        @click="updateIssue"
                        type="primary"
                        size="small"
                        class="fr"
                    >Sửa phiếu xuất</el-button>
                </el-col>
                <el-col v-else :span="12">
                    <el-button
                        :disabled="form.confirmed"
                        @click="$router.push(`/goods/issue/edit/${form.id}`)"
                        type="primary"
                        size="small"
                        class="fr"
                    >Sửa phiếu xuất</el-button>
                </el-col>
            </el-row>
            <el-row :gutter="30">
                <el-form
                    :disabled="isShow"
                    :model="form"
                    :rules="rules"
                    ref="form"
                    label-position="left"
                    label-width="200px"
                >
                    <el-col :span="12">
                        <el-form-item label="Mã phiếu xuất" prop="code">
                            <el-input v-model="form.code"></el-input>
                        </el-form-item>
                        <el-form-item label="Người giao hàng">
                            <el-input v-model="form.delivery_man"></el-input>
                        </el-form-item>
                        <el-form-item label="Ngày giao hàng">
                            <el-date-picker
                                v-model="form.delivery_date"
                                style="width:100%"
                                type="date"
                                :clearable="false"
                                align="center"
                                format="dd/MM/yyyy"
                                value-format="yyyy-MM-dd"
                            ></el-date-picker>
                        </el-form-item>
                        <el-form-item label="Mô tả">
                            <el-input type="textarea" v-model="form.description"></el-input>
                        </el-form-item>
                    </el-col>
                    <el-col :span="12">
                        <el-form-item label="Ngày xuất phiếu">
                            <el-date-picker
                                v-model="form.date"
                                style="width:100%"
                                type="date"
                                :clearable="false"
                                align="center"
                                format="dd/MM/yyyy"
                                value-format="yyyy-MM-dd"
                            ></el-date-picker>
                        </el-form-item>
                        <el-form-item label="Trạng thái">
                            <el-switch
                                v-model="form.confirmed"
                                active-text="Đã xác nhận"
                                inactive-text="Chưa xác nhận"
                            ></el-switch>
                        </el-form-item>
                        <el-form-item label="Người nhận hàng">
                            <el-input v-model="form.recipient"></el-input>
                        </el-form-item>
                        <el-form-item label="SĐT người nhận hàng" prop="phone_number">
                            <el-input v-model.trim="form.phone_number" />
                        </el-form-item>
                    </el-col>
                </el-form>
            </el-row>
        </el-card>

        <el-card style="margin-top:10px">
            <div slot="header">
                <el-button
                    v-if="!isShow"
                    @click="showDialog=true"
                    type="primary"
                    size="small"
                >Thêm sản phẩm</el-button>
                <span v-else>Thông tin sản phẩm</span>
            </div>
            <ProductList :is-show="isShow" :products="form.products" :warehouses="warehouses" />
            <SelectProductTable
                @select-product="handleSelectProduct($event)"
                :show-dialog.sync="showDialog"
            />
        </el-card>
    </el-row>
</template>
<script>
import ProductList from "./ProductList";
import { validatePhoneNumber } from "@/utils/validate";
import SelectProductTable from "@/components/dialogs/SelectProduct/index";
import { store, show, update } from "@/api/goods/issue";
import { index as getWareHouses } from "@/api/goods/warehouse";
export default {
    components: { ProductList, SelectProductTable },
    props: ["isEdit", "isShow"],
    data() {
        const date =
            new Date().getFullYear() +
            "-" +
            (new Date().getMonth() + 1) +
            "-" +
            new Date().getDate();
        return {
            showDialog: false,
            form: {
                id: "",
                code: "",
                description: "",
                delivery_man: "",
                delivery_date: date,
                date: date,
                recipient: "",
                phone_number: "",
                confirmed: false,
                products: []
            },

            loading: "",
            warehouses: [],
            rules: {
                code: [
                    {
                        required: true,
                        message: "Hãy xuất mã phiếu xuất",
                        trigger: "blur"
                    }
                ],
                phone_number: [
                    {
                        required: true,
                        validator: validatePhoneNumber,
                        trigger: "blur"
                    }
                ]
            }
        };
    },
    methods: {
        async createIssue() {
            try {
                await this.$refs["form"].validate();
                if (!this.validateIssueInfo()) return;
                this.loading = true;
                const { data } = await store(this.form);
                this.loading = false;
                this.$router.push(`/goods/issue/show/${data.id}`);
            } catch (error) {
                if (error.response) {
                    this.handleErrors(error);
                    this.loading = false;
                }
            }
        },
        handleErrors(error) {
            let errorProduct = error.response.data.data;
            if (errorProduct.quantity === null)
                this.$message.error(
                    `Không tồn tại sản phẩm ${errorProduct.product} trong kho ${errorProduct.warehouse}`
                );
            else
                this.$message.error(
                    `Sản phẩm ${errorProduct.product} trong kho ${errorProduct.warehouse} chỉ còn ${errorProduct.quantity} ${errorProduct.unit}`
                );
        },
        async getIssue() {
            try {
                this.loading = true;
                const { data } = await show(this.$route.params.id);
                if (this.isEdit && data.confirmed) {
                    this.$router.push("/404");
                }
                for (let field in this.form) {
                    this.form[field] = data[field];
                }
                this.loading = false;
            } catch (error) {
                console.log(error);
                this.loading = false;
            }
        },
        async updateIssue() {
            try {
                this.loading = true;
                await this.$refs["form"].validate();
                if (!this.validateIssueInfo()) return;
                let data = await update(this.form, this.$route.params.id);
                this.loading = false;
                this.$router.push(`/goods/issue/show/${this.$route.params.id}`);
            } catch (error) {
                if (error.response) {
                    this.handleErrors(error);
                    this.loading = false;
                }
            }
        },
        async getWareHouses() {
            try {
                const { data } = await getWareHouses();
                this.warehouses = data;
            } catch (error) {
                console.log(error);
            }
        },
        handleSelectProduct(val) {
            let newProduct = {
                name: val.name,
                code: val.code,
                product_id: val.id,
                warehouse_id: "",
                quantity: 1,
                unit: val.unit,
                price: val.sale_price,
                tax: val.tax
            };
            this.form.products.push(newProduct);
        },
        validateIssueInfo() {
            if (this.form.products.length == 0) {
                this.$message.error("Chưa có sản phẩm nào");
                return false;
            }
            let wrongProduct = this.form.products.filter(
                item =>
                    item.warehouse_id == "" ||
                    item.quantity == undefined ||
                    item.tax == undefined ||
                    item.price == undefined
            );
            if (wrongProduct.length > 0) {
                this.$message.error(
                    "Kho, số lượng, thuế và giá không được để trống!"
                );
                return false;
            }
            let duplicateProduct = false;
            this.form.products.forEach(product => {
                let check = this.form.products.filter(
                    item =>
                        item.product_id == product.product_id &&
                        item.warehouse_id == product.warehouse_id
                );
                if (check.length > 1) {
                    duplicateProduct = true;
                    return;
                }
            });

            if (duplicateProduct) {
                this.$message.error("Trùng sản phẩm và kho");
                return false;
            }

            return true;
        }
    },
    created() {
        if (this.isEdit || this.isShow) this.getIssue();
        this.getWareHouses();
    }
};
</script>
