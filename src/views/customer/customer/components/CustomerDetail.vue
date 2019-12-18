<template>
    <el-row>
        <el-col :span="24">
            <el-button v-if="isEdit" @click="updateCustomer" type="success" class="fr">Cập nhật</el-button>
            <el-button size="medium" v-else @click="createCustomer" type="primary" class="fr">Lưu</el-button>
        </el-col>
        <el-form :model="form" :rules="rules" ref="form" label-position="left" label-width="135px">
            <el-col style="margin-top:20px" :span="24">
                <el-card>
                    <div slot="header">
                        <span>Thông tin khách hàng</span>
                    </div>
                    <el-row :gutter="30">
                        <el-col :md="12" :sm="24">
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
                                <el-input placeholder="Nhập mã" v-model="form.code"></el-input>
                            </el-form-item>
                            <el-form-item label="Tên" prop="name">
                                <el-input placeholder="Nhập tên" v-model="form.name"></el-input>
                            </el-form-item>
                            <el-form-item label="Email" prop="email">
                                <el-input placeholder="Nhập email" v-model="form.email"></el-input>
                            </el-form-item>
                            <el-form-item label="Số điện thoại" prop="phone_number">
                                <el-input
                                    placeholder="Nhập số điện thoại"
                                    v-model="form.phone_number"
                                ></el-input>
                            </el-form-item>
                            <el-form-item label="Số di động" prop="mobile_number">
                                <el-input
                                    placeholder="Nhập số di động"
                                    v-model="form.mobile_number"
                                ></el-input>
                            </el-form-item>
                            <el-form-item label="Fax">
                                <el-input placeholder="Nhập số fax" v-model="form.fax"></el-input>
                            </el-form-item>
                            <el-form-item label="Địa chỉ văn phòng">
                                <el-input
                                    placeholder="Nhập địa chỉ văn phòng"
                                    v-model="form.office_address"
                                ></el-input>
                            </el-form-item>
                            <el-form-item label="Địa chỉ hóa đơn">
                                <el-input
                                    placeholder="Nhập địa chỉ hóa đơn"
                                    v-model="form.invoice_address"
                                ></el-input>
                            </el-form-item>
                            <el-form-item label="Địa chỉ giao hàng">
                                <el-input
                                    placeholder="Nhập địa chỉ giao hàng"
                                    v-model="form.delivery_address"
                                ></el-input>
                            </el-form-item>
                        </el-col>
                        <el-col :span="12">
                            <el-form-item label="Website">
                                <el-input placeholder="Website" v-model="form.website"></el-input>
                            </el-form-item>
                            <el-form-item label="Khách hàng cha">
                                <el-input
                                    ref="input"
                                    @focus="openDialog"
                                    clearable
                                    @clear="form.parent_id=''"
                                    v-model="name"
                                    placeholder="Chọn khách hàng cha"
                                ></el-input>
                            </el-form-item>

                            <el-form-item label="Loại khách hàng">
                                <el-select
                                    style="width:100%"
                                    v-model="form.type_id"
                                    placeholder="Chọn loại khách hàng"
                                >
                                    <el-option
                                        v-for="item in catalogs['Loại']"
                                        :key="item.id"
                                        :label="item.name"
                                        :value="item.id"
                                    ></el-option>
                                </el-select>
                            </el-form-item>
                            <el-form-item label="Nguồn">
                                <el-select
                                    style="width:100%"
                                    v-model="form.source_id"
                                    placeholder="Nguồn"
                                >
                                    <el-option
                                        v-for="item in catalogs['Nguồn']"
                                        :key="item.id"
                                        :label="item.name"
                                        :value="item.id"
                                    ></el-option>
                                </el-select>
                            </el-form-item>

                            <el-form-item label="Ngành nghề">
                                <el-select
                                    style="width:100%"
                                    v-model="form.branch_id"
                                    placeholder="Chọn ngành nghề"
                                >
                                    <el-option
                                        v-for="item in catalogs['Ngành nghề']"
                                        :key="item.id"
                                        :label="item.name"
                                        :value="item.id"
                                    ></el-option>
                                </el-select>
                            </el-form-item>
                            <el-form-item label="Số nhân viên">
                                <el-input
                                    placeholder="Nhập số nhân viên"
                                    v-model="form.number_of_workers"
                                ></el-input>
                            </el-form-item>
                            <el-form-item label="Doanh thu">
                                <el-input
                                    type="number"
                                    placeholder="Nhập doanh thu"
                                    style="width:100%"
                                    v-model="form.revenue"
                                ></el-input>
                            </el-form-item>
                            <el-form-item label="Mã số thuế">
                                <el-input placeholder="Nhập mã số thuế" v-model="form.tax_code"></el-input>
                            </el-form-item>
                            <el-form-item label="Đánh giá">
                                <el-input
                                    placeholder="Nhập đánh giá"
                                    type="number"
                                    v-model="form.evaluate"
                                ></el-input>
                            </el-form-item>
                            <el-form-item label="Sinh nhật">
                                <el-date-picker
                                    class="w-100"
                                    v-model="form.birthday"
                                    type="date"
                                    placeholder="Chọn ngày sinh"
                                    format="dd/MM/yyyy"
                                    value-format="yyyy-MM-dd"
                                ></el-date-picker>
                            </el-form-item>
                        </el-col>
                    </el-row>
                </el-card>
            </el-col>
            <el-col style="margin-top:20px" :span="24">
                <el-card>
                    <div slot="header">Thông tin mô tả</div>
                    <el-input v-model="form.description" type="textarea"></el-input>
                </el-card>
            </el-col>
        </el-form>
        <SelectCustomer
            @handle-select="handleSelect"
            type="App\Customer"
            :show-dialog.sync="showDialog"
        />
    </el-row>
