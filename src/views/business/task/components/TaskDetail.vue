<template>
    <el-row
        v-loading.fullscreen.lock="loading"
        element-loading-text="Xin vui lòng chờ"
        element-loading-background="rgba(0, 0, 0, 0.8)"
    >
        <el-col :span="24">
            <el-button
                v-if="!isEdit"
                size="medium"
                @click="createTask"
                type="primary"
                class="fr"
            >Thêm công việc</el-button>
            <el-button v-else size="medium" @click="updateTask" type="primary" class="fr">Cập nhật</el-button>
        </el-col>
        <el-form
            :disabled="isShow"
            :model="form"
            :rules="rules"
            ref="form"
            label-position="left"
            label-width="150px"
        >
            <el-col style="margin-top:20px" :span="24">
                <el-card>
                    <div slot="header">
                        <span>Thông tin công việc</span>
                    </div>
                    <el-row :gutter="30">
                        <el-col :md="12" :sm="24">
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
                                        <span
                                            style="float: right; color: #8492a6; font-size: 13px"
                                        >{{ item.email }}</span>
                                    </el-option>
                                </el-select>
                            </el-form-item>
                            <el-form-item label="Tiêu đề" prop="title">
                                <el-input v-model="form.title"></el-input>
                            </el-form-item>
                            <el-form-item label="Đối tượng">
                                <el-input
                                    v-model="obj"
                                    ref="input"
                                    @focus="openDialog('obj')"
                                    :placeholder="form.taskable_type=='App\\Lead'?'Chọn tiềm năng':'Chọn khách hàng'"
                                >
                                    <el-select
                                        @change="form.taskable_id='';obj=''"
                                        style="width:130px"
                                        v-model="form.taskable_type"
                                        slot="prepend"
                                    >
                                        <el-option label="Tiềm năng" value="App\Lead"></el-option>
                                        <el-option label="Khách hàng" value="App\Customer"></el-option>
                                    </el-select>
                                </el-input>
                            </el-form-item>
                            <el-form-item label="Liên hệ">
                                <el-input
                                    ref="input1"
                                    :disabled="form.taskable_type=='App\\Lead'"
                                    @focus="openDialog('contact')"
                                    clearable
                                    @clear="form.contact_id=''"
                                    v-model="contact"
                                    placeholder="Chọn liên hệ"
                                ></el-input>
                            </el-form-item>
                            <el-form-item label="Nhắc nhở">
                                <el-switch
                                    v-model="reminder"
                                    active-color="#13ce66"
                                    inactive-color="#ff4949"
                                ></el-switch>
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
                        </el-col>
                        <el-col :md="12" :sm="24">
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
                                <el-select
                                    class="w-100"
                                    v-model="form.priority"
                                    placeholder="Chọn độ ưu tiên"
                                >
                                    <el-option value="1" label="Thấp nhất"></el-option>
                                    <el-option value="2" label="Thấp"></el-option>
                                    <el-option value="3" label="Bình thường"></el-option>
                                    <el-option value="4" label="Cao"></el-option>
                                    <el-option value="5" label="Cao nhất"></el-option>
                                </el-select>
                            </el-form-item>
                            <el-form-item label="Trạng thái">
                                <el-select
                                    class="w-100"
                                    v-model="form.status"
                                    placeholder="Chọn trạng thái"
                                >
                                    <el-option value="1" label="Chưa thực hiện"></el-option>
                                    <el-option value="2" label="Đang thực hiện"></el-option>
                                    <el-option value="3" label="Đã giải quyết"></el-option>
                                    <el-option value="4" label="Đã hoàn thành"></el-option>
                                </el-select>
                            </el-form-item>
                        </el-col>
                    </el-row>
                </el-card>
            </el-col>
            <el-col style="margin-top:20px" :span="24">
                <el-card>
                    <div slot="header">Thông tin mô tả</div>
                    <el-input v-model="form.description" type="textarea"></el-input>
                </el-card>
            </el-col>
        </el-form>
        <SelectCustomer
            @handle-select="handleSelect"
            :customer="form.taskable_id"
            :type="type"
            :show-dialog.sync="showDialog"
        />
    </el-row>
</template>
<script>
import { store, show, update } from "@/api/business/task";
import { index } from "@/api/company/user";
import SelectCustomer from "@/components/dialogs/SelectCustomer/index";
export default {
    props: ["isEdit", "isShow"],
    components: { SelectCustomer },
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
                if (this.isEdit && this.data.reminder_time) {
                    this.form.reminder_type = this.data.reminder_type;
                    this.form.reminder_time = this.data.reminder_time;
                } else {
                    this.form.reminder_type = "1";
                    this.form.reminder_time = curentDateTime;
                }
            } else {
                this.form.reminder_type = "";
                this.form.reminder_time = "";
            }
        }
    },
    data() {
        return {
            contact: "",
            showDialog: false,
            obj: "",
            dialogFormVisible: false,
            reminder: false,
            form: {
                id: "",
                user_id: "",
                title: "",
                taskable_type: "App\\Lead",
                taskable_id: "",
                start_date:
                    new Date().getFullYear() +
                    "-" +
                    (new Date().getMonth() + 1) +
                    "-" +
                    new Date().getDate(),
                expiration_date: "",
                priority: "",
                status: "",
                reminder_time: "",
                reminder_type: "",
                description: "",
                contact_id: ""
            },
            loading: "",
            rules: {
                user_id: [
                    {
                        required: true,
                        message: "Bạn chưa chọn chủ sở hữu",
                        trigger: "blur"
                    }
                ],
                title: [
                    {
                        required: true,
                        message: "Bạn chưa chọn tiêu đề",
                        trigger: "blur"
                    }
                ]
            },
            data: "",
            type: ""
        };
    },
    methods: {
        openDialog(type) {
            if (type == "obj") this.type = this.form.taskable_type;
            else this.type = "App\\Contact";
            this.showDialog = true;
            this.$refs["input"].blur();
            this.$refs["input1"].blur();
        },
        async createTask() {
            try {
                await this.$refs["form"].validate();
                this.loading = true;
                const { data } = await store(this.form);
                this.loading = false;
                this.$router.push(`/business/task/show/${data.id}`);
            } catch (error) {
                console.log(error);
                this.loading = false;
            }
        },
        async getTask() {
            try {
                this.loading = true;
                const { data } = await show(this.$route.params.id, {
                    edit: true
                });
                if (data.finish_date) this.$router.push("/404");
                this.data = data;
                this.contact = data.contact;
                this.obj = data.taskable;
                if (data.reminder_type) {
                    this.reminder = true;
                }
                for (let field in this.form) {
                    this.form[field] = data[field];
                }
                this.loading = false;
                console.log(data);
            } catch (error) {
                console.log(error);
                this.loading = false;
            }
        },
        async updateTask() {
            try {
                this.loading = true;
                await this.$refs["form"].validate();
                let data = await update(this.form, this.$route.params.id);
                this.loading = false;
                this.$router.push(
                    `/business/task/show/${this.$route.params.id}`
                );
            } catch (error) {
                console.log(error);
                this.loading = false;
            }
        },
        handleSelect(val) {
            if (this.type == "App\\Lead" || this.type == "App\\Customer") {
                this.obj = val.name;
                this.form.taskable_id = val.id;
                this.contact = "";
                this.form.contact_id = "";
            } else {
                this.contact = val.name;
                this.form.contact_id = val.id;
            }
        }
    },
    created() {
        this.getUsers();
        if (this.isEdit) this.getTask();
    }
};
</script>
