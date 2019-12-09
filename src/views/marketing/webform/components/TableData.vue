<template>
    <div>
        <el-table height="71vh" :data="tableData" border v-loading="loading" style="width: 100%">
            <el-table-column type="index" width="50" label="STT"></el-table-column>
            <el-table-column label="Tên">
                <template slot-scope="scope">
                    <el-link
                        :underline="false"
                        @click="$router.push(`/marketing/webform/show/${scope.row.id}`)"
                        type="primary"
                    >{{ scope.row.name }}</el-link>
                </template>
            </el-table-column>
            <el-table-column prop="campaign" label="Chiến dịch"></el-table-column>
            <el-table-column label="Ngày tạo">
                <template slot-scope="scope">{{ scope.row.created_at|date }}</template>
            </el-table-column>
            <el-table-column align="center" width="170" label="Hành động">
                <template slot-scope="scope">
                    <el-button
                        size="medium"
                        icon="el-icon-edit"
                        circle
                        type="success"
                        @click="$router.push('/marketing/webform/edit/'+scope.row.id)"
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
import { destroy } from "@/api/marketing/webform";
export default {
    props: ["tableData", "loading"],
    methods: {
        async handleDelete(id) {
            await this.$confirm(
                "Xóa webform làm các trang gắn webform không thể hiện thị được nữa. Bạn có chắc chắn muốn xóa?",
                "Cảnh báo",
                {
                    confirmButtonText: "Xóa",
                    cancelButtonText: "Hủy",
                    type: "warning"
                }
            );
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