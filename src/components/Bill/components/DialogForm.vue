<template>
    <el-dialog
        width="40%"
        center
        top="10vh"
        :title="this.editing ? 'Chỉnh sửa phiếu thanh toán': 'Thêm phiếu thanh toán'"
        :before-close="closeDialog"
        :visible.sync="showDialog"
    >
        <el-form label-position="left" labelWidth="165px" :model="form" :rules="rules" ref="form">
            <el-form-item label="Tên thanh toán" prop="name">
                <el-input v-model="form.name" placeholder="Nhập tên thanh toán"></el-input>
            </el-form-item>
            <el-form-item label="Số tiền thanh toán" prop="payment_amount">
                <el-input
                    type="number"
                    min="0"
                    placeholder="Nhập số tiền thanh toán"
                    v-model="form.payment_amount"
                ></el-input>
            </el-form-item>
            <el-form-item label="Hình thức thanh toán" prop="payment_method">
                <el-select
                    style="width:100%"
                    v-model="form.payment_method"
                    placeholder="Chọn hình thức thanh toán"
                >
                    <el-option label="Tiền mặt" value="Tiền mặt"></el-option>
                    <el-option label="Chuyển khoản" value="Chuyển khoản"></el-option>
                </el-select>
            </el-form-item>
            <el-form-item label="Sổ quỹ" prop="cashbook_id">
                <el-select
                    :disabled="form.payment_method==''"
                    style="width:100%"
                    v-model="form.cashbook_id"
                    placeholder="Chọn sổ quỹ"
                >
                    <el-option
                        v-for="item in filteredCashbooks"
                        :key="item.id"
                        :label="item.name"
                        :value="item.id"
                    ></el-option>
                </el-select>
            </el-form-item>
            <el-form-item label="Trạng thái" prop="payment_method">
                <el-select style="width:100%" v-model="form.status" placeholder="Chọn trạng thái">
                    <el-option label="Đã xác nhận" value="Đã xác nhận"></el-option>
                    <el-option label="Chưa xác nhận" value="Chưa xác nhận"></el-option>
                </el-select>
            </el-form-item>
            <el-form-item label="Ghi chú">
                <el-input placeholder="Nhập ghi chú" v-model="form.note"></el-input>
            </el-form-item>
        </el-form>
        <span slot="footer" class="dialog-footer">
            <el-button @click="closeDialog">Hủy</el-button>
            <el-button v-if="editing" type="primary" :loading="loading" @click="updateData">Cập nhật</el-button>
            <el-button v-else :loading="loading" @click="createData" type="primary">Tạo mới</el-button>
        </span>
    </el-dialog>
</template>
<script>
import { store, update } from "@/api/accounting/bill";
export default {
    props: ["form", "editing", "showDialog", "cashbooks"],
    computed: {
        filteredCashbooks() {
            return this.form.payment_method == "Tiền mặt"
                ? this.cashbooks.filter(item => item.type == "Tiền mặt")
                : this.cashbooks.filter(item => item.type == "Ngân hàng");
        }
    },
    data() {
        return {
            loading: false,
            rules: {
                name: [
                    {
                        required: true,
                        message: "Hãy nhập tên thanh toán",
                        trigger: "blur"
                    }
                ],
                payment_amount: [
                    {
                        required: true,
                        message: "Hãy nhập số tiền thanh toán",
                        trigger: "blur"
                    }
                ],
                payment_method: [
                    {
                        required: true,
                        message: "Hãy chọn phương thức thanh toán",
                        trigger: "blur"
                    }
                ],
                cashbook_id: [
                    {
                        required: true,
                        message: "Hãy chọn sổ quỹ",
                        trigger: "blur"
                    }
                ],
                status: [
                    {
                        required: true,
                        message: "Hãy chọn trạng thái",
                        trigger: "blur"
                    }
                ]
            }
        };
    },
    methods: {
        closeDialog() {
            this.$emit("update:showDialog", false);
            this.$refs["form"].resetFields();
        },
        async updateData() {
            try {
                await this.$refs["form"].validate();
                this.loading = true;
                await update(this.form, this.form.id);
                this.reload();
            } catch (error) {
                this.loading = false;
            }
        },
        async createData() {
            try {
                await this.$refs["form"].validate();
                this.loading = true;
                this.form.invoice_id = this.$route.params.id;
                await store(this.form);
                this.reload();
            } catch (error) {
                this.loading = false;
            }
        },
        reload() {
            this.loading = false;
            this.$message.success(
                this.editing ? "Cập nhật thành công" : "Thêm mới thành công"
            );
            this.closeDialog();
            this.$emit("reload");
        }
    }
};
</script>
<style lang="">
</style>