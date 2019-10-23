<template>
    <div>
        <el-table :data="tableData" border v-loading="loading" style="width: 100%">
            <el-table-column type="index" width="50" label="STT"></el-table-column>
            <el-table-column prop="name" label="Tên"></el-table-column>
            <el-table-column prop="description" label="Mô tả"></el-table-column>
            <el-table-column prop="parrent" label="Phòng ban cha"></el-table-column>
            <!-- <el-table-column label="Hành động" align="center"></el-table-column> -->
            <el-table-column align="center" width="200" label="Hành động">
                <template slot-scope="scope">
                    <el-button size="mini" @click="handleEdit(scope.row)">Chỉnh sửa</el-button>
                    <el-button size="mini" @click="handleDelete(scope.row.id)" type="danger">Xóa</el-button>
                </template>
            </el-table-column>
        </el-table>
    </div>
</template>
<script>
import { destroy } from "@/api/department";
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
            await destroy(id);
            this.$message.success("Xóa dữ liệu thành công");
            this.$emit("handle-delete");
        }
    }
};
</script>
<style lang="">
</style>