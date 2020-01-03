<template>
    <div>
        <el-table :data="tableData" border v-loading="loading" style="width: 100%">
            <el-table-column align="center" type="index" width="50" label="STT"></el-table-column>
            <el-table-column width="250" label="Tiêu đề">
                <template slot-scope="scope">
                    <router-link
                        tag="a"
                        class="link"
                        :to="`/business/task/show/${scope.row.id}`"
                    >{{ scope.row.title }}</router-link>
                </template>
            </el-table-column>
            <el-table-column prop="user" width="150" label="Chủ sở hữu"></el-table-column>
            <el-table-column width="130" label="Trạng thái">
                <template slot-scope="scope">
                    <el-tag v-if="scope.row.status" type="primary">{{ scope.row.status }}</el-tag>
                </template>
            </el-table-column>
            <el-table-column width="140" label="Ngày bắt đầu">
                <template slot-scope="scope">{{ scope.row.start_date|date }}</template>
            </el-table-column>
            <el-table-column width="140" label="Ngày hết hạn">
                <template slot-scope="scope">{{ scope.row.expiration_date|date }}</template>
            </el-table-column>
            <el-table-column prop="description" label="Mô tả"></el-table-column>
            <el-table-column width="60" align="center" label>
                <template slot-scope="scope">
                    <el-button
                        type="danger"
                        @click="handleDelete(scope.row.id)"
                        icon="el-icon-delete"
                        circle
                    ></el-button>
                </template>
            </el-table-column>
        </el-table>
    </div>
</template>
<script>
import { destroy } from "@/api/business/task";
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
            this.openFullScreen();
            await destroy(id);
            this.$message.success("Xóa dữ liệu thành công");
            this.$emit("handle-delete");
            this.closeFullScreen();
        }
    }
};
</script>
<style lang="">
</style>