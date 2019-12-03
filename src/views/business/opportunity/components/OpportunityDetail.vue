<template>
    <el-row>
        <el-col :span="24">
            <el-button v-if="isEdit" @click="updateOpportunity" type="success" class="fr">Cập nhật</el-button>
            <el-button size="medium" v-else @click="createOpportunity" type="primary" class="fr">Lưu</el-button>
        </el-col>
        <el-form :model="form" :rules="rules" ref="form" label-position="left" label-width="150px">
            <el-col style="margin-top:20px" :span="24">
                <el-card>
                    <div slot="header">
                        <span>Thông tin cơ hội</span>
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
                            <el-form-item label="Tên">
                                <el-input placeholder="Nhập tên" v-model="form.name"></el-input>
                            </el-form-item>
                            <el-form-item label="Khách hàng" prop="customer_id">
                                <el-input
                                    ref="input"
                                    @focus="openDialog('customer')"
                                    clearable
                                    @clear="form.customer_id=''"
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
                            <el-form-item label="Kiểu">
                                <el-select
                                    style="width:100%"
                                    v-model="form.type_id"
                                    placeholder="Chọn kiểu"
                                >
                                    <el-option
                                        v-for="item in catalogs['Kiểu']"
                                        :key="item.id"
                                        :label="item.name"
                                        :value="item.id"
                                    ></el-option>
                                </el-select>
                            </el-form-item>
                            <el-form-item label="Bước tiếp theo">
                                <el-input
                                    placeholder="Nhập bước tiếp theo"
                                    v-model="form.next_step"
                                ></el-input>
                            </el-form-item>
                        </el-col>
                        <el-col :span="12">
                            <el-form-item label="Ngày kết thúc" prop="end_date">
                                <el-date-picker
                                    class="w-100"
                                    v-model="form.end_date"
                                    type="date"
                                    placeholder="Chọn ngày kết thúc"
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
                            <el-form-item label="Nguồn">
                                <el-select
                                    style="width:100%"
                                    v-model="form.source_id"
                                    placeholder="Chọn nguồn"
                                >
                                    <el-option
                                        v-for="item in catalogs['Nguồn']"
                                        :key="item.id"
                                        :label="item.name"
                                        :value="item.id"
                                    ></el-option>
                                </el-select>
                            </el-form-item>
                            <el-form-item label="Xác suất thành công">
                                <el-input-number
                                    class="w-100"
                                    placeholder="Nhập xác suất thành công"
                                    v-model="form.probability_of_success"
                                    :precision="2"
                                    :step="1"
                                    :max="100"
                                    controls-position="right"
                                ></el-input-number>
                            </el-form-item>
                            <el-form-item label="Giá trị">
                                <el-input
                                    type="number"
                                    placeholder="Nhập giá trị"
                                    v-model="form.value"
                                ></el-input>
                            </el-form-item>
                            <el-form-item label="Doanh số kì vọng">
                                <el-input
                                    type="number"
                                    placeholder="Nhập doanh số kì vọng"
                                    v-model="form.expected_sales"
                                ></el-input>
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
            <SelectCustomer
                @handle-select="handleSelect"
                :type="type"
                :show-dialog.sync="showDialog"
                :customer="form.customer_id"
            />
        </el-form>
    </el-row>
</template>
<script>
import { store, show, update } from "@/api/business/opportunity";

import TagArea from "@/components/TagArea/index";
import SelectCustomer from "@/components/dialogs/SelectCustomer/index";

export default {
    props: ["isEdit", "user"],
    components: { TagArea, SelectCustomer },
    data() {
        return {
            type: "",
            customer: "",
            contact: "",
            showDialog: false,
            name: "",
            form: {
                id: "",
                ownerable_type: "App\\User",
                ownerable_id: "",
                name: "",
                customer_id: "",
                contact_id: "",
                type_id: "",
                next_step: "",
                end_date: "",
                status_id: "",
                source_id: "",
                probability_of_success: null,
                value: "",
                expected_sales: "",
                description: ""
            },
            rules: {
                ownerable_id: [
                    {
                        required: true,
                        message: "Hãy chọn chủ sở hữu",
                        trigger: "blur"
                    }
                ],
                customer_id: [
                    {
                        required: true,
                        message: "Hãy chọn khách hàng"
                    }
                ],
                name: [
                    {
                        required: true,
                        message: "Hãy nhập tên cơ hội",
                        trigger: "blur"
                    }
                ],
                end_date: [
                    {
                        required: true,
                        message: "Hãy chọn ngày kết thúc",
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
        openDialog(type) {
            if (type == "customer") this.type = "App\\Customer";
            else this.type = "App\\Contact";
            this.showDialog = true;
            this.$refs["input"].blur();
            this.$refs["input1"].blur();
        },
        handleSelect(val) {
            if (this.type == "App\\Customer") {
                this.customer = val.name;
                this.form.customer_id = val.id;
                this.form.contact_id = "";
                this.contact = "";
            } else {
                this.contact = val.name;
                this.form.contact_id = val.id;
            }
        },
        async createOpportunity() {
            try {
                await this.$refs["form"].validate();
                this.openFullScreen();
                const { data } = await store(this.form);
                this.closeFullScreen();
                this.$router.push(`/business/opportunity/show/${data.id}`);
            } catch (error) {
                console.log(error);
                if (error.response) this.closeFullScreen();
            }
        },
        async getOpportunity() {
            try {
                this.openFullScreen();
                const { data } = await show(this.$route.params.id, {
                    edit: true
                });
                this.customer = data.customer;
                this.contact = data.contact;
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
        async updateOpportunity() {
            try {
                this.openFullScreen();
                await this.$refs["form"].validate();
                let data = await update(this.form, this.$route.params.id);
                this.closeFullScreen();
                this.$router.push(
                    `/business/opportunity/show/${this.$route.params.id}`
                );
            } catch (error) {
                console.log(error);
                this.closeFullScreen();
            }
        }
    },
    created() {
        if (this.user) {
            console.log(this.form);
            this.form.customer_id = this.user.id;
            this.customer = this.user.name;
        }
        Promise.all([
            this.getCatalog("Cơ hội", "Kiểu"),
            this.getCatalog("Cơ hội", "Nguồn"),
            this.getCatalog("Cơ hội", "Trạng thái"),
            this.getUsers(),
            this.getGroups()
        ]);
        if (this.isEdit) this.getOpportunity();
    },
    mounted() {}
};
</script>
