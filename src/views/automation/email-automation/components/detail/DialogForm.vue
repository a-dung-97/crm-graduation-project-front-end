<template>
    <el-dialog
        width="60%"
        center
        top="0vh"
        title="Thêm email"
        :before-close="closeDialog"
        custom-class="abcd"
        :append-to-body="true"
        :visible.sync="showDialog"
    >
        <el-steps style="margin-bottom:10px" :active="active" simple finish-status="success">
            <el-step title="Thông tin email"></el-step>
            <el-step title="Email gửi"></el-step>
        </el-steps>
        <div style="height:500px;padding-bottom:20px">
            <el-form
                v-if="!active"
                label-position="left"
                label-width="250px"
                :model="form"
                :rules="rules"
                ref="form"
            >
                <el-form-item label="Tên" prop="name">
                    <el-input placeholder="Nhập tên" v-model="form.name"></el-input>
                </el-form-item>
                <el-form-item label="Từ tên" prop="from_name">
                    <el-input placeholder="Nhập tên người gửi" v-model="form.from_name"></el-input>
                </el-form-item>
                <el-form-item label="Từ email" prop="from_email">
                    <el-select filterable class="w-100" v-model="form.from_email">
                        <el-option
                            :label="item.email"
                            v-for="item in emailAddresses"
                            :key="item.id"
                            :value="item.email"
                        ></el-option>
                    </el-select>
                </el-form-item>
                <el-form-item prop="event" label="Sư kiện">
                    <el-select class="w-100" v-model="form.event">
                        <el-option
                            v-if="count==0||(count==1&&editing)"
                            label="Thêm email vào nhóm"
                            value="Đã nhận"
                        ></el-option>
                        <template v-else>
                            <el-option label="Đã mở email trước" value="Đã mở"></el-option>
                            <el-option label="Đã click email trước" value="Đã click"></el-option>
                            <el-option label="Đã nhận email trước" value="Đã nhận"></el-option>
                        </template>
                    </el-select>
                </el-form-item>
                <el-form-item prop="after" label="Sau">
                    <el-input type="number" :min="0" v-model="form.after">
                        <el-select style="width:100px" slot="append" v-model="form.time_mode">
                            <el-option label="Giờ" value="h"></el-option>
                            <el-option label="Ngày" value="d"></el-option>
                            <el-option label="Tuần" value="w"></el-option>
                            <el-option label="Tháng" value="m"></el-option>
                        </el-select>
                    </el-input>
                </el-form-item>
            </el-form>
            <template v-else>
                <el-input
                    style="margin-bottom:10px"
                    placeholder="Nhập chủ đề"
                    v-model="form.subject"
                ></el-input>
                <el-link :underline="false" type="primary" @click="showDialog1=true">Chọn mẫu email</el-link>
                <TinyMCE :height="450" :content.sync="form.content" />
            </template>
        </div>
        <SelectEmailTemplate
            @handle-select="handleSelectEmailTemplate"
            :show-dialog.sync="showDialog1"
        />
        <span slot="footer" class="dialog-footer">
            <el-button size="medium" v-if="active==0" @click="closeDialog">Hủy</el-button>
            <el-button size="medium" v-else @click="active=0">Quay lại</el-button>
            <el-button size="medium" v-if="active==0" @click="next" type="primary">Tiếp</el-button>
            <el-button
                size="medium"
                :loading="loading"
                @click="createData"
                v-else
                type="primary"
            >Lưu</el-button>
        </span>
    </el-dialog>
</template>
<script>
import { index as getMailingLists } from "@/api/marketing/mailing-list";
import { getEmailAddresses } from "@/api/company/user";
import { addEmail, updateEmail } from "@/api/automation/email-automation";
import SelectEmailTemplate from "@/components/dialogs/SelectEmailTemplate/index.vue";
import TinyMCE from "@/components/TinyMCE/index";
import checkEditor from "@/mixins/editor";

export default {
    props: ["showDialog", "editing", "data", "count"],
    mixins: [checkEditor],
    components: { TinyMCE, SelectEmailTemplate },
    watch: {
        showDialog() {
            if (!this.editing) {
                for (let field in this.form) this.form[field] = "";
                this.form.after = 0;
                this.form.time_mode = "h";
                this.form.from_name = this.$store.getters.name;
                if (this.emailAddresses.length > 0)
                    this.form.from_email = this.emailAddresses[0].email;
            } else {
                for (let field in this.form)
                    this.form[field] = this.data[field];
            }
        }
    },
    data() {
        return {
            showDialog1: false,
            lists: [],
            active: 0,
            loading: false,
            campaigns: [],
            emailAddresses: [],
            form: {
                name: "",
                subject: "",
                description: "",
                event: "",
                from_name: "",
                from_email: "",
                content: "",
                after: 0,
                time_mode: "h"
            },
            rules: {
                name: [
                    {
                        required: true,
                        message: "Hãy nhập tên chiến dịch",
                        trigger: "blur"
                    }
                ],
                from_name: [
                    {
                        required: true,
                        message: "Hãy nhập tên để gửi",
                        trigger: "blur"
                    }
                ],
                from_email: [
                    {
                        required: true,
                        message: "Hãy chọn email gửi",
                        trigger: "blur"
                    }
                ],
                event: [
                    {
                        required: true,
                        message: "Hãy chọn sự kiện gửi",
                        trigger: "blur"
                    }
                ],
                after: [
                    {
                        required: true,
                        message: "Hãy chọn thời gian gửi",
                        trigger: "blur"
                    }
                ]
            }
        };
    },
    methods: {
        async next() {
            try {
                await this.$refs["form"].validate();
                this.active = 1;
            } catch (error) {}
        },
        handleChange(val) {
            if (!val) {
                this.rules.email_campaign_id = [];
                this.rules.event = [];
            } else {
                this.rules.email_campaign_id = [
                    {
                        required: true,
                        message: "Hãy chọn chiến dịch",
                        trigger: "blur"
                    }
                ];
                this.rules.event = [
                    {
                        required: true,
                        message: "Hãy chọn sự kiện",
                        trigger: "blur"
                    }
                ];
            }
        },
        handleSelectEmailTemplate(val) {
            this.form.content = val.content;
            this.form.subject = val.name;
        },
        closeDialog() {
            this.$emit("update:showDialog", false);
            this.active = 0;
        },
        async getData() {
            try {
                const [emailAddresses] = await Promise.all([
                    getEmailAddresses({ list: true })
                ]);
                this.emailAddresses = emailAddresses.data;
            } catch (error) {
                console.log(error);
            }
        },
        async createData() {
            try {
                if (this.form.subject == "") {
                    this.$message.error("Bạn chưa nhập tiêu đề");
                    return;
                }
                if (!this.checkEditor(this.form.content)) return;
                this.loading = true;
                if (this.editing) await updateEmail(this.form, this.data.id);
                else await addEmail(this.form, this.$route.params.id);
                this.$message.success("Lưu chiến dịch email thành công");
                this.$emit("reload");
                this.closeDialog();
                this.loading = false;
            } catch (error) {
                this.loading = false;
            }
        }
    },
    created() {
        this.getData();
    }
};
</script>
<style lang="">
</style>