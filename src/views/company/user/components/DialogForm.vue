<template>
    <el-dialog
        width="30%"
        center
        :title="editing ? 'Chỉnh sửa người dùng': 'Mời người dùng'"
        :before-close="closeDialog"
        :visible.sync="showDialog"
    >
        <el-form :model="form" :rules="rules" ref="form">
            <template v-if="editing">
                <el-form-item label="Tên" prop="name">
                    <el-input v-model="form.name"></el-input>
                </el-form-item>
                <el-form-item label="Số điện thoại" prop="phone_number">
                    <el-input v-model="form.phone_number"></el-input>
                </el-form-item>
                <el-form-item label="Trạng thái">
                    <el-switch v-model="form.active"></el-switch>
                </el-form-item>
            </template>
            <el-form-item v-else label="Email" prop="email">
                <el-input v-model="form.email"></el-input>
            </el-form-item>
            <el-form-item label="Phòng ban" prop="department_id">
                <el-select
                    clearable
                    v-model="form.department_id"
                    style="width:100%"
                    placeholder="Chọn phòng ban"
                >
                    <el-option
                        v-for="item in options.departments"
                        :key="item.id"
                        :label="item.name"
                        :value="item.id"
                    ></el-option>
                </el-select>
            </el-form-item>
            <el-form-item label="Chức vụ" prop="position_id">
                <el-select
                    clearable
                    v-model="form.position_id"
                    style="width:100%"
                    placeholder="Chọn chức vụ"
                >
                    <el-option
                        v-for="item in options.positions"
                        :key="item.id"
                        :label="item.name"
                        :value="item.id"
                    ></el-option>
                </el-select>
            </el-form-item>
            <el-form-item label="Quyền" prop="role_id">
                <el-select
                    clearable
                    v-model="form.role_id"
                    style="width:100%"
                    placeholder="Chọn quyền"
                >
                    <el-option
                        v-for="item in options.roles"
                        :key="item.id"
                        :label="item.name"
                        :value="item.id"
                    ></el-option>
                </el-select>
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
import { invite, update } from "@/api/company/user";
import { validatePhoneNumber } from "@/utils/validate";
export default {
    props: ["form", "editing", "showDialog", "options"],
    data() {
        return {
            loading: false,
            rules: {
                name: [
                    {
                        required: true,
                        message: "Bạn chưa nhập tên người dùng",
                        trigger: "blur"
                    }
                ],
                email: [
                    {
                        required: true,
                        message: "Bạn chưa nhập địa chỉ email",
                        trigger: "blur"
                    },
                    {
                        type: "email",
                        message: "Địa chỉ email không đúng",
                        trigger: "blur"
                    }
                ],
                phone_number: [
                    {
                        required: true,
                        validator: validatePhoneNumber,
                        trigger: "blur"
                    }
                ],
                department_id: [
                    {
                        required: true,
                        message: "Bạn chưa chọn phòng ban",
                        trigger: "blur"
                    }
                ],
                position_id: [
                    {
                        required: true,
                        message: "Bạn chưa chọn chức vụ",
                        trigger: "blur"
                    }
                ],
                role_id: [
                    {
                        required: true,
                        message: "Bạn chưa chọn quyền",
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
                const {
                    email,
                    position_id,
                    department_id,
                    role_id
                } = this.form;
                await invite({ email, position_id, department_id, role_id });
                this.reload();
            } catch (error) {
                this.loading = false;
            }
        },
        reload() {
            this.loading = false;
            this.$message.success(
                this.editing
                    ? "Cập nhật thành công"
                    : "Mời người dùng thành công"
            );
            this.closeDialog();
            this.$emit("reload");
        }
    }
};
</script>
<style lang="">
</style>