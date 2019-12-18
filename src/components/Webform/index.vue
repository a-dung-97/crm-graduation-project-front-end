<template>
    <el-card>
        <div slot="header" style="text-align:center;height:18.4px">{{ name }}</div>

        <el-form
            v-if="field"
            :model="form"
            ref="form"
            label-position="left"
            :rules="rules"
            label-width="110px"
        >
            <el-form-item label="Tên" prop="last_name">
                <el-input v-model="form.last_name" placeholder="Nhập tên của bạn"></el-input>
            </el-form-item>
            <el-form-item v-if="field.phone_number" label="Số điện thoại" prop="phone_number">
                <el-input v-model="form.phone_number" placeholder="Nhập số điện thoại"></el-input>
            </el-form-item>
            <el-form-item v-if="field.mobile_number" label="Số di động" prop="mobile_number">
                <el-input v-model="form.mobile_number" placeholder="Nhập số di động"></el-input>
            </el-form-item>
            <el-form-item v-if="field.email" label="Email" prop="email">
                <el-input v-model="form.email" placeholder="Nhập địa chỉ email"></el-input>
            </el-form-item>
            <el-form-item v-if="field.company" label="Công ty" prop="company">
                <el-input v-model="form.company" placeholder="Nhập tên công ty"></el-input>
            </el-form-item>
            <el-form-item v-if="field.office_address" label="Địa chỉ" prop="office_address">
                <el-input v-model="form.office_address" placeholder="Nhập địa chỉ công ty"></el-input>
            </el-form-item>
            <el-form-item>
                <el-button @click.prevent="createLead" type="primary">Đăng ký</el-button>
            </el-form-item>
        </el-form>
    </el-card>
</template>
<script>
import {
    validateMobileNumberWithEmptyValue,
    validatePhoneNumber
} from "@/utils/validate";
import { createLead } from "@/api/marketing/webform";
export default {
    props: ["field", "name", "demo"],
    data() {
        return {
            form: {
                name: "",
                email: "",
                phone_number: "",
                mobile_number: "",
                company: "",
                office_address: ""
            },
            rules: {
                last_name: [
                    {
                        required: true,
                        message: "Bắt buộc nhập",
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
            }
        };
    },
    methods: {
        async createLead() {
            try {
                await this.$refs["form"].validate();
                if (this.demo) return;
                this.openFullScreen();
                await createLead(this.form, this.$route.query.id);
                this.closeFullScreen();
                this.$refs["form"].resetFields();
                this.$message.success("Cảm ơn bạn đã đăng ki");
            } catch (error) {
                console.log(error);
                this.closeFullScreen();
            }
        }
    },
    created() {
        for (let item in this.field) {
            if (item == "company" || item == "office_address") {
                this.rules[item] = [
                    {
                        required: true,
                        message: "Bắt buộc nhập",
                        trigger: "blur"
                    }
                ];
            } else
                this.rules[item].push({
                    required: true,
                    message: "Bắt buộc nhập",
                    trigger: "blur"
                });
        }
    }
};
</script>
<style lang="">
</style>