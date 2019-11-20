<template>
    <el-table :data="tableData" border v-loading="loading" style="width:100%">
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
        <el-table-column width="120" label="Loại">
            <template slot-scope="scope">
                <el-tag
                    :type="scope.row.type === 'Tiềm năng' ? 'success' : 'primary'"
                    disable-transitions
                    size="small"
                >{{scope.row.type==='product'?'Tiềm năng':"Khách hàng"}}</el-tag>
            </template>
        </el-table-column>
        <el-table-column width="130" label="Trạng thái">
            <template slot-scope="scope">
                <el-tag type="primary">{{ scope.row.status }}</el-tag>
            </template>
        </el-table-column>
        <el-table-column width="150" label="Đối tượng">
            <template slot-scope="scope">
                <router-link
                    tag="a"
                    class="link"
                    :to="scope.row.type=='Tiềm năng'?`/customer/lead/show/${scope.row.taskable.id}`:`/customer/customer/show/${scope.row.taskable.id}`"
                >{{ scope.row.taskable.name }}</router-link>
            </template>
        </el-table-column>
        <el-table-column prop="user" width="150" label="Chủ sở hữu"></el-table-column>
        <el-table-column width="140" label="Ngày bắt đầu">
            <template slot-scope="scope">{{ scope.row.start_date|date }}</template>
        </el-table-column>
        <el-table-column width="140" label="Ngày hết hạn">
            <template slot-scope="scope">{{ scope.row.expiration_date|date }}</template>
        </el-table-column>
        <el-table-column width="140" label="Ngày hoàn thành">
            <template slot-scope="scope">{{ scope.row.finish_date|date }}</template>
        </el-table-column>
        <el-table-column width="120" fixed="right" align="center" label="Hành động">
            <template slot-scope="scope">
                <el-button
                    type="primary"
                    @click="$router.push(`/business/task/edit/${scope.row.id}`)"
                    icon="el-icon-edit"
                    circle
                    :disabled="scope.row.finish_date!=null"
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
import { destroy } from "@/api/business/task";
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