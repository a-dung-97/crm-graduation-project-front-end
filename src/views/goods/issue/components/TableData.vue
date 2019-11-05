<template>
    <el-table :data="tableData" border v-loading="loading" style="width: 100%">
        <el-table-column align="center" type="index" width="50" label="STT"></el-table-column>
        <el-table-column width="150" label="Mã phiếu xuất">
            <template slot-scope="scope">
                <router-link
                    tag="a"
                    class="link"
                    :to="`/goods/issue/show/${scope.row.id}`"
                >{{ scope.row.code }}</router-link>
            </template>
        </el-table-column>
        <el-table-column width="130" label="Ngày xuất phiếu">
            <template slot-scope="scope">{{ scope.row.date|date }}</template>
        </el-table-column>
        <el-table-column prop="delivery_man" width="180" label="Người giao hàng"></el-table-column>
        <el-table-column prop="delivery_date" width="180" label="Ngày giao hàng"></el-table-column>
        <el-table-column prop="recipient" width="180" label="Người nhận hàng"></el-table-column>
        <el-table-column prop="phone_number" width="180" label="SĐT người nhận"></el-table-column>
        <el-table-column width="130" label="Trạng thái">
            <template slot-scope="scope">
                <el-tag
                    :type="scope.row.confirmed ? 'success' : 'warning'"
                    disable-transitions
                    size="small"
                >{{scope.row.confirmed?'Đã xác nhận':"Chưa xác nhận"}}</el-tag>
            </template>
        </el-table-column>

        <el-table-column width="200" prop="description" label="Mô tả"></el-table-column>
        <el-table-column fixed="right" align="center" width="150" label="Hành động">
            <template slot-scope="scope">
                <el-button
                    type="primary"
                    :disabled="scope.row.confirmed"
                    @click="$router.push(`/goods/issue/edit/${scope.row.id}`)"
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
import { destroy } from "@/api/goods/issue";
export default {
    props: ["tableData", "loading"],
    methods: {
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