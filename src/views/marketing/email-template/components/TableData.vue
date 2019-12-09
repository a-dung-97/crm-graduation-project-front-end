<template>
    <div>
        <el-table height="72vh" :data="tableData" border v-loading="loading" style="width: 100%">
            <el-table-column type="index" width="50" label="STT"></el-table-column>
            <el-table-column prop="name" label="Tên"></el-table-column>
            <el-table-column prop="code" label="Ngày tạo">
                <template slot-scope="scope">{{ scope.row.created_at|date }}</template>
            </el-table-column>
            <el-table-column prop="user" label="Người tạo"></el-table-column>
            <el-table-column prop="description" label="Mô tả"></el-table-column>
            <el-table-column align="center" width="170" label="Hành động">
                <template slot-scope="scope">
                    <el-button
                        @click="openPreview(scope.row)"
                        size="medium"
                        type="success"
                        circle
                        icon="el-icon-view"
                    ></el-button>
                    <el-button
                        size="medium"
                        icon="el-icon-edit"
                        circle
                        type="success"
                        @click="$router.push('/marketing/email-template/edit/'+scope.row.id)"
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
        <el-dialog :title="email.name" :visible.sync="showDialog" top="5vh" width="80%">
            <div v-html="email.content"></div>
        </el-dialog>
    </div>
</template>
<script>
import { destroy } from "@/api/marketing/email-template";
export default {
    props: ["tableData", "loading"],
    data() {
        return {
            showDialog: false,
            email: ""
        };
    },
    methods: {
        openPreview(email) {
            this.email = email;
            this.showDialog = true;
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