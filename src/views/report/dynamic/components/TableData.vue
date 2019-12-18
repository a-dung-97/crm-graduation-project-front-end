<template>
    <div>
        <el-table :data="tableData" border v-loading="loading" style="width: 100%">
            <el-table-column type="index" width="50" label="STT"></el-table-column>
            <el-table-column prop="name" label="Tên">
                <template slot-scope="scope">
                    <el-link
                        type="primary"
                        @click="$router.push(`/report/dynamic/show/${scope.row.id}`)"
                        :underline="false"
                    >{{ scope.row.name }}</el-link>
                </template>
            </el-table-column>
            <el-table-column prop="description" label="Mô tả"></el-table-column>
            <el-table-column label="Ngày tạo">
                <template slot-scope="scope">{{ scope.row.created_at|datetime }}</template>
            </el-table-column>
            <el-table-column align="center" width="150" label="Hành động">
                <template slot-scope="scope">
                    <el-button
                        size="medium"
                        icon="el-icon-edit"
                        type="primary"
                        circle
                        @click="$emit('handle-edit',scope.row)"
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
import { destroy } from "@/api/report/dynamic";
export default {
    props: ["tableData", "loading", "form"],
    methods: {
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