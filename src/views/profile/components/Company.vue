<template>
    <el-form :model="company" :rules="rules" ref="form">
        <el-form-item label="Tên công ty" prop="name">
            <el-input v-model="company.name" />
        </el-form-item>
        <el-form-item label="Địa chỉ" prop="address">
            <el-input v-model="company.address" />
        </el-form-item>
        <el-form-item>
            <el-button type="primary" class="block mx-auto" @click="submit">Cập nhật</el-button>
        </el-form-item>
    </el-form>
</template>

<script>
import { getCompany, updateCompany } from "@/api/company/user";
export default {
    data() {
        return {
            loading: false,
            company: {
                name: "",
                address: ""
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
                let company = await getCompany();
                this.company = company.data;
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
