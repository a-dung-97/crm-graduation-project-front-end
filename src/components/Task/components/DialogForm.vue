<template>
    <el-dialog
        top="0"
        width="40%"
        center
        title="Thêm công việc"
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
            <el-form-item label="Tiêu đề" prop="title">
                <el-input v-model="form.title"></el-input>
            </el-form-item>
            <el-form-item v-if="type=='opportunity'||type=='customer'" label="Liên hệ">
                <el-input
                    ref="input1"
                    @focus="openDialog('contact')"
                    clearable
                    @clear="form.contact_id=''"
                    v-model="contact"
                    placeholder="Chọn liên hệ"
                ></el-input>
            </el-form-item>
            <el-form-item v-if="type=='contact'||type=='customer'" label="Cơ hội">
                <el-input
                    ref="input2"
                    @focus="openDialog('opportunity')"
                    clearable
                    @clear="form.opportunity_id=''"
                    v-model="opportunity"
                    placeholder="Chọn cơ hội"
                ></el-input>
            </el-form-item>
            <el-form-item label="Ngày bắt đầu">
                <el-date-picker
                    class="w-100"
                    v-model="form.start_date"
                    type="date"
                    placeholder="Chọn ngày bắt đầu"
                    format="dd/MM/yyyy"
                    value-format="yyyy-MM-dd"
                ></el-date-picker>
            </el-form-item>
            <el-form-item label="Ngày hết hạn">
                <el-date-picker
                    class="w-100"
                    v-model="form.expiration_date"
                    type="date"
                    placeholder="Chọn ngày hết hạn"
                    format="dd/MM/yyyy"
                    value-format="yyyy-MM-dd"
                ></el-date-picker>
            </el-form-item>
            <el-form-item label="Độ ưu tiên">
                <el-select class="w-100" v-model="form.priority" placeholder="Chọn độ ưu tiên">
                    <el-option value="1" label="Thấp nhất"></el-option>
                    <el-option value="2" label="Thấp"></el-option>
                    <el-option value="3" label="Bình thường"></el-option>
                    <el-option value="4" label="Cao"></el-option>
                    <el-option value="5" label="Cao nhất"></el-option>
                </el-select>
            </el-form-item>
            <el-form-item label="Trạng thái">
                <el-select class="w-100" v-model="form.status" placeholder="Chọn trạng thái">
                    <el-option value="1" label="Chưa thực hiện"></el-option>
                    <el-option value="2" label="Đang thực hiện"></el-option>
                    <el-option value="3" label="Đã giải quyết"></el-option>
                    <el-option value="4" label="Đã hoàn thành"></el-option>
                </el-select>
            </el-form-item>
            <el-form-item label="Nhắc nhở">
                <el-switch v-model="reminder" active-color="#13ce66" inactive-color="#ff4949"></el-switch>
            </el-form-item>
            <template v-if="reminder">
                <el-form-item label="Ngày nhắc">
                    <el-date-picker
                        v-model="form.reminder_time"
                        type="datetime"
                        format="dd/MM/yyyy HH:mm:ss"
                        value-format="yyyy-MM-dd HH:mm:ss"
                    ></el-date-picker>
                </el-form-item>
                <el-form-item label="Kiểu nhắc">
                    <el-radio v-model="form.reminder_type" label="1">Email</el-radio>
                    <el-radio v-model="form.reminder_type" label="2">Thông báo</el-radio>
                    <el-radio v-model="form.reminder_type" label="3">Cả hai</el-radio>
                </el-form-item>
            </template>
        </el-form>
        <span slot="footer" class="dialog-footer">
            <el-button @click="closeDialog">Hủy</el-button>
            <el-button :loading="loading" @click="createData" type="primary">Tạo mới</el-button>
        </span>
        <SelectCustomer
            @handle-select="handleSelectCon"
            type="contact"
            :show-dialog.sync="showDialog2"
            :customer="customerId"
        />
        <SelectOpportunity
            @handle-select="handleSelectOp"
            :show-dialog.sync="showDialog1"
            :customer="customerId"
        />
    </el-dialog>
</template>
<script>
import SelectCustomer from "@/components/dialogs/SelectCustomer/index";
import SelectOpportunity from "@/components/dialogs/SelectOpportunity/index";
import { addTask } from "@/api/business/task";
export default {
    components: { SelectCustomer, SelectOpportunity },
    props: ["form", "showDialog", "type", "customer"],
    data() {
        return {
            mode: "",
            showDialog1: false,
            showDialog2: false,
            contact: "",
            opportunity: "",
            loading: false,
            reminder: false,
            rules: {
                title: [
                    {
                        required: true,
                        message: "Hãy nhập tiêu đề",
                        trigger: "blur"
                    }
                ],
                user_id: [
                    {
                        required: true,
                        message: "Hãy chọn chủ sở hữu",
                        trigger: "blur"
                    }
                ]
            }
        };
    },
    computed: {
        customerId() {
            if (this.type == "customer") return this.$route.params.id;
            else return this.customer;
        }
    },
    watch: {
        reminder(val) {
            let curentDate =
                new Date().getFullYear() +
                "-" +
                (new Date().getMonth() + 1) +
                "-" +
                new Date().getDate();
            let curentDateTime =
                curentDate + " " + new Date().toLocaleTimeString("en-GB");

            if (val) {
                this.form.reminder_type = "1";
                this.form.reminder_time = curentDateTime;
            } else {
                this.form.reminder_type = "";
                this.form.reminder_time = "";
            }
        }
    },
    methods: {
        openDialog(type) {
            if (type == "opportunity") this.showDialog1 = true;
            else this.showDialog2 = true;
        },
        handleSelectCon(val) {
            this.contact = val.name;
            this.form.contact_id = val.id;
        },

        handleSelectOp(val) {
            this.opportunity = val.name;
            this.form.opportunity_id = val.id;
        },
        closeDialog() {
            this.$emit("update:showDialog", false);
            this.$refs["form"].resetFields();
        },
        async createData() {
            try {
                await this.$refs["form"].validate();
                this.loading = true;
                let data = this.form;
                if (this.type != "customer" && this.type != "lead")
                    data = {
                        ...this.form,
                        taskable_type: "App\\Customer",
                        taskable_id: this.customerId
                    };
                await addTask(data, this.type, this.$route.params.id);
                this.reload();
            } catch (error) {
                this.loading = false;
            }
        },
        reload() {
            this.loading = false;
            this.$message.success("Thêm mới thành công");
            this.closeDialog();
            this.$emit("reload");
        }
    },
    created() {
        // if (this.type == "customer") this.customerId = this.$route.params.id;
        // else this.customerId = this.customer;
        this.getUsers();
    }
};
</script>
<style lang="">
</style>