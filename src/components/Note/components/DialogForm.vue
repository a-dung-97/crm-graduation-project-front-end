<template>
    <el-dialog
        width="30%"
        center
        :title="this.editing ? 'Chỉnh sửa ghi chú': 'Thêm ghi chú'"
        :before-close="closeDialog"
        :visible.sync="showDialog"
    >
        <el-form label-position="top" :model="form" :rules="rules" ref="form">
            <el-form-item label="Tiêu đề" prop="title">
                <el-input v-model="form.title"></el-input>
            </el-form-item>
            <el-form-item label="Nội dung" prop="content">
                <el-input type="textarea" v-model="form.content"></el-input>
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
import { addNote as addNoteToProduct } from "@/api/goods/product";
import { update } from "@/api/general/note";
export default {
    props: ["form", "editing", "showDialog", "type"],
    data() {
        return {
            loading: false,
            rules: {
                title: [
                    {
                        required: true,
                        message: "Hãy nhập tiêu đề",
                        trigger: "blur"
                    }
                ],
                content: [
                    {
                        required: true,
                        message: "Hãy nhập nội dung",
                        trigger: "blur"
                    }
                ]
            },
            addDataFunc: ""
        };
    },
    methods: {
        closeDialog() {
            this.$emit("update:showDialog", false);
            this.$refs["form"].resetFields();
        },
        addNoteByType() {
            switch (this.type) {
                case "product":
                    this.addDataFunc = addNoteToProduct;
                    break;
                default:
                    break;
            }
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
                await this.addDataFunc(this.form, this.$route.params.id);
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
    },
    created() {
        this.addNoteByType();
    }
};
</script>
<style lang="">
</style>