</template>
<script>
import SelectCustomer from "@/components/dialogs/SelectCustomer/index";

import { store, show, update } from "@/api/customer/customer";
import {
    validateMobileNumberWithEmptyValue,
    validatePhoneNumber
} from "@/utils/validate";
import TagArea from "@/components/TagArea/index";
import { list } from "@/api/setting/catalog";
export default {
    props: ["isEdit"],
    components: { TagArea, SelectCustomer },
    data() {
        return {
            showDialog: false,
            name: "",
            form: {
                id: "",
                ownerable_type: "App\\User",
                ownerable_id: "",
                code: "",
                name: "",
                email: "",
                phone_number: "",
                mobile_number: "",
                office_address: "",
                invoice_address: "",
                delivery_address: "",
                description: "",
                tax_code: "",
                birthday: "",
                website: "",
                parent_id: "",
                number_of_workers: "",
                branch_id: "",
                revenue: "",
                evaluate: "",
                parent_id: "",
                fax: "",
                type_id: "",
                source_id: ""
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
                        message: "Hãy nhập mã khách hàng",
                        trigger: "blur"
                    }
                ],
                name: [
                    {
                        required: true,
                        message: "Hãy nhập tên khách hàng",
                        trigger: "blur"
                    }
                ],
                email: [
                    {
                        type: "email",
                        message: "Bạn hãy nhập một địa chỉ email",
                        trigger: "blur"
                    }
                ],
                phone_number: [
                    {
                        validator: validatePhoneNumber,
                        trigger: "blur"
                    }
                ],
                mobile_number: [
                    {
                        validator: validateMobileNumberWithEmptyValue,
                        trigger: "blur"
                    }
                ]
            },
            catalogs: {
                Nguồn: [],
                Loại: [],
                "Ngành nghề": []
            },
            option: {}
        };
    },
    methods: {
        handleSelect(val) {
            this.name = val.name;
            this.form.parent_id = val.id;
        },
        openDialog() {
            this.showDialog = true;
            this.$refs["input"].blur();
        },
        async createCustomer() {
            try {
                await this.$refs["form"].validate();
                this.openFullScreen();
                const { data } = await store(this.form);
                this.closeFullScreen();
                this.$router.push(`/customer/customer/show/${data.id}`);
            } catch (error) {
                console.log(error);
                this.closeFullScreen();
            }
        },
        async getCustomer() {
            try {
                this.openFullScreen();
                const { data } = await show(this.$route.params.id, {
                    edit: true
                });
                this.name = data.parent;
                for (let field in this.form) {
                    this.form[field] = data[field];
                }
                this.closeFullScreen();
            } catch (error) {
                console.log(error);
                this.closeFullScreen();
            }
        },
        async updateCustomer() {
            try {
                this.openFullScreen();

                await this.$refs["form"].validate();

                await update(this.form, this.$route.params.id);
                this.closeFullScreen();
                this.$router.push(
                    `/customer/customer/show/${this.$route.params.id}`
                );
            } catch (error) {
                console.log(error);
                this.closeFullScreen();
            }
        }
    },
    created() {
        Promise.all([
            this.getCatalog("Khách hàng", "Nguồn"),
            this.getCatalog("Khách hàng", "Loại"),
            this.getCatalog("Khách hàng", "Ngành nghề"),
            this.getUsers(),
            this.getGroups()
        ]);
        if (this.isEdit) this.getCustomer();
    }
};
</script>
