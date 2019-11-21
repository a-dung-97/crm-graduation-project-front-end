<template>
    <el-row
        v-loading.fullscreen.lock="loading"
        element-loading-text="Xin vui lòng chờ"
        element-loading-background="rgba(0, 0, 0, 0.8)"
    >
        <el-col :span="24">
            <el-button v-if="isEdit" @click="updateLead" type="success" class="fr">Cập nhật</el-button>
            <el-button size="medium" v-else @click="createLead" type="primary" class="fr">Lưu</el-button>
        </el-col>
        <el-form :model="form" :rules="rules" ref="form" label-position="left" label-width="150px">
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
                            <el-form-item label="Họ tên đệm">
                                <el-input placeholder="Nhập họ tên đệm" v-model="form.first_name">
                                    <el-select
                                        style="width:80px"
                                        v-model="form.honorific"
                                        slot="prepend"
                                        placeholder="Chọn"
                                    >
                                        <el-option label="Ông" value="Ông"></el-option>
                                        <el-option label="Bà" value="Bà"></el-option>
                                        <el-option label="Anh" value="Anh"></el-option>
                                        <el-option label="Chị" value="Chị"></el-option>
                                    </el-select>
                                </el-input>
                            </el-form-item>
                            <el-form-item label="Email" prop="email">
                                <el-input placeholder="Nhập địa chỉ email" v-model="form.email"></el-input>
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
                        </el-col>
                        <el-col :span="12">
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
                            <el-form-item label="Tên" prop="last_name">
                                <el-input placeholder="Nhập tên" v-model="form.last_name"></el-input>
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
                            <el-form-item label="Facebook">
                                <el-input
                                    placeholder="Nhập địa chỉ Facebook"
                                    v-model="form.facebook"
                                ></el-input>
                            </el-form-item>
                        </el-col>
                    </el-row>
                </el-card>
            </el-col>
            <el-col style="margin-top:20px" :span="24">
                <el-card>
                    <div slot="header">
                        <span>Thông tin công ty</span>
                    </div>
                    <el-row :gutter="30">
                        <el-col :md="12" :sm="24">
                            <el-form-item label="Công ty">
                                <el-input placeholder="Nhập tên công ty" v-model="form.company"></el-input>
                            </el-form-item>
                            <el-form-item label="Mã số thuế">
                                <el-input placeholder="Nhập mã số thuế" v-model="form.tax_code"></el-input>
                            </el-form-item>
                            <el-form-item label="Số nhân viên">
                                <el-input
                                    type="number"
                                    placeholder="Nhập số nhân viên"
                                    v-model="form.number_of_workers"
                                ></el-input>
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
                        </el-col>
                        <el-col :md="12" :sm="24">
                            <el-form-item label="Website">
                                <el-input placeholder="Nhập địa chỉ website" v-model="form.website"></el-input>
                            </el-form-item>
                            <el-form-item prop="fax" label="Fax">
                                <el-input placeholder="Nhập số fax" v-model="form.fax"></el-input>
                            </el-form-item>
                            <el-form-item label="Doanh thu">
                                <el-input
                                    style="width:100%"
                                    v-model="form.revenue"
                                    placeholder="Nhập doanh thu"
                                    :min="0"
                                ></el-input>
                            </el-form-item>
                            <el-form-item label="Địa chỉ văn phòng">
                                <el-input placeholder="Nhập địa chỉ" v-model="form.office_address"></el-input>
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
    </el-row>
</template>
<script>
import { store, show, update } from "@/api/customer/lead";
import {
    validateMobileNumberWithEmptyValue,
    validatePhoneNumber
} from "@/utils/validate";
import TagArea from "@/components/TagArea/index";
import { list } from "@/api/setting/catalog";
export default {
    props: ["isEdit"],
    components: { TagArea },
    data() {
        return {
            form: {
                id: "",
                ownerable_type: "App\\User",
                ownerable_id: "",
                mobile_number: "",
                first_name: "",
                last_name: "",
                honorific: "",
                birthday: "",
                email: "",
                phone_number: "",
                facebook: "",
                status_id: "",
                source_id: "",
                company: "",
                website: "",
                tax_code: "",
                fax: "",
                number_of_workers: "",
                revenue: "",
                branch_id: "",
                office_address: "",
                description: ""
            },
            loading: "",
            rules: {
                ownerable_id: [
                    {
                        required: true,
                        message: "Hãy chọn chủ sở hữu",
                        trigger: "blur"
                    }
                ],
                last_name: [
                    {
                        required: true,
                        message: "Hãy nhập tên tiềm năng",
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
                ],
                fax: [
                    {
                        validator: validatePhoneNumber,
                        trigger: "blur"
                    }
                ]
            },
            catalogs: {
                Nguồn: [],
                "Trạng thái": [],
                "Ngành nghề": []
            }
        };
    },
    methods: {
        async createLead() {
            try {
                await this.$refs["form"].validate();
                this.loading = true;
                const { data } = await store(this.form);
                this.loading = false;
                this.$router.push(`/customer/lead/show/${data.id}`);
            } catch (error) {
                console.log(error);
                this.loading = false;
            }
        },
        async getLead() {
            try {
                this.loading = true;
                const { data } = await show(this.$route.params.id, {
                    edit: true
                });
                for (let field in this.form) {
                    this.form[field] = data[field];
                }
                this.loading = false;
                console.log(data);
            } catch (error) {
                console.log(error);
                this.loading = false;
            }
        },
        async updateLead() {
            try {
                this.loading = true;
                await this.$refs["form"].validate();
                let data = await update(this.form, this.$route.params.id);
                this.loading = false;
                this.$router.push(
                    `/customer/lead/show/${this.$route.params.id}`
                );
            } catch (error) {
                console.log(error);
                this.loading = false;
            }
        }
    },
    created() {
        Promise.all([
            this.getCatalog("Tiềm năng", "Nguồn"),
            this.getCatalog("Tiềm năng", "Trạng thái"),
            this.getCatalog("Tiềm năng", "Ngành nghề"),
            this.getUsers(),
            this.getGroups()
        ]);
        if (this.isEdit) this.getLead();
    }
};
</script>
