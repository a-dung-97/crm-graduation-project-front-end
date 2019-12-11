<template>
    <div class="app-container">
        <el-row>
            <el-col :offset="3" :span="18">
                <el-card>
                    <div slot="header">Thông tin công ty</div>
                    <el-form :model="company" :rules="rules" ref="form">
                        <el-form-item label="Tên công ty" prop="name">
                            <el-input v-model="company.name" />
                        </el-form-item>
                        <el-form-item label="Địa chỉ" prop="address">
                            <el-input v-model="company.address" />
                        </el-form-item>
                        <el-form-item label="Số điện thoại" prop="phone_number">
                            <el-input v-model="company.phone_number" />
                        </el-form-item>
                        <el-form-item label="Mô tả">
                            <el-input v-model="company.description" />
                        </el-form-item>
                        <el-form-item>
                            <el-button
                                :loading="loading"
                                type="primary"
                                class="block mx-auto"
                                @click.prevent="submit"
                            >Cập nhật</el-button>
                        </el-form-item>
                    </el-form>
                </el-card>
            </el-col>
        </el-row>
    </div>
</template>

<script>
import { validatePhoneNumber } from "@/utils/validate";
import { getCompany, updateCompany } from "@/api/company/user";
export default {
    data() {
        return {
            loading: false,
            company: {
                id: "",
                name: "",
                address: "",
                description: null,
                phone_number: null
            },
            rules: {
                name: [
                    {
                        required: true,
                        message: "Hãy nhập tên công ty của bạn",
                        trigger: "blur"
                    }
                ],
                address: [
                    {
                        required: true,
                        message: "Hãy nhập địa chỉ công ty của bạn",
                        trigger: "blur"
                    }
                ],
                phone_number: [
                    {
                        validator: validatePhoneNumber,
                        trigger: "blur"
                    }
                ]
            }
        };
    },
    methods: {
        submit() {
            this.$refs["form"].validate(valid => {
                if (valid) {
                    this.updateCompany();
                } else {
                    return false;
                }
            });
        },
        async getCompany() {
            try {
                this.openFullScreen();
                const { data } = await getCompany();
                for (let field in this.company)
                    this.company[field] = data[field];
                this.closeFullScreen();
            } catch (error) {
                console.log(error);
            }
        },
        async updateCompany() {
            try {
                this.loading = true;
                await updateCompany(this.company);
                this.$store.commit("user/SET_COMPANY", this.company.name);
                this.loading = false;
                this.$message.success("Cập nhật thành công");
            } catch (error) {
                this.loading = false;
            }
        }
    },
    created() {
        this.getCompany();
    }
};
</script>
