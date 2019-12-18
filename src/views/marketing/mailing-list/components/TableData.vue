<template>
    <div>
        <el-table :data="tableData" height="72vh" border v-loading="loading" style="width: 100%">
            <el-table-column type="index" width="50" label="STT"></el-table-column>
            <el-table-column prop="name" label="Tên"></el-table-column>
            <el-table-column prop="description" label="Mô tả"></el-table-column>
            <el-table-column prop="count" label="Số lượng"></el-table-column>
            <el-table-column label="Ngày tạo">
                <template slot-scope="scope">{{ scope.row.created_at|date }}</template>
            </el-table-column>
            <!-- <el-table-column label="Hành động" align="center"></el-table-column> -->
            <el-table-column align="center" width="200" label="Hành động">
                <template slot-scope="scope">
                    <el-button
                        size="medium"
                        icon="el-icon-edit"
                        circle
                        type="primary"
                        @click="handleEdit(scope.row)"
                    ></el-button>
                    <el-button
                        @click="handleDelete(scope.row.id)"
                        size="medium"
                        type="danger"
                        icon="el-icon-delete"
                        circle
                    ></el-button>
                    <el-button
                        size="medium"
                        @click="handleEditMembers(scope.row.id)"
                        icon="el-icon-user"
                        circle
                        type="success"
                    ></el-button>
                </template>
            </el-table-column>
        </el-table>
    </div>
</template>
<script>
import { destroy } from "@/api/marketing/mailing-list";
export default {
    props: ["tableData", "loading", "form"],
    methods: {
        handleEdit(row) {
            this.form.id = row.id;
            this.form.name = row.name;
            this.form.description = row.description;
            this.$emit("handle-edit");
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
        },
        handleEditMembers(id) {
            this.$emit("handle-edit-members", id);
        }
    }
};
</script>
<style lang="">
</style>