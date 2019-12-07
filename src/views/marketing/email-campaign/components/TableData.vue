<template>
    <div>
        <el-table height="72vh" :data="tableData" border v-loading="loading" style="width: 100%">
            <el-table-column width="150" prop="code" label="Ngày tạo">
                <template slot-scope="scope">{{ scope.row.created_at|datetime }}</template>
            </el-table-column>
            <el-table-column prop="name" label="Tên"></el-table-column>
            <el-table-column prop="subject" label="Tiêu đề"></el-table-column>
            <el-table-column prop="description" label="Mô tả"></el-table-column>
            <el-table-column prop="total_count" width="100" label="Tổng gửi"></el-table-column>
            <el-table-column prop="success_count" width="110" label="Thành công"></el-table-column>
            <el-table-column prop="deliveried_count" width="80" label="Đã nhận"></el-table-column>
            <el-table-column prop="opened_count" label="Mở" width="50"></el-table-column>
            <el-table-column prop="clicked_count" label="Click" width="60"></el-table-column>
            <el-table-column prop="failed_count" label="Trả lại" width="80"></el-table-column>
        </el-table>
    </div>
</template>
<script>
import { destroy } from "@/api/marketing/email-template";
export default {
    props: ["tableData", "loading"],
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