<template>
    <el-table height="64vh" :data="tableData" border v-loading="loading" style="width: 100%">
        <el-table-column type="index" width="50" label="STT" align="center"></el-table-column>
        <el-table-column width="210" label="Tên">
            <template slot-scope="scope">
                <router-link
                    tag="a"
                    class="link"
                    :to="`/business/opportunity/show/${scope.row.id}`"
                >{{ scope.row.name }}</router-link>
            </template>
        </el-table-column>
        <el-table-column prop="owner" width="210" label="Chủ sở hữu"></el-table-column>
        <el-table-column prop="source" width="170" label="Nguồn"></el-table-column>
        <el-table-column prop="customer" width="210" label="Khách hàng"></el-table-column>
        <el-table-column width="150" label="Ngày tạo">
            <template slot-scope="scope">{{ scope.row.created_at|datetime}}</template>
        </el-table-column>
        <el-table-column width="120" label="Ngày kết thúc">
            <template slot-scope="scope">{{ scope.row.end_date|date}}</template>
        </el-table-column>
        <el-table-column align="center" fixed="right" width="140" label="Hành động">
            <template slot-scope="scope">
                <el-button
                    type="primary"
                    size="medium"
                    @click="$router.push(`/business/opportunity/edit/${scope.row.id}`)"
                    icon="el-icon-edit"
                    circle
                ></el-button>
                <el-button
                    type="danger"
                    size="medium"
                    @click="handleDelete(scope.row.id)"
                    icon="el-icon-delete"
                    circle
                ></el-button>
            </template>
        </el-table-column>
    </el-table>
</template>
<script>
import { destroy } from "@/api/business/opportunity";
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