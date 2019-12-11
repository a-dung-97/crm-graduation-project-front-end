<template>
    <el-dialog
        title="Đổi mật khẩu"
        :close-on-click-modal="false"
        center
        :visible.sync="showDialog"
        :before-close="closeDialog"
        width="40%"
    >
        <el-form ref="form" label-position="left" label-width="150px" :rules="rules" :model="form">
            <el-form-item prop="old_password" label="Mật khẩu cũ">
                <el-input show-password v-model="form.old_password"></el-input>
            </el-form-item>
            <el-form-item prop="password" label="Mật khẩu mới">
                <el-input show-password v-model="form.password"></el-input>
            </el-form-item>
            <el-form-item prop="password_confirmation" label="Xác nhận mật khẩu">
                <el-input show-password v-model="form.password_confirmation"></el-input>
            </el-form-item>
        </el-form>
        <span slot="footer" class="dialog-footer">
            <el-button @click="closeDialog">Hủy</el-button>
            <el-button type="primary" :loading="loading" @click="changePassword">Lưu</el-button>
        </span>
    </el-dialog>
</template>
<script>
import { changePassword } from "@/api/company/user";

export default {
    props: ["showDialog"],
    data() {
        return {
            form: {
                old_password: "",
                password: "",
                password_confirmation: ""
            },
            rules: {
                old_password: [
                    {
                        required: true,
                        message: "Hãy nhập mật khẩu cũ",
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
        async changePassword() {
            try {
                await this.$refs["form"].validate();
                this.loading = true;
                await changePassword(this.form);
                this.loading = false;
                this.next = true;
                this.closeDialog();
                this.$message.success("Đổi mật khẩu thành công");
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