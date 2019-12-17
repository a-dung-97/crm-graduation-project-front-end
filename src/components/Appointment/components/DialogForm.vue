<template>
    <el-dialog
        top="0"
        width="40%"
        center
        :title="!isEdit?'Thêm cuộc hẹn':'Sửa cuộc hẹn'"
        :before-close="closeDialog"
        :visible.sync="showDialog"
    >
        <el-form :model="form" :rules="rules" ref="form" label-position="left" label-width="180px">
            <el-form-item label="Chủ sở hữu" prop="user_id">
                <el-select
                    class="w-100"
                    v-model="form.user_id"
                    filterable
                    placeholder="Chọn chủ sở hữu"
                >
                    <el-option
                        style="max-height:100%"
                        v-for="item in userOptions"
                        :key="item.id"
                        :label="item.name"
                        :value="item.id"
                    >
                        <span style="float: left">{{ item.name }}</span>
                        <span style="float: right; color: #8492a6; font-size: 13px">{{ item.email }}</span>
                    </el-option>
                </el-select>
            </el-form-item>
            <el-form-item label="Tiêu đề" prop="title">
                <el-input v-model="form.title" placeholder="Nhập tiêu đề"></el-input>
            </el-form-item>
            <el-form-item label="Thời gian hẹn" prop="time">
                <el-date-picker
                    class="w-100"
                    v-model="form.time"
                    type="datetime"
                    placeholder="Chọn thời gian hẹn"
                    format="dd/MM/yyyy HH:mm:ss"
                    value-format="yyyy-MM-dd HH:mm:ss"
                ></el-date-picker>
            </el-form-item>
            <el-form-item label="Địa điểm">
                <el-input v-model="form.place" placeholder="Nhập địa điểm hẹn"></el-input>
            </el-form-item>
            <el-form-item label="Người dùng tham gia">
                <el-input v-model="count.users" ref="input" @focus="openDialog('users')"></el-input>
            </el-form-item>
            <el-form-item label="Tiềm năng tham gia">
                <el-input v-model="count.leads" ref="input" @focus="openDialog('leads')"></el-input>
            </el-form-item>
            <el-form-item label="Liên hệ tham gia">
                <el-input v-model="count.contacts" ref="input" @focus="openDialog('contacts')"></el-input>
            </el-form-item>
            <el-form-item label="Mô tả">
                <el-input
                    class="w-100"
                    type="textarea"
                    v-model="form.description"
                    placeholder="Nhập mô tả"
                ></el-input>
            </el-form-item>
        </el-form>
        <span slot="footer" class="dialog-footer">
            <el-button @click="closeDialog">Hủy</el-button>
            <el-button :loading="loading" v-if="!isEdit" @click="createData" type="primary">Tạo mới</el-button>
            <el-button :loading="loading" v-else @click="updateData" type="primary">Cập nhật</el-button>
        </span>
        <SelectParticipants
            @handle-select="handleSelect"
            :mode="mode"
            :show-dialog.sync="showDialog1"
            :data="selection"
        />
    </el-dialog>
</template>
<script>
import { store, update } from "@/api/business/appointment";
import SelectCustomer from "@/components/dialogs/SelectCustomer/index";
import SelectParticipants from "./SelectParticipants";
export default {
    components: { SelectCustomer, SelectParticipants },
    props: ["showDialog", "type", "isEdit", "data"],
    watch: {
        showDialog() {
            if (!this.isEdit) {
                for (let field in this.form)
                    if (field != "participants") this.form[field] = "";
                for (let field in this.form["participants"]) {
                    this.form["participants"][field] = [];
                }
                this.form["participants"][`${this.type}s`] = [
                    Number(this.$route.params.id)
                ];
                for (let field in this.count) {
                    this.count[field] = 0;
                }
                this.count[`${this.type}s`] = 1;
            } else {
                for (let field in this.form)
                    this.form[field] = this.data[field];
                for (let field in this.count)
                    this.count[field] = this.form.participants[field].length;
                console.log(this.data);
            }
        }
    },
    data() {
        return {
            selection: "",
            loading: false,
            count: { users: 0, leads: 0, contacts: 0 },
            mode: "",
            showDialog1: false,
            rules: {
                user_id: [
                    {
                        required: true,
                        message: "Hãy chọn chủ sở hữu",
                        trigger: "blur"
                    }
                ],
                title: [
                    {
                        required: true,
                        message: "Hãy nhập tiêu đề",
                        trigger: "blur"
                    }
                ],
                time: [
                    {
                        required: true,
                        message: "Hãy chọn thời gian hẹn",
                        trigger: "blur"
                    }
                ]
            },
            form: {
                id: "",
                user_id: "",
                title: "",
                time: "",
                place: "",
                description: "",
                participants: {
                    contacts: [],
                    leads: [],
                    users: []
                }
            }
        };
    },
    methods: {
        handleSelect(val) {
            this.count[this.mode] = val.length;
            this.form.participants[this.mode] = val;
            console.log(this.form);
        },
        openDialog(val) {
            this.mode = val;
            this.selection = this.form.participants[val];
            this.showDialog1 = true;
        },
        closeDialog() {
            this.$emit("update:showDialog", false);
            this.$refs["form"].resetFields();
        },
        async createData() {
            try {
                await this.$refs["form"].validate();
                this.loading = true;
                await store(this.form);
                this.$message.success("Thêm cuộc hẹn thành công");
                this.reload();
            } catch (error) {
                this.loading = false;
            }
        },
        async updateData() {
            try {
                await this.$refs["form"].validate();
                this.loading = true;
                await update(this.form, this.form.id);
                this.$message.success("Sửa cuộc hẹn thành công");
                this.reload();
            } catch (error) {
                this.loading = false;
            }
        },
        reload() {
            this.loading = false;
            this.closeDialog();
            this.$emit("reload");
        }
    },
    created() {
        this.getUsers();
    }
};
</script>
<style lang="">
</style>