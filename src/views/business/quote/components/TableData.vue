<template>
    <el-table :data="tableData" border v-loading="loading" style="width: 100%">
        <el-table-column align="center" type="index" width="50" label="STT"></el-table-column>
        <el-table-column label="Mã">
            <template slot-scope="scope">
                <router-link
                    tag="a"
                    class="link"
                    :to="`/business/quote/show/${scope.row.id}`"
                >{{ scope.row.code }}</router-link>
            </template>
        </el-table-column>
        <el-table-column width="120" label="Ngày báo giá">
            <template slot-scope="scope">{{ scope.row.quote_date|date}}</template>
        </el-table-column>
        <el-table-column prop="delivery_address" label="Địa chỉ giao hàng"></el-table-column>
        <el-table-column prop="customer" label="Tên khách hàng"></el-table-column>
        <el-table-column prop="owner" label="Chủ sở hữu"></el-table-column>
        <el-table-column align="center" width="150" label="Hành động">
            <template slot-scope="scope">
                <el-button
                    type="primary"
                    :disabled="scope.row.confirmed"
                    @click="$router.push(`/business/quote/edit/${scope.row.id}`)"
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
import { destroy } from "@/api/business/quote";
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