<template>
    <div>
        <el-table :data="tableData" border v-loading="loading" style="width: 100%">
            <el-table-column type="index" align="center" width="50" label="STT"></el-table-column>
            <el-table-column prop="name" width="200" label="Tên"></el-table-column>
            <el-table-column prop="email" width="220" label="Email"></el-table-column>
            <el-table-column prop="phone_number" width="100" label="Điện thoại"></el-table-column>
            <el-table-column width="140" label="Trạng thái">
                <template slot-scope="scope">
                    <el-tag
                        :type="scope.row.active === true ? 'success' : 'warning'"
                        disable-transitions
                        size="small"
                    >{{scope.row.active===true?'Hoạt động':"Không hoạt động"}}</el-tag>
                </template>
            </el-table-column>
            <el-table-column prop="department" label="Phòng ban"></el-table-column>
            <el-table-column prop="position" label="Chức vụ"></el-table-column>
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
import { destroy } from "@/api/company/user";
export default {
    props: ["tableData", "loading", "form"],
    methods: {
        handleEdit(row) {
            this.form.id = row.id;
            this.form.name = row.name;
            this.form.phone_number = row.phone_number;
            this.form.email = row.email;
            this.form.active = row.active;
            this.form.position_id = row.position_id;
            this.form.department_id = row.department_id;
            this.form.role_id = row.role_id;
            this.$emit("handle-edit");
        },
        async handleDelete(id) {
            try {
                await this.$confirm("Bạn có chắc chắn muốn xóa?", "Cảnh báo", {
                    confirmButtonText: "Xóa",
                    cancelButtonText: "Hủy",
                    type: "warning"
                });
                await destroy(id);
                this.$message.success("Xóa dữ liệu thành công");
                this.$emit("handle-delete");
            } catch (error) {
                console.log(error);
            }
        }
    }
};
</script>
<style lang="">
</style>