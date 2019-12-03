<template>
    <el-dialog
        width="40%"
        center
        top="5vh"
        :title="this.editing ? 'Chỉnh sửa sổ quỹ': 'Thêm sổ quỹ'"
        :before-close="closeDialog"
        :visible.sync="showDialog"
    >
        <el-form label-position="left" label-width="170px" :model="form" :rules="rules" ref="form">
            <el-form-item label="Loại" prop="type">
                <el-switch
                    :disabled="editing"
                    v-model="form.type"
                    active-text="Ngân hàng"
                    active-value="Ngân hàng"
                    @change="changeType"
                    inactive-text="Tiền mặt"
                    inactive-value="Tiền mặt"
                ></el-switch>
            </el-form-item>
            <el-form-item
                :label="form.type=='Tiền mặt'?'Tên sổ quỹ':'Tài khoản ngân hàng'"
                prop="name"
            >
                <el-input v-model="form.name"></el-input>
            </el-form-item>
            <template v-if="form.type=='Ngân hàng'">
                <el-form-item label="Chủ sở hữu">
                    <el-input v-model="form.owner"></el-input>
                </el-form-item>
                <el-form-item label="Tên ngân hàng">
                    <el-input v-model="form.bank_name"></el-input>
                </el-form-item>
                <el-form-item label="Chi nhánh">
                    <el-input v-model="form.bank_branch"></el-input>
                </el-form-item>
                <el-form-item label="Tiền tệ">
                    <el-input v-model="form.currency"></el-input>
                </el-form-item>
                <el-form-item label="Địa chỉ đăng kí">
                    <el-input v-model="form.address"></el-input>
                </el-form-item>
            </template>
            <el-form-item label="Mô tả" prop="description">
                <el-input v-model="form.description"></el-input>
            </el-form-item>
        </el-form>
        <span slot="footer" class="dialog-footer">
            <el-button @click="closeDialog">Hủy</el-button>
            <el-button v-if="editing" type="primary" :loading="loading" @click="updateData">Cập nhật</el-button>
            <el-button v-else :loading="loading" @click="createData" type="primary">Tạo mới</el-button>
        </span>
    </el-dialog>
</template>
<script>
import { store, update } from "@/api/accounting/cashbook";
export default {
    props: ["form", "editing", "showDialog"],
    data() {
        return {
            loading: false,
            rules: {
                name: [
                    {
                        required: true,
                        message: "Hãy nhập tên sổ quỹ",
                        trigger: "blur"
                    }
                ]
            }
        };
    },
    methods: {
        changeType(val) {
            for (let field in this.form)
                if (field != "type") this.form[field] = "";
            this.form.type = val;
        },
        closeDialog() {
            this.$emit("update:showDialog", false);
            this.$refs["form"].resetFields();
            this.form.type = "Tiền mặt";
        },
        async updateData() {
            try {
                await this.$refs["form"].validate();
                this.loading = true;
                await update(this.form, this.form.id);
                this.reload();
            } catch (error) {
                this.loading = false;
            }
        },
        async createData() {
            try {
                await this.$refs["form"].validate();
                this.loading = true;
                await store(this.form);
                this.reload();
            } catch (error) {
                this.loading = false;
            }
        },
        reload() {
            this.loading = false;
            this.$message.success(
                this.editing ? "Cập nhật thành công" : "Thêm mới thành công"
            );
            this.closeDialog();
            this.$emit("reload");
        }
    }
};
</script>
<style lang="">
</style>