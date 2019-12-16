<template>
    <div>
        <el-table :data="tableData" border v-loading="loading" style="width: 100%">
            <el-table-column align="center" type="index" width="50" label="STT"></el-table-column>
            <el-table-column label="Tiêu đề">
                <template slot-scope="scope">
                    <router-link
                        tag="a"
                        class="link"
                        :to="`/business/appointment/show/${scope.row.id}`"
                    >{{ scope.row.title }}</router-link>
                </template>
            </el-table-column>
            <el-table-column prop="user" label="Chủ sở hữu"></el-table-column>
            <el-table-column label="Thời gian hẹn">
                <template slot-scope="scope">{{ scope.row.time|datetime }}</template>
            </el-table-column>
            <el-table-column label="Trạng thái">
                <template slot-scope="scope">{{ scope.row.status }}</template>
            </el-table-column>
            <el-table-column width="120" align="center" label="Hành động">
                <template slot-scope="scope">
                    <el-button
                        type="success"
                        size="medium"
                        @click="$emit('handle-edit',scope.row)"
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
    </div>
</template>
<script>
import { destroy } from "@/api/business/appointment";
export default {
    props: ["tableData", "loading", "form", "type"],
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