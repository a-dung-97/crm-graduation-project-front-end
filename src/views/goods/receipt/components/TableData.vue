<template>
    <el-table :data="tableData" border v-loading="loading" style="width: 100%">
        <el-table-column align="center" type="index" width="50" label="STT"></el-table-column>
        <el-table-column label="Mã">
            <template slot-scope="scope">
                <router-link
                    tag="a"
                    class="link"
                    :to="`/goods/receipt/show/${scope.row.id}`"
                >{{ scope.row.code }}</router-link>
            </template>
        </el-table-column>
        <el-table-column prop="supplier" label="Nhà cung cấp"></el-table-column>
        <el-table-column label="Trạng thái">
            <template slot-scope="scope">
                <el-tag
                    :type="scope.row.confirmed ? 'success' : 'warning'"
                    disable-transitions
                    size="small"
                >{{scope.row.confirmed?'Đã xác nhận':"Chưa xác nhận"}}</el-tag>
            </template>
        </el-table-column>
        <el-table-column prop="date" label="Ngày nhập"></el-table-column>
        <el-table-column prop="description" label="Mô tả"></el-table-column>
        <el-table-column align="center" width="150" label="Hành động">
            <template slot-scope="scope">
                <el-button
                    type="primary"
                    :disabled="scope.row.confirmed"
                    @click="$router.push(`/goods/receipt/edit/${scope.row.id}`)"
                    icon="el-icon-edit"
                    circle
                ></el-button>
                <el-button
                    type="danger"
                    @click="handleDelete(scope.row.id)"
                    icon="el-icon-delete"
                    circle
                ></el-button>
            </template>
        </el-table-column>
    </el-table>
</template>
<script>
import { destroy } from "@/api/goods/receipt";
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