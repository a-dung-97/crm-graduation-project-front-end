<template>
    <el-dialog
        width="30%"
        center
        :title="this.editing ? 'Chỉnh sửa chức vụ': 'Thêm chức vụ'"
        :before-close="closeDialog"
        :visible.sync="showDialog"
    >
        <el-form label-position="top" :model="form" :rules="rules" ref="form">
            <el-form-item label="Tên" prop="name">
                <el-input v-model="form.name"></el-input>
            </el-form-item>
            <el-form-item label="Mô tả" prop="description">
                <el-input v-model="form.description"></el-input>
            </el-form-item>
            <el-form-item label="Cấp trên">
                <el-select
                    clearable
                    v-model="form.parent_id"
                    style="width:100%"
                    placeholder="Cấp trên"
                >
                    <el-option
                        v-for="item in options"
                        :key="item.id"
                        :label="item.name"
                        :value="item.id"
                    ></el-option>
                </el-select>
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
import { store, update } from "@/api/company/position";
export default {
    props: ["form", "editing", "showDialog", "options"],
    data() {
        return {
            loading: false,
            rules: {
                name: [
                    {
                        required: true,
                        message: "Hãy nhập tên chức vụ",
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