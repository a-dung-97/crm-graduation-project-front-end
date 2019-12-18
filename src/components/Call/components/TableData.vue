<template>
    <div>
        <el-table :data="tableData" border v-loading="loading" style="width: 100%">
            <el-table-column align="center" type="index" width="50" label="STT"></el-table-column>
            <el-table-column label="Tiêu đề">
                <template slot-scope="scope">
                    <router-link
                        tag="a"
                        class="link"
                        :to="`/business/call/show/${scope.row.id}`"
                    >{{ scope.row.title }}</router-link>
                </template>
            </el-table-column>
            <el-table-column prop="user" label="Chủ sở hữu"></el-table-column>
            <el-table-column prop="contact" v-if="type=='customer'" label="Liên hệ"></el-table-column>
            <el-table-column label="Thời gian gọi">
                <template slot-scope="scope">{{ scope.row.time|datetime }}</template>
            </el-table-column>
            <el-table-column label="Thời lượng(s)">
                <template slot-scope="scope">{{ scope.row.duration }}</template>
            </el-table-column>
            <el-table-column width="120" align="center" label="Xóa">
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
import { destroy } from "@/api/business/call";
export default {
    props: ["tableData", "loading", "form", "type"],
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
            this.closeFullScreen();
            this.$message.success("Xóa dữ liệu thành công");
            this.$emit("handle-delete");
        }
    }
};
</script>
<style lang="">
</style>