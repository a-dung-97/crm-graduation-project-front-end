<template>
    <el-dialog
        top="0"
        width="40%"
        center
        :title="!isEdit?'Thêm cuộc gọi':'Sửa cuộc gọi'"
        :before-close="closeDialog"
        :visible.sync="showDialog"
    >
        <el-form :model="form" :rules="rules" ref="form" label-position="left" label-width="150px">
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
            <el-form-item label="Đối tượng" prop="callable_id">
                <el-input
                    v-model="obj"
                    ref="input"
                    :disabled="type!=null&&type!='customer'"
                    @focus="openDialog"
                    :placeholder="form.callable_type=='App\\Lead'?'Chọn tiềm năng':'Chọn liên hệ'"
                >
                    <el-select
                        @change="form.callable_id='';obj=''"
                        :disabled="type!=null"
                        style="width:130px"
                        v-model="form.callable_type"
                        slot="prepend"
                    >
                        <el-option label="Tiềm năng" value="App\Lead"></el-option>
                        <el-option label="Liên hệ" value="App\Contact"></el-option>
                    </el-select>
                </el-input>
            </el-form-item>
            <el-form-item label="Tiêu đề" prop="title">
                <el-input v-model="form.title" placeholder="Nhập tiêu đề"></el-input>
            </el-form-item>
            <el-form-item label="Loại cuộc gọi" prop="type">
                <el-select class="w-100" v-model="form.type" placeholder="Chọn loại cuộc gọi">
                    <el-option value="Gọi đi" label="Gọi đi"></el-option>
                    <el-option value="Gọi đến" label="Gọi đến"></el-option>
                </el-select>
            </el-form-item>
            <el-form-item label="Mục tiêu" prop="target">
                <el-select class="w-100" v-model="form.target" placeholder="Chọn mục tiêu">
                    <el-option value="Triển vọng" label="Triển vọng"></el-option>
                    <el-option value="Đàm phán" label="Đàm phán"></el-option>
                    <el-option value="Hỗ trợ" label="Hỗ trợ"></el-option>
                    <el-option value="Giới thiệu" label="Giới thiệu"></el-option>
                </el-select>
            </el-form-item>
            <el-form-item label="Thời gian gọi" prop="time">
                <el-date-picker
                    class="w-100"
                    v-model="form.time"
                    type="datetime"
                    placeholder="Chọn thời gian gọi"
                    format="dd/MM/yyyy HH:mm:ss"
                    value-format="yyyy-MM-dd HH:mm:ss"
                ></el-date-picker>
            </el-form-item>
            <el-form-item label="Thời lượng(s)" prop="duration">
                <el-input-number class="w-100" v-model="form.duration" :min="0"></el-input-number>
            </el-form-item>
            <el-form-item label="Kết quả">
                <el-input
                    class="w-100"
                    type="textarea"
                    v-model="form.result"
                    placeholder="Nhập kết quả"
                ></el-input>
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
            <el-button v-if="!isEdit" @click="createData" type="primary">Tạo mới</el-button>
            <el-button v-else @click="updateData" type="primary">Cập nhật</el-button>
        </span>
        <SelectCustomer
            v-if="customer"
            @handle-select="handleSelect"
            :customer="customer.id"
            :type="form.callable_type"
            :show-dialog.sync="showDialog1"
        />
    </el-dialog>
</template>
<script>
import { store, update } from "@/api/business/call";
import SelectCustomer from "@/components/dialogs/SelectCustomer/index";
export default {
    components: { SelectCustomer },
    props: [
        "showDialog",
        "type",
        "lead",
        "contact",
        "customer",
        "isEdit",
        "data"
    ],
    watch: {
        lead(val) {
            if (val) this.obj = val;
        },
        contact(val) {
            if (val) this.obj = val;
        },
        isEdit(val) {
            if (val) {
                for (let field in this.form)
                    this.form[field] = this.data[field];
                if (this.type == "customer") this.obj = this.data.contact;
            } else {
                for (let field in this.form) this.form[field] = "";
                if (this.type == "lead") {
                    this.form.callable_type = "App\\Lead";
                    this.form.callable_id = this.$route.params.id;
                } else if (this.type == "contact") {
                    this.form.callable_type = "App\\Contact";
                    this.form.callable_id = this.$route.params.id;
                } else if (this.type == "customer") {
                    this.form.callable_type = "App\\Contact";
                }
            }
        }
    },
    data() {
        return {
            obj: "",
            showDialog1: false,
            loading: false,
            reminder: false,
            rules: {
                callable_id: [
                    {
                        required: true,
                        message: "Hãy chọn đối tượng"
                    }
                ],
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
                type: [
                    {
                        required: true,
                        message: "Hãy chọn chủ sở hữu",
                        trigger: "blur"
                    }
                ],
                target: [
                    {
                        required: true,
                        message: "Hãy chọn mục tiêu",
                        trigger: "blur"
                    }
                ],
                target: [
                    {
                        required: true,
                        message: "Hãy chọn mục tiêu",
                        trigger: "blur"
                    }
                ],
                time: [
                    {
                        required: true,
                        message: "Hãy chọn thời gian gọi",
                        trigger: "blur"
                    }
                ],
                duration: [
                    {
                        required: true,
                        message: "Hãy chọn thời lượng",
                        trigger: "blur"
                    }
                ]
            },
            form: {
                id: "",
                user_id: "",
                type: "",
                title: "",
                time: "",
                duration: "",
                target: "",
                result: "",
                description: "",
                callable_id: "",
                callable_type: ""
            }
        };
    },
    methods: {
        handleSelect(val) {
            if (this.type == "customer") {
                this.obj = val.name;
                this.form.callable_id = val.id;
            }
        },
        openDialog() {
            this.showDialog1 = true;
        },
        closeDialog() {
            this.$emit("update:showDialog", false);
            this.$refs["form"].resetFields();
        },
        async createData() {
            try {
                await this.$refs["form"].validate();
                this.openFullScreen();
                await store(this.form);
                this.$message.success("Thêm cuộc gọi thành công");
                this.reload();
                this.closeFullScreen();
            } catch (error) {
                this.loading = false;
            }
        },
        async updateData() {
            try {
                await this.$refs["form"].validate();
                this.openFullScreen();
                await update(this.form, this.form.id);
                this.closeFullScreen();
                this.$message.success("Sửa cuộc gọi thành công");
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
        if (this.type == "lead") {
            this.form.callable_type = "App\\Lead";
            this.form.callable_id = this.$route.params.id;
        } else if (this.type == "contact") {
            this.form.callable_type = "App\\Contact";
            this.form.callable_id = this.$route.params.id;
        } else if (this.type == "customer") {
            this.form.callable_type = "App\\Contact";
        }

        this.getUsers();
    }
};
</script>
<style lang="">
</style>