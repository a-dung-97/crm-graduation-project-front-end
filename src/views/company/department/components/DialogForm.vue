<template>
    <el-dialog
        width="30%"
        center
        :title="this.editing ? 'Chỉnh sửa phòng ban': 'Thêm phòng ban'"
        :before-close="closeDialog"
        :visible.sync="showDialog"
    >
        <el-form :model="form" :rules="rules" ref="form">
            <el-form-item label="Tên" prop="name">
                <el-input v-model="form.name"></el-input>
            </el-form-item>
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
import { store, update } from "@/api/department";
export default {
    props: ["form", "editing", "showDialog"],
    data() {
        return {
            loading: false,
            rules: {
                name: [
                    {
                        required: true,
                        message: "Hãy nhập tên của bạn",
                        trigger: "blur"
                    }
                ]
            }
        };
    },
    methods: {
        closeDialog() {
            this.$emit("update:showDialog", false);
            this.$refs["form"].resetFields();
        },
        async updateData() {
            try {
                this.loading = true;
                await update(this.form, this.form.id);
                this.reload();
            } catch (error) {
                this.loading = false;
            }
        },
        async createData() {
            try {
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