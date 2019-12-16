<template>
    <el-dialog
        width="40%"
        top="0vh"
        center
        :title="this.isEdit ? 'Chỉnh sửa báo cáo': 'Thêm báo cáo'"
        :before-close="closeDialog"
        :visible.sync="showDialog"
    >
        <el-form label-position="left" label-width="150px" :model="form" :rules="rules" ref="form">
            <el-form-item label="Tên báo cáo" prop="name">
                <el-input label="Tên báo cáo" v-model="form.name" placeholder="Nhập tên báo cáo"></el-input>
            </el-form-item>
            <el-form-item label="Module" prop="module">
                <el-select
                    class="w-100"
                    v-model="form.module"
                    @clear="form.related='';form.column=''"
                    placeholder="Chọn module"
                >
                    <el-option label="Khách hàng" value="customer"></el-option>
                    <el-option label="Công việc" value="task"></el-option>
                    <el-option label="Cơ hội" value="opportunity"></el-option>
                </el-select>
            </el-form-item>
            <el-form-item label="Module liên quan">
                <el-select
                    :disabled="form.module==''"
                    class="w-100"
                    v-model="form.related"
                    placeholder="Chọn module liên quan"
                >
                    <template v-if="form.module=='customer'">
                        <el-option label="Đơn hàng" value="order"></el-option>
                        <el-option label="Báo giá" value="quote"></el-option>
                    </template>
                    <template v-if="form.module=='task'">
                        <el-option label="Người dùng" value="user"></el-option>
                    </template>
                    <template v-if="form.module=='opportunity'">
                        <el-option label="Khách hàng" value="customer"></el-option>
                    </template>
                </el-select>
            </el-form-item>
            <el-form-item label="Cột" prop="column">
                <el-select
                    :disabled="form.module==''"
                    multiple
                    class="w-100"
                    v-model="form.column"
                    placeholder="Chọn"
                >
                    <template v-if="form.module=='customer'">
                        <el-option-group label="Khách hàng">
                            <el-option
                                v-for="item in options.customer"
                                :key="item.value"
                                :value="item.value"
                                :label="item.label"
                            ></el-option>
                        </el-option-group>
                        <el-option-group v-if="form.related=='order'" label="Đơn hàng">
                            <el-option
                                v-for="item in options.order"
                                :key="item.value"
                                :value="item.value"
                                :label="item.label"
                            ></el-option>
                        </el-option-group>
                        <el-option-group v-if="form.related=='quote'" label="Báo giá">
                            <el-option
                                v-for="item in options.quote"
                                :key="item.value"
                                :value="item.value"
                                :label="item.label"
                            ></el-option>
                        </el-option-group>
                    </template>
                    <template v-if="form.module=='task'">
                        <el-option-group label="Công việc">
                            <el-option
                                v-for="item in options.task"
                                :key="item.value"
                                :value="item.value"
                                :label="item.label"
                            ></el-option>
                        </el-option-group>
                        <el-option-group v-if="form.related=='user'" label="Người dùng">
                            <el-option
                                v-for="item in options.user"
                                :key="item.value"
                                :value="item.value"
                                :label="item.label"
                            ></el-option>
                        </el-option-group>
                    </template>
                    <template v-if="form.module=='opportunity'">
                        <el-option-group label="Cơ hội">
                            <el-option
                                v-for="item in options.opportunity"
                                :key="item.value"
                                :value="item.value"
                                :label="item.label"
                            ></el-option>
                        </el-option-group>
                        <el-option-group v-if="form.related=='customer'" label="Khách hàng">
                            <el-option
                                v-for="item in options.customer"
                                :key="item.value"
                                :value="item.value"
                                :label="item.label"
                            ></el-option>
                        </el-option-group>
                    </template>
                </el-select>
            </el-form-item>
            <el-form-item label="Lọc theo" prop="filter.column">
                <el-select
                    :disabled="form.module==''"
                    class="w-100"
                    v-model="form.filter.column"
                    placeholder="Lọc theo"
                >
                    <template v-if="form.module=='customer'">
                        <el-option label="Ngày tạo khách hàng" value="created_at"></el-option>
                        <el-option
                            v-if="form.related=='order'"
                            label="Đơn hàng"
                            value="Ngày đặt hàng"
                        ></el-option>
                    </template>
                    <template v-if="form.module=='task'">
                        <el-option label="Ngày bắt đầu" value="start_date"></el-option>
                    </template>
                    <template v-if="form.module=='opportunity'">
                        <el-option label="Ngày kết thúc" value="end_date"></el-option>
                        <el-option
                            v-if="form.related=='customer'"
                            label="Ngày tạo khách hàng"
                            value="created_at"
                        ></el-option>
                    </template>
                </el-select>
            </el-form-item>

            <el-form-item label="Thời gian" prop="filter.value">
                <el-date-picker
                    class="w-100"
                    v-model="form.filter.value"
                    type="datetimerange"
                    range-separator="-"
                    start-placeholder="Từ ngày"
                    end-placeholder="Tới ngày"
                    format="dd/MM/yyyy"
                    value-format="yyyy-MM-dd"
                ></el-date-picker>
            </el-form-item>
            <el-form-item label="Mô tả">
                <el-input v-model="form.description" type="textarea" placeholder="Nhập mô tả"></el-input>
            </el-form-item>
        </el-form>
        <span slot="footer" class="dialog-footer">
            <el-button @click="closeDialog">Hủy</el-button>
            <el-button v-if="isEdit" type="primary" :loading="loading" @click="updateData">Cập nhật</el-button>
            <el-button v-else :loading="loading" @click="createData" type="primary">Tạo mới</el-button>
        </span>
    </el-dialog>
</template>
<script>
import options from "./data";
import { store, update } from "@/api/report/dynamic";
export default {
    props: ["data", "isEdit", "showDialog"],
    watch: {
        showDialog() {
            if (!this.isEdit) {
                for (let field in this.form)
                    if (field != "filter") this.form[field] = "";
                for (let field in this.form["filter"])
                    this.form["filter"][field] = "";
            } else {
                for (let field in this.form)
                    this.form[field] = this.data[field];
            }
        }
    },
    data() {
        return {
            loading: false,
            form: {
                id: "",
                name: "",
                module: "",
                column: "",
                related: "",
                filter: {
                    column: "",
                    value: ""
                },
                description: ""
            },
            options: "",
            rules: {
                name: [
                    {
                        required: true,
                        message: "Hãy nhập tên báo cáo",
                        trigger: "blur"
                    }
                ],
                module: [
                    {
                        required: true,
                        message: "Hãy chọn module",
                        trigger: "blur"
                    }
                ],
                column: [
                    {
                        required: true,
                        message: "Hãy chọn các cột trong báo cáo",
                        trigger: "blur"
                    }
                ],
                "filter.column": [
                    {
                        required: true,
                        message: "Hãy chọn điều kiện lọc",
                        trigger: "blur"
                    }
                ],
                "filter.value": [
                    {
                        required: true,
                        message: "Hãy chọn giá trị lọc",
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
                await store(this.form);
                this.reload();
            } catch (error) {
                this.loading = false;
            }
        },
        reload() {
            this.loading = false;
            this.$message.success(
                this.isEdit ? "Cập nhật thành công" : "Thêm mới thành công"
            );
            this.closeDialog();
            this.$emit("reload");
        }
    },
    created() {
        this.options = options;
    }
};
</script>
<style lang="">
</style>