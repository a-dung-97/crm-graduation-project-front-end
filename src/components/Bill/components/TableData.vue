<template>
    <div>
        <el-table :data="tableData" v-loading="loading" style="width: 100%">
            <el-table-column prop="created_at" width="100" label="Ngày tạo">
                <template slot-scope="scope">{{ scope.row.created_at|date }}</template>
            </el-table-column>
            <el-table-column prop="name" label="Tên"></el-table-column>
            <el-table-column width="150" label="Số tiền thanh toán">
                <template slot-scope="scope">{{ scope.row.payment_amount|money }}</template>
            </el-table-column>
            <el-table-column prop="payment_method" width="165" label="Hình thức thanh toán"></el-table-column>
            <el-table-column prop="cashbook.name" width="180" label="Sổ quỹ, tài khoản NH"></el-table-column>
            <el-table-column prop="status" width="120" label="Trạng thái"></el-table-column>
            <el-table-column prop="note" label="Ghi chú"></el-table-column>
            <el-table-column align="center" width="180" label="Hành động">
                <template slot-scope="scope">
                    <el-button
                        size="medium"
                        icon="el-icon-edit"
                        circle
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
                        v-if="scope.row.status=='Chưa xác nhận'"
                        @click="verifyBill(scope.row.id)"
                        size="medium"
                        type="success"
                        icon="el-icon-circle-check"
                        circle
                    ></el-button>
                </template>
            </el-table-column>
        </el-table>
    </div>
</template>
<script>
import { destroy, verify } from "@/api/accounting/bill";
export default {
    props: ["tableData", "loading"],
    methods: {
        handleEdit(row) {
            this.$emit("handle-edit", row);
        },
        async handleDelete(id) {
            await this.$confirm("Bạn có chắc chắn muốn xóa?", "Cảnh báo", {
                confirmButtonText: "Xóa",
                cancelButtonText: "Hủy",
                type: "warning"
            });
            await destroy(id);
            this.$message.success("Xóa dữ liệu thành công");
            this.$emit("handle-delete");
        },
        async verifyBill(id) {
            await this.$confirm(
                "Bạn có muốn xác nhận phiếu thanh toán này?",
                "Xác nhận",
                {
                    confirmButtonText: "Xác nhận",
                    cancelButtonText: "Hủy",
                    type: "warning"
                }
            );
            await verify(id);
            this.$message.success("Xác nhận phiếu thanh toán thành công");
            this.$emit("handle-verify");
        }
    }
};
</script>
<style lang="">
</style>