<template>
    <el-row>
        <el-card>
            <el-row slot="header">
                <el-col style="margin-top:10px" :span="12">Thông tin báo giá</el-col>
                <el-col :span="12">
                    <el-button
                        v-if="isEdit"
                        size="small"
                        @click="updateQuote"
                        type="success"
                        class="fr"
                    >Cập nhật</el-button>
                    <el-button
                        size="small"
                        v-else
                        @click="createQuote"
                        type="primary"
                        class="fr"
                    >Lưu</el-button>
                </el-col>
            </el-row>
            <el-row :gutter="30">
                <el-form
                    :disabled="isShow"
                    :model="form"
                    :rules="rules"
                    ref="form"
                    label-position="left"
                    label-width="150px"
                >
                    <el-col :span="12">
                        <el-form-item label="Chủ sở hữu" prop="ownerable_id">
                            <el-row>
                                <el-col :span="6">
                                    <el-select
                                        v-model="form.ownerable_type"
                                        @change="form.ownerable_id=''"
                                    >
                                        <el-option value="App\User" label="Nhân viên"></el-option>
                                        <el-option value="App\Group" label="Nhóm"></el-option>
                                    </el-select>
                                </el-col>
                                <el-col :span="18">
                                    <el-select
                                        class="w-100"
                                        v-model="form.ownerable_id"
                                        filterable
                                        placeholder="Chọn chủ sở hữu"
                                    >
                                        <template v-if="form.ownerable_type=='App\\User'">
                                            <el-option
                                                style="max-height:100%"
                                                v-for="item in userOptions"
                                                :key="item.id"
                                                :label="item.name"
                                                :value="item.id"
                                            >
                                                <span style="float: left">{{ item.name }}</span>
                                                <span
                                                    style="float: right; color: #8492a6; font-size: 13px"
                                                >{{ item.email }}</span>
                                            </el-option>
                                        </template>
                                        <template v-else>
                                            <el-option
                                                style="max-height:100%"
                                                v-for="item in groupOptions"
                                                :key="item.id"
                                                :disabled="item.count==0"
                                                :label="item.name"
                                                :value="item.id"
                                            >
                                                <span style="float: left">{{ item.name }}</span>
                                                <span
                                                    style="float: right; color: #8492a6; font-size: 13px"
                                                >{{ item.count+' nhân viên' }}</span>
                                            </el-option>
                                        </template>
                                    </el-select>
                                </el-col>
                            </el-row>
                        </el-form-item>
                        <el-form-item label="Mã" prop="code">
                            <el-input v-model="form.code"></el-input>
                        </el-form-item>
                        <el-form-item label="Khách hàng" prop="customer_id">
                            <el-input
                                ref="input"
                                @focus="openDialog('customer')"
                                clearable
                                @clear="form.customer_id='';form.customer_id='';form.opportunity_id='';form.contact_id='';contact='';opportunity=''"
                                v-model="customer"
                                placeholder="Chọn khách hàng"
                            ></el-input>
                        </el-form-item>
                        <el-form-item label="Liên hệ">
                            <el-input
                                ref="input1"
                                :disabled="!form.customer_id"
                                @focus="openDialog('contact')"
                                clearable
                                @clear="form.contact_id=''"
                                v-model="contact"
                                placeholder="Chọn liên hệ"
                            ></el-input>
                        </el-form-item>
                        <el-form-item label="Cơ hội">
                            <el-input
                                ref="input2"
                                :disabled="!form.customer_id"
                                @focus="openDialog('opportunity')"
                                clearable
                                @clear="form.opportunity_id=''"
                                v-model="opportunity"
                                placeholder="Chọn cơ hội"
                            ></el-input>
                        </el-form-item>
                        <el-form-item label="Phí giao hàng">
                            <el-input
                                type="number"
                                min="0"
                                placeholder="Nhập phí giao hàng"
                                v-model="form.shipping_fee"
                            ></el-input>
                        </el-form-item>
                    </el-col>
                    <el-col :span="12">
                        <el-form-item label="Ngày báo giá">
                            <el-date-picker
                                v-model="form.quote_date"
                                style="width:100%"
                                type="date"
                                :clearable="false"
                                align="center"
                                format="dd/MM/yyyy"
                                value-format="yyyy-MM-dd"
                            ></el-date-picker>
                        </el-form-item>
                        <el-form-item label="Ngày hết hiệu lực">
                            <el-date-picker
                                v-model="form.expiration_date"
                                placeholder="Chọn ngày hết hiệu lực"
                                style="width:100%"
                                type="date"
                                :clearable="false"
                                align="center"
                                format="dd/MM/yyyy"
                                value-format="yyyy-MM-dd"
                            ></el-date-picker>
                        </el-form-item>
                        <el-form-item label="Trạng thái">
                            <el-select
                                style="width:100%"
                                v-model="form.status_id"
                                placeholder="Chọn trạng thái"
                            >
                                <el-option
                                    v-for="item in catalogs['Trạng thái']"
                                    :key="item.id"
                                    :label="item.name"
                                    :value="item.id"
                                ></el-option>
                            </el-select>
                        </el-form-item>
                        <el-form-item label="Tỷ giá">
                            <el-input placeholder="Nhập tỷ giá" v-model="form.exchange_rate"></el-input>
                        </el-form-item>
                        <el-form-item label="Địa chỉ giao hàng">
                            <el-input
                                placeholder="Nhập địa chỉ giao hàng"
                                v-model="form.delivery_address"
                            ></el-input>
                        </el-form-item>
                        <el-form-item label="Địa chỉ hóa đơn">
                            <el-input
                                placeholder="Nhập địa chỉ hóa đơn"
                                v-model="form.invoice_address"
                            ></el-input>
                        </el-form-item>
                    </el-col>
                </el-form>
            </el-row>
        </el-card>
        <el-card style="margin-top:5px">
            <div slot="header">Thông tin mô tả</div>
            <el-input type="textarea" v-model="form.description" placeholder="Nhập thông tin mô tả"></el-input>
        </el-card>
        <el-card style="margin-top:5px">
            <div slot="header">Giấy phép và điều kiện</div>
            <el-input
                type="textarea"
                v-model="form.license_and_conditions"
                placeholder="Nhập thông tin về giấy phép và điều kiện"
            ></el-input>
        </el-card>
        <el-card style="margin-top:5px">
            <div slot="header">Vận chuyển</div>
            <el-input
                type="textarea"
                v-model="form.transport"
                placeholder="Nhập thông tin vận chuyển"
            ></el-input>
        </el-card>
        <el-card style="margin-top:5px">
            <div slot="header">
                <el-button @click="showDialog2=true" type="primary" size="small">Thêm sản phẩm</el-button>
            </div>
            <ProductList
                :shipping-fee="form.shipping_fee"
                :is-show="isShow"
                :products="form.products"
                :warehouses="warehouses"
            />
            <SelectProductTable
                @select-product="handleSelectProduct($event)"
                :show-dialog.sync="showDialog2"
            />
        </el-card>
        <SelectCustomer
            @handle-select="handleSelect"
            :type="type"
            :show-dialog.sync="showDialog"
            :customer="form.customer_id"
        />
        <SelectOpportunity
            @handle-select="handleSelect"
            :type="type"
            :show-dialog.sync="showDialog1"
            :customer="form.customer_id"
        />
    </el-row>
