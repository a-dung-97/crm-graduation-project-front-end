<template>
    <el-dialog
        width="30%"
        center
        :title="this.editing ? 'Chỉnh sửa quy tắc': 'Thêm quy tắc'"
        :before-close="closeDialog"
        :visible.sync="showDialog"
    >
        <el-form label-width="100px" label-position="left" :model="form" :rules="rules" ref="form">
            <el-form-item label="Tên trường" prop="field">
                <el-select class="w-100" v-model="form.field" placeholder="Chọn tên trường">
                    <el-option label="Nguồn" value="Nguồn"></el-option>
                    <el-option label="Tổng số nhân viên" value="Tổng số nhân viên"></el-option>
                    <el-option label="Doanh thu" value="Doanh thu"></el-option>
                    <el-option label="Ngành nghề" value="Ngành nghề"></el-option>
                </el-select>
            </el-form-item>
            <el-form-item label="Điều kiện" prop="condition">
                <el-select
                    :disabled="form.field==''"
                    class="w-100"
                    v-model="form.condition"
                    placeholder="Chọn điều kiện"
                >
                    <template v-if="form.field=='Nguồn'||form.field=='Ngành nghề'">
                        <el-option label="Là" value="="></el-option>
                        <el-option label="Không là" value="!="></el-option>
                        <el-option label="Bỏ trống" value="bỏ trống"></el-option>
                        <el-option label="Không bỏ trống" value="không bỏ trống"></el-option>
                    </template>
                    <template v-else>
                        <el-option label="=" value="="></el-option>
                        <el-option label="!=" value="!="></el-option>
                        <el-option label="<" value="<"></el-option>
                        <el-option label="<=" value="<="></el-option>
                        <el-option label=">" value=">"></el-option>
                        <el-option label=">=" value=">="></el-option>
                        <el-option label="Bỏ trống" value="bỏ trống"></el-option>
                        <el-option label="Không bỏ trống" value="không bỏ trống"></el-option>
                    </template>
                </el-select>
            </el-form-item>
            <el-form-item label="Giá trị">
                <el-select
                    :disabled="form.condition=='bỏ trống'||form.condition=='không bỏ trống'"
                    v-if="form.field=='Nguồn'||form.field=='Ngành nghề'"
                    class="w-100"
                    placeholder="Chọn giá trị"
                    v-model="form.value"
                >
                    <template v-if="form.field=='Nguồn'">
                        <el-option
                            v-for="item in options['Nguồn']"
                            :key="item.id"
                            :label="item.name"
                            :value="item.id"
                        ></el-option>
                    </template>
                    <template v-else>
                        <el-option
                            v-for="item in options['Ngành nghề']"
                            :key="item.id"
                            :label="item.name"
                            :value="item.id"
                        ></el-option>
                    </template>
                </el-select>
                <el-input
                    :disabled="form.condition=='bỏ trống'||form.condition=='không bỏ trống'"
                    v-else
                    type="number"
                    :min="0"
                    placeholder="Chọn giá trị"
                    v-model="form.value"
                ></el-input>
            </el-form-item>
            <el-form-item label="Hành động" prop="action">
                <el-switch v-model="form.action" active-text="Cộng" inactive-text="Trừ"></el-switch>
            </el-form-item>
            <el-form-item label="Điểm" prop="score">
                <el-input-number class="w-100" v-model="form.score" :min="0"></el-input-number>
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
import { store, update } from "@/api/setting/lead-score-rule";
export default {
    props: ["form", "editing", "showDialog", "options"],
    data() {
        return {
            loading: false,
            rules: {
                field: [
                    {
                        required: true,
                        message: "Hãy chọn trường",
                        trigger: "blur"
                    }
                ],
                condition: [
                    {
                        required: true,
                        message: "Hãy chọn điều kiện",
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
                if (
                    this.form.condition != "bỏ trống" &&
                    this.form.condition != "không bỏ trống"
                ) {
                    if (this.form.value == "") {
                        this.$message.error("Bạn chưa nhập giá trị");
                        return;
                    }
                }
                this.loading = true;
                await store(this.form);
                this.reload();
            } catch (error) {}
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