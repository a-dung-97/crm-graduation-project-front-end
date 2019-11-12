<template>
    <el-table :data="tableData" border v-loading="loading" style="width: 100%">
        <el-table-column align="center" type="index" width="50" label="STT"></el-table-column>
        <el-table-column prop="name" label="Tên tệp"></el-table-column>
        <el-table-column prop="size" width="150" label="Dung lượng"></el-table-column>
        <el-table-column prop="user" width="220" label="Người tạo"></el-table-column>
        <el-table-column prop="created_at" width="200" label="Ngày tạo"></el-table-column>
        <el-table-column align="center" width="150" label="Hành động">
            <template slot-scope="scope">
                <el-button
                    @click="handleDelete(scope.row.id)"
                    size="medium"
                    type="danger"
                    icon="el-icon-delete"
                    circle
                ></el-button>
                <el-button
                    size="medium"
                    @click="download(scope.row.name)"
                    type="success"
                    icon="el-icon-download"
                    circle
                ></el-button>
            </template>
        </el-table-column>
    </el-table>
</template>
<script>
import { destroy, download } from "@/api/general/file";
import axios from "axios";
export default {
    props: ["tableData", "loading"],
    data() {
        return {};
    },
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
        },
        async download(name) {
            this.openFullScreen();
            let res = await download({ name });
            this.closeFullScreen();

            var fileURL = window.URL.createObjectURL(new Blob([res]));
            var fileLink = document.createElement("a");
            fileLink.href = fileURL;
            fileLink.setAttribute("download", name);
            document.body.appendChild(fileLink);
            fileLink.click();
            this.$message.success("Tải file thành công");
        }
    }
};
</script>
<style lang="">
</style>