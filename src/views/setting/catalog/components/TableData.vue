<template>
    <el-table :data="tableData" style="width: 100%" row-key="id" border>
        <el-table-column prop="name" label="Tên danh mục" min-width="280"></el-table-column>
        <el-table-column prop="description" label="Mô tả" min-width="280"></el-table-column>
        <el-table-column label="Hành động" align="center" min-width="80">
            <template slot-scope="scope">
                <el-tooltip
                    class="item"
                    effect="dark"
                    content="Thêm"
                    placement="top"
                    v-if="isParrentId(scope.row.id)"
                >
                    <el-button
                        @click="handleCreate(scope.row.id)"
                        size="medium"
                        type="primary"
                        icon="el-icon-plus"
                        circle
                    ></el-button>
                </el-tooltip>
                <template v-else>
                    <el-tooltip class="item" effect="dark" content="Chỉnh sửa" placement="top">
                        <el-button
                            size="medium"
                            type="primary"
                            icon="el-icon-edit"
                            circle
                            @click="handleEdit(scope.row)"
                        ></el-button>
                    </el-tooltip>
                    <el-tooltip class="item" effect="dark" content="Xóa" placement="top">
                        <el-button
                            size="medium"
                            type="danger"
                            icon="el-icon-delete"
                            circle
                            @click="handleDelete(scope.row.id)"
                        ></el-button>
                    </el-tooltip>
                </template>
            </template>
        </el-table-column>
    </el-table>
</template>
<script>
import { destroy } from "@/api/setting/catalog";
export default {
    props: ["tableData", "form"],
    methods: {
        handleEdit(row) {
            this.form.id = row.id;
            this.form.name = row.name;
            this.form.description = row.description;
            this.form.parent_id = row.parent_id;
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
        isParrentId(id) {
            return this.tableData.map(item => item.id).indexOf(id) == -1
                ? false
                : true;
        },
        handleCreate(id) {
            this.$emit("handle-create", id);
        }
    }
};
</script>
<style lang="">
</style>