</template>
<script>
import SelectCustomer from "@/components/dialogs/SelectCustomer/index";
import SelectOpportunity from "@/components/dialogs/SelectOpportunity/index";

import ProductList from "./ProductList";
import SelectProductTable from "@/components/dialogs/SelectProduct/index";
import { store, show, update, clone } from "@/api/business/quote";
import { show as getOrder } from "@/api/business/order";
export default {
    components: {
        ProductList,
        SelectProductTable,
        SelectCustomer,
        SelectOpportunity
    },
    props: ["isEdit", "isShow", "cus", "oppor"],
    data() {
        return {
            type: "",
            customer: "",
            opportunity: "",
            contact: "",
            showDialog: false,
            showDialog1: false,
            showDialog2: false,
            form: {
                id: "",
                code: "",
                ownerable_type: "App\\User",
                ownerable_id: "",
                customer_id: "",
                contact_id: "",
                shipping_fee: "",
                opportunity_id: "",
                quote_date:
                    new Date().getFullYear() +
                    "-" +
                    (new Date().getMonth() + 1) +
                    "-" +
                    new Date().getDate(),
                expiration_date: "",
                status_id: "",
                delivery_address: "",
                invoice_address: "",
                products: [],
                exchange_rate: "",
                description: "",
                license_and_conditions: "",
                transport: ""
            },

            loading: "",
            warehouses: [],
            rules: {
                code: [
                    {
                        required: true,
                        message: "Hãy nhập mã báo giá",
                        trigger: "blur"
                    }
                ],
                customer_id: [
                    {
                        required: true,
                        message: "Hãy chọn khách hàng"
                    }
                ],
                ownerable_id: [
                    {
                        required: true,
                        message: "Hãy chọn chủ sở hữu",
                        trigger: "blur"
                    }
                ]
            },
            catalogs: {
                "Trạng thái": []
            }
        };
    },
    methods: {
        openDialog(type) {
            if (type != "opportunity") {
                if (type == "customer") this.type = "App\\Customer";
                else this.type = "App\\Contact";
                this.showDialog = true;
            } else {
                this.type = "App\\Opportunity";
                this.showDialog1 = true;
            }
            this.$refs["input"].blur();
            this.$refs["input1"].blur();
            this.$refs["input2"].blur();
        },
        handleSelect(val) {
            if (this.type == "App\\Customer") {
                this.customer = val.name;
                this.form.customer_id = val.id;
                this.form.contact_id = "";
                this.contact = "";
            } else if (this.type == "App\\Contact") {
                this.contact = val.name;
                this.form.contact_id = val.id;
            } else {
                this.opportunity = val.name;
                this.form.opportunity_id = val.id;
            }
        },
        async createQuote() {
            try {
                await this.$refs["form"].validate();
                if (!this.validateQuoteInfo()) return;
                this.openFullScreen();
                const { data } = await store(this.form);

                this.closeFullScreen();
                if (this.cus || this.oppor) {
                    this.$router.go(-1);
                } else this.$router.push(`/business/quote/show/${data.id}`);
            } catch (error) {
                console.log(error);
                this.closeFullScreen();
            }
        },
        async getQuote() {
            try {
                this.openFullScreen();
                let id = this.$route.params.id || this.$route.query.cloneId;
                const { data } = await show(id);
                this.contact = data.contact;
                this.customer = data.customer;
                this.opportunity = data.opportunity
                    ? data.opportunity.name
                    : "";
                for (let field in this.form) {
                    this.form[field] = data[field];
                }
                if (this.$route.query.cloneId) {
                    this.form.code = "";
                    this.form.id = "";
                }
                this.closeFullScreen();
            } catch (error) {
                console.log(error);
                this.closeFullScreen();
            }
        },
        async getOrder(id) {
            try {
                this.openFullScreen();
                const { data } = await getOrder(id);
                this.customer = data.customer.name;
                this.contact = data.contact ? data.contact.name : "";
                this.opportunity = data.opportunity
                    ? data.opportunity.name
                    : "";
                this.quote = data.quote ? data.quote.code : "";
                for (let field in this.form) {
                    if (
                        field == "ownerable_type" ||
                        field == "ownerable_id" ||
                        field == "customer_id" ||
                        field == "opportunity" ||
                        field == "contact_id" ||
                        field == "delivery_address" ||
                        field == "products"
                    )
                        this.form[field] = data[field];
                }
                if (this.$route.query.cloneId) this.form.code = "";
                this.closeFullScreen();
            } catch (error) {
                console.log(error);
                this.closeFullScreen();
            }
        },
        async updateQuote() {
            try {
                this.openFullScreen();
                await this.$refs["form"].validate();
                if (!this.validateQuoteInfo()) return;
                let data = await update(this.form, this.$route.params.id);
                this.closeFullScreen();
                this.$router.push(
                    `/business/quote/show/${this.$route.params.id}`
                );
            } catch (error) {
                console.log(error);
                this.closeFullScreen();
            }
        },

        handleSelectProduct(val) {
            let newProduct = {
                name: val.name,
                code: val.code,
                product_id: val.id,
                discount: 0,
                quantity: 1,
                price: val.sale_price,
                tax: val.tax
            };
            this.form.products.push(newProduct);
        },
        validateQuoteInfo() {
            if (this.form.products.length == 0) {
                this.$message.error("Chưa có sản phẩm nào");
                return false;
            }
            let wrongProduct = this.form.products.filter(
                item =>
                    item.quantity == undefined ||
                    item.discount == undefined ||
                    item.tax == undefined ||
                    item.price == undefined
            );
            if (wrongProduct.length > 0) {
                this.$message.error(
                    "Chiết khấu, số lượng, thuế và giá không được để trống!"
                );
                return false;
            }
            let duplicateProduct = false;
            this.form.products.forEach(product => {
                let check = this.form.products.filter(
                    item => item.product_id == product.product_id
                );
                if (check.length > 1) {
                    duplicateProduct = true;
                    return;
                }
            });

            if (duplicateProduct) {
                this.$message.error("Trùng sản phẩm");
                return false;
            }
            return true;
        }
    },
    created() {
        if (this.cus) {
            console.log(this.form);
            this.form.customer_id = this.cus.id;
            this.customer = this.cus.name;
            this.form.delivery_address = this.cus.delivery_address;
            this.form.invoice_address = this.cus.invoice_address;
        } else if (this.oppor) {
            this.form.customer_id = this.oppor.customer.id;
            this.customer = this.oppor.customer.name;
            this.form.delivery_address = this.oppor.customer.delivery_address;
            this.form.invoice_address = this.oppor.customer.invoice_address;
            this.opportunity = this.oppor.name;
            this.form.opportunity_id = this.oppor.id;
            this.form.contact_id = this.oppor.contact
                ? this.oppor.contact.id
                : null;
            this.contact = this.oppor.contact ? this.oppor.contact.name : null;
        }
        if (this.$route.query.cloneId) {
            this.getQuote();
        }
        if (this.$route.query.orderId) {
            this.getOrder(this.$route.query.orderId);
        }
        Promise.all([
            this.getCatalog("Báo giá", "Trạng thái"),
            this.getUsers(),
            this.getGroups()
        ]);
        if (this.isEdit) this.getQuote();
    }
};
</script>
