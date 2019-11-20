<template>
    <el-row
        v-loading.fullscreen.lock="loading"
        element-loading-text="Xin vui lòng chờ"
        element-loading-background="rgba(0, 0, 0, 0.8)"
    >
        <el-col :span="24">
            <el-row>
                <el-col v-if="isShow" :span="21">
                    <TagArea type="lead" />
                </el-col>
                <el-col :offset="isShow?0:21" :span="3">
                    <el-button v-if="isEdit" @click="updateLead" type="success" class="fr">Lưu</el-button>
                    <el-button
                        v-else-if="isShow"
                        size="medium"
                        @click="$router.push(`/customer/lead/edit/${form.id}`)"
                        type="primary"
                        class="fr"
                    >Sửa tiềm năng</el-button>
                    <el-button
                        size="medium"
                        v-else
                        @click="createLead"
                        type="primary"
                        class="fr"
                    >Thêm tiềm năng</el-button>
                </el-col>
            </el-row>
        </el-col>
        <el-form
            :disabled="isShow"
            :model="form"
            :rules="rules"
            ref="form"
            label-position="left"
            label-width="120px"
        >
            <el-col style="margin-top:20px" :span="24">
                <el-card>
                    <div slot="header">
                        <span>Thông tin tiềm năng</span>
                    </div>
                    <el-row :gutter="30">
                        <el-col :md="12" :sm="24">
                            <el-form-item label="Họ tên đệm">
                                <el-input v-model="form.first_name">
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
                                <el-input v-model="form.email"></el-input>
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
                                    placeholder="Trạng thái"
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
                            <el-form-item label="Tên" prop="last_name">
                                <el-input v-model="form.last_name"></el-input>
                            </el-form-item>
                            <el-form-item label="Số điện thoại" prop="phone_number">
                                <el-input v-model="form.phone_number"></el-input>
                            </el-form-item>
                            <el-form-item label="Facebook">
                                <el-input v-model="form.facebook"></el-input>
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
                                <el-input v-model="form.company"></el-input>
                            </el-form-item>
                            <el-form-item label="Mã số thuế">
                                <el-input v-model="form.tax_code"></el-input>
                            </el-form-item>
                            <el-form-item label="Số nhân viên">
                                <el-input v-model="form.number_of_workers"></el-input>
                            </el-form-item>
                            <el-form-item label="Ngành nghề">
                                <el-select
                                    style="width:100%"
                                    v-model="form.branch_id"
                                    placeholder="Ngành nghề"
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
                                <el-input v-model="form.website"></el-input>
                            </el-form-item>
                            <el-form-item label="Fax">
                                <el-input v-model="form.fax"></el-input>
                            </el-form-item>
                            <el-form-item label="Doanh thu">
                                <el-input-number
                                    style="width:100%"
                                    v-model="form.revenue"
                                    controls-position="right"
                                    :min="0"
                                ></el-input-number>
                            </el-form-item>
                            <el-form-item label="Địa chỉ">
                                <el-input v-model="form.office_address"></el-input>
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
import { validateMobileNumberWithEmptyValue } from "@/utils/validate";
import TagArea from "@/components/TagArea/index";
import { list } from "@/api/setting/catalog";
export default {
    props: ["isEdit", "isShow"],
    components: { TagArea },
    data() {
        return {
            form: {
                id: "",
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
                        validator: validateMobileNumberWithEmptyValue,
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
            this.getCatalog("Tiềm năng", "Ngành nghề")
        ]);
        if (this.isEdit || this.isShow) this.getLead();
    }
};
</script>
