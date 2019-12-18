<template>
    <div>
        <el-table height="70vh" :data="tableData" border v-loading="loading" style="width: 100%">
            <el-table-column type="index" width="50" label="STT"></el-table-column>
            <el-table-column prop="name" label="Tên sổ quỹ"></el-table-column>
            <el-table-column prop="type" label="Loại"></el-table-column>
            <el-table-column prop="balance" label="Số tiền">
                <template slot-scope="scope">{{ scope.row.balance|money }}</template>
            </el-table-column>
            <el-table-column prop="description" label="Mô tả"></el-table-column>
            <el-table-column align="center" width="200" label="Hành động">
                <template slot-scope="scope">
                    <el-button
                        size="medium"
                        icon="el-icon-edit"
                        circle
                        type="success"
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
import { destroy } from "@/api/accounting/cashbook";
export default {
    props: ["tableData", "loading"],
    methods: {
        handleEdit(row) {
            this.$emit("handle-edit", row);
        },
        async handleDelete(id) {
            await this.$confirm("Bạn có chắc chắn muốn xóa?", "Cảnh báo", {
                confirmButtonText: "Xóa",
                cancelButtonText: "Hủy",
                type: "warning"
            });
            this.openFullScreen();
            await destroy(id);
            this.closeFullScreen();
            this.$message.success("Xóa dữ liệu thành công");
            this.$emit("handle-delete");
        }
    }
};
</script>
<style lang="">
</style>