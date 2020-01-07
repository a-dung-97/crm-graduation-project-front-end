<template>
    <div>
        <el-table :data="tableData" height="72vh" border v-loading="loading" style="width: 100%">
            <el-table-column type="index" width="50" label="STT"></el-table-column>
            <el-table-column prop="name" label="Tên">
                <template slot-scope="scope">
                    <a
                        class="link"
                        @click="$router.push(`/automation/email-automation/show/${scope.row.id}`)"
                    >{{ scope.row.name }}</a>
                </template>
            </el-table-column>
            <el-table-column prop="description" label="Mô tả"></el-table-column>
            <el-table-column label="Ngày tạo">
                <template slot-scope="scope">{{ scope.row.created_at|date }}</template>
            </el-table-column>
            <el-table-column align="center" width="200" label="Hành động">
                <template slot-scope="scope">
                    <el-button
                        size="medium"
                        icon="el-icon-edit"
                        circle
                        type="primary"
                        @click="handleEdit(scope.row)"
                    ></el-button>
                    <el-button
                        @click="handleDelete(scope.row.id)"
                        size="medium"
                        type="danger"
                        icon="el-icon-delete"
                        circle
                    ></el-button>
                    <el-button
                        size="medium"
                        icon="el-icon-video-pause"
                        v-if="scope.row.active"
                        @click="changeActive(scope.row.id,'Tạm dừng email tự động')"
                        circle
                        type="warning"
                    ></el-button>
                    <el-button
                        size="medium"
                        @click="changeActive(scope.row.id,'Chạy email tự động')"
                        icon="el-icon-video-play"
                        v-else
                        circle
                        type="success"
                    ></el-button>
                </template>
            </el-table-column>
        </el-table>
    </div>
</template>
<script>
import { destroy } from "@/api/automation/email-automation";
import { changeActive } from "@/api/automation/email-automation";
export default {
    props: ["tableData", "loading", "form"],
    methods: {
        handleEdit(row) {
            this.form.id = row.id;
            this.form.name = row.name;
            this.form.description = row.description;
            this.form.mailing_list_id = row.mailing_list_id;
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
        },
        async changeActive(id, msg) {
            await this.$confirm(msg, "Cảnh báo", {
                confirmButtonText: "OK",
                cancelButtonText: "Hủy",
                type: "warning"
            });
            this.openFullScreen();
            await changeActive(id);
            this.closeFullScreen();
            this.$message.success("Cập nhật thành công");
            this.$emit("handle-delete");
        },
        handleEditMembers(id) {
            this.$emit("handle-edit-members", id);
        }
    }
};
</script>
<style lang="">
</style>