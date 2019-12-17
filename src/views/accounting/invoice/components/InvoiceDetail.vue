<template>
    <el-row>
        <el-col :span="24">
            <el-button v-if="isEdit" @click="updateInvoice" type="success" class="fr">Cập nhật</el-button>
            <el-button size="medium" v-else @click="createInvoice" type="primary" class="fr">Lưu</el-button>
        </el-col>
        <el-form :model="form" :rules="rules" ref="form" label-position="left" label-width="170px">
            <el-col style="margin-top:20px" :span="24">
                <el-card>
                    <div slot="header">
                        <span>Thông tin hóa đơn</span>
                    </div>
                    <el-row :gutter="30">
                        <el-col :md="12" :sm="24">
                            <el-form-item label="Chủ sở hữu" prop="ownerable_id">
                                <el-row>
                                    <el-col :span="7">
                                        <el-select
                                            v-model="form.ownerable_type"
                                            @change="form.ownerable_id=''"
                                        >
                                            <el-option value="App\User" label="Nhân viên"></el-option>
                                            <el-option value="App\Group" label="Nhóm"></el-option>
                                        </el-select>
                                    </el-col>
                                    <el-col :span="17">
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
                            <el-form-item label="Mã hóa đơn">
                                <el-input placeholder="Nhập mã hóa đơn" v-model="form.code"></el-input>
                            </el-form-item>
                            <el-form-item label="Đơn hàng" prop="order_id">
                                <el-input
                                    ref="input"
                                    @focus="openDialog"
                                    clearable
                                    @clear="form.customer=''"
                                    v-model="order"
                                    placeholder="Chọn đơn hàng"
                                ></el-input>
                            </el-form-item>
                            <el-form-item label="Khách hàng">
                                <el-input disabled v-model="form.customer"></el-input>
                            </el-form-item>
                            <el-form-item label="Ngày hết hạn">
                                <el-date-picker
                                    class="w-100"
                                    v-model="form.expiration_date"
                                    type="date"
                                    placeholder="Chọn ngày hết hạn"
                                    format="dd/MM/yyyy"
                                    value-format="yyyy-MM-dd"
                                ></el-date-picker>
                            </el-form-item>
                        </el-col>
                        <el-col :span="12">
                            <el-form-item label="Số tiền thanh toán" prop="payment_amount">
                                <el-input
                                    type="number"
                                    min="0"
                                    placeholder="Nhập số tiền thanh toán"
                                    v-model="form.payment_amount"
                                ></el-input>
                            </el-form-item>
                            <el-form-item label="Hình thức thanh toán" prop="payment_method">
                                <el-select
                                    style="width:100%"
                                    v-model="form.payment_method"
                                    size="small"
                                    placeholder="Chọn hình thức thanh toán"
                                >
                                    <el-option label="Tiền mặt" value="Tiền mặt"></el-option>
                                    <el-option label="Chuyển khoản" value="Chuyển khoản"></el-option>
                                </el-select>
                            </el-form-item>

                            <el-form-item label="Mã số thuế">
                                <el-input
                                    class="w-100"
                                    placeholder="Nhập mã số thuế"
                                    v-model="form.tax_code"
                                ></el-input>
                            </el-form-item>
                            <el-form-item label="Người phụ trách" prop="user_id">
                                <el-select
                                    class="w-100"
                                    v-model="form.user_id"
                                    size="small"
                                    clearable
                                    placeholder="Chọn người phụ trách"
                                >
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
                                </el-select>
                            </el-form-item>
                            <el-form-item label="Trạng thái">
                                <el-select
                                    style="width:100%"
                                    v-model="form.type_id"
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
                        </el-col>
                    </el-row>
                </el-card>
            </el-col>
            <el-col style="margin-top:20px" :span="24">
                <el-card>
                    <div slot="header">Ghi chú</div>
                    <el-input v-model="form.note" type="textarea"></el-input>
                </el-card>
            </el-col>
            <SelectOrderQuote
                @handle-select="handleSelect"
                type="order"
                :show-dialog.sync="showDialog"
            />
        </el-form>
    </el-row>
</template>
<script>
import { store, show, update } from "@/api/accounting/invoice";

import TagArea from "@/components/TagArea/index";
import SelectOrderQuote from "@/components/dialogs/SelectOrderQuote/index";

export default {
    props: ["isEdit", "ord"],
    components: { TagArea, SelectOrderQuote },
    data() {
        return {
            order: "",
            showDialog: false,
            form: {
                id: "",
                ownerable_type: "App\\User",
                ownerable_id: "",
                code: "",
                order_id: "",
                customer: "",
                expiration_date: "",
                status_id: "",
                payment_method: "",
                payment_amount: "",
                tax_code: "",
                user_id: "",
                note: ""
            },
            rules: {
                ownerable_id: [
                    {
                        required: true,
                        message: "Hãy chọn chủ sở hữu",
                        trigger: "blur"
                    }
                ],
                code: [
                    {
                        required: true,
                        message: "Hãy nhập mã hóa đơn",
                        trigger: "blur"
                    }
                ],
                order_id: [
                    {
                        required: true,
                        message: "Hãy chọn đơn hàng"
                    }
                ],
                user_id: [
                    {
                        required: true,
                        message: "Hãy chọn người phụ trách"
                    }
                ],
                payment_method: [
                    {
                        required: true,
                        message: "Hãy chọn hình thức thanh toán",
                        trigger: "blur"
                    }
                ],
                payment_amount: [
                    {
                        required: true,
                        message: "Hãy nhập số tiền thanh toán",
                        trigger: "blur"
                    }
                ]
            },
            catalogs: {
                Kiểu: [],
                Nguồn: [],
                "Trạng thái": []
            }
        };
    },
    methods: {
        openDialog() {
            this.showDialog = true;
            this.$refs["input"].blur();
        },
        handleSelect(val) {
            this.order = val.code;
            this.form.customer = val.customer;
            this.form.order_id = val.id;
        },
        async createInvoice() {
            try {
                await this.$refs["form"].validate();
                this.openFullScreen();
                const { data } = await store(this.form);
                this.closeFullScreen();
                if (this.ord) this.$router.go(-1);
                else this.$router.push(`/accounting/invoice/show/${data.id}`);
            } catch (error) {
                console.log(error);
                if (error.response) this.closeFullScreen();
            }
        },
        async getInvoice() {
            try {
                this.openFullScreen();
                const { data } = await show(this.$route.params.id, {
                    edit: true
                });
                this.order = data.order;
                for (let field in this.form) {
                    this.form[field] = data[field];
                }
                this.closeFullScreen();
                console.log(data);
            } catch (error) {
                console.log(error);
                this.closeFullScreen();
            }
        },
        async updateInvoice() {
            try {
                this.openFullScreen();
                await this.$refs["form"].validate();
                let data = await update(this.form, this.$route.params.id);
                this.closeFullScreen();
                this.$router.push(
                    `/accounting/invoice/show/${this.$route.params.id}`
                );
            } catch (error) {
                console.log(error);
                this.closeFullScreen();
            }
        }
    },
    created() {
        if (this.ord) {
            console.log(this.ord);
            this.order = this.ord.code;
            this.form.order_id = this.ord.id;
            this.form.customer = this.ord.customer.name;
            this.form.payment_amount = this.ord.total;
        }
        Promise.all([
            this.getCatalog("Hóa đơn", "Trạng thái"),
            this.getUsers(),
            this.getGroups()
        ]);
        if (this.isEdit) this.getInvoice();
    }
};
</script>
