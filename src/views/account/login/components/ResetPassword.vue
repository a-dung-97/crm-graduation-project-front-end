<template>
    <el-dialog
        title="Tìm lại mật khẩu"
        :close-on-click-modal="false"
        center
        :visible.sync="showDialog"
        :before-close="closeDialog"
        width="40%"
    >
        <el-form ref="form" label-position="left" label-width="150px" :rules="rules" :model="form">
            <el-form-item v-if="!next" prop="email" label="Email">
                <el-input v-model="form.email" placeholder="Nhập email của bạn"></el-input>
            </el-form-item>
            <template v-if="next">
                <el-form-item prop="email" label="Mã xác thực">
                    <el-input v-model="form.confirm_code"></el-input>
                </el-form-item>
                <el-form-item prop="password" label="Mật khẩu">
                    <el-input show-password v-model="form.password"></el-input>
                </el-form-item>
                <el-form-item prop="password_confirmation" label="Xác nhận mật khẩu">
                    <el-input show-password v-model="form.password_confirmation"></el-input>
                </el-form-item>
            </template>
        </el-form>
        <span slot="footer" class="dialog-footer">
            <el-button @click="closeDialog">Hủy</el-button>
            <el-button
                type="primary"
                :loading="loading"
                v-if="!next"
                @click="sendEmailPasswordReset"
            >Tiếp theo</el-button>
            <el-button type="primary" :loading="loading" v-else @click="resetPassword">Lưu</el-button>
        </span>
    </el-dialog>
</template>
<script>
import { sendEmailPasswordReset, resetPassword } from "@/api/company/user";

export default {
    props: ["showDialog"],
    data() {
        return {
            next: false,
            form: {
                email: "",
                confirm_code: "",
                password: "",
                password_confirmation: ""
            },
            rules: {
                email: [
                    {
                        type: "email",
                        message: "Địa chỉ email không đúng",
                        trigger: "blur"
                    },
                    {
                        required: true,
                        message: "Hãy nhập một địa chỉ email",
                        trigger: "blur"
                    }
                ],
                confirm_code: [
                    {
                        required: true,
                        message: "Hãy nhập mã xác nhận",
                        trigger: "blur"
                    }
                ],
                password: [
                    {
                        required: true,
                        message: "Hãy nhập mật khẩu",
                        trigger: "blur"
                    }
                ],
                password_confirmation: [
                    {
                        required: true,
                        message: "Hãy nhập lại mật khẩu",
                        trigger: "blur"
                    }
                ]
            },
            loading: false
        };
    },
    methods: {
        async sendEmailPasswordReset() {
            try {
                await this.$refs["form"].validate();
                this.loading = true;
                await sendEmailPasswordReset({ email: this.form.email });
                this.loading = false;
                this.next = true;
            } catch (error) {
                this.loading = false;
                console.log(error);
            }
        },
        async resetPassword() {
            try {
                await this.$refs["form"].validate();
                this.loading = true;
                await resetPassword(this.form);
                this.loading = false;
                this.next = true;
                this.closeDialog();
                this.$message.success("Lấy lại mật khẩu thành công");
            } catch (error) {
                this.loading = false;
                console.log(error);
            }
        },
        closeDialog() {
            this.$emit("update:showDialog", false);
            this.$refs["form"].resetFields();
        }
    }
};
</script>
<style lang="css" scoped>
form {
    width: 100% !important;
}
</style>