<template>
    <div>
        <el-table :data="tableData" border v-loading="loading" style="width: 100%">
            <el-table-column align="center" type="index" width="50" label="STT"></el-table-column>
            <el-table-column prop="title" label="Tiêu đề"></el-table-column>
            <el-table-column prop="content" label="Nội dung"></el-table-column>
            <el-table-column prop="user" width="220" label="Người tạo"></el-table-column>
            <el-table-column prop="created_at" width="150" label="Ngày tạo"></el-table-column>
            <el-table-column align="center" width="150" label="Hành động">
                <template slot-scope="scope">
                    <el-button
                        size="medium"
                        icon="el-icon-edit"
                        circle
                        @click="handleEdit(scope.row)"
                    ></el-button>
                    <el-button
                        @click="handleDelete(scope.row.id)"
                        size="medium"
                        type="danger"
                        icon="el-icon-delete"
                        circle
                    ></el-button>
                </template>
            </el-table-column>
        </el-table>
    </div>
</template>
<script>
import { destroy } from "@/api/company/group";
export default {
    props: ["tableData", "loading", "form"],
    methods: {
        handleEdit(row) {
            this.form.id = row.id;
            this.form.title = row.title;
            this.form.content = row.content;
            this.$emit("handle-edit");
        },
        async handleDelete(id) {
            await this.$confirm("Bạn có chắc chắn muốn xóa?", "Cảnh báo", {
                confirmButtonText: "Xóa",
                cancelButtonText: "Hủy",
                type: "warning"
            });
            await destroy(id);
            this.$message.success("Xóa dữ liệu thành công");
            this.$emit("handle-delete");
        }
    }
};
</script>
<style lang="">
</style>