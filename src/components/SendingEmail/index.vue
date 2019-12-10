<template>
    <el-dialog
        width="65%"
        center
        top="0vh"
        title="Gửi email"
        :before-close="closeDialog"
        :visible.sync="showDialog"
    >
        <el-form label-position="top" :model="form" :rules="rules" ref="form">
            <el-row :gutter="10">
                <el-col :span="8">
                    <el-form-item label="Từ tên" prop="from_name">
                        <el-input placeholder="Nhập tên người gửi" v-model="form.from_name"></el-input>
                    </el-form-item>
                </el-col>
                <el-col :span="8">
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
                </el-col>
                <el-col :span="8">
                    <el-form-item label="Chủ đề" prop="subject">
                        <el-input
                            style="margin-bottom:10px"
                            placeholder="Nhập chủ đề"
                            v-model="form.subject"
                        ></el-input>
                    </el-form-item>
                </el-col>
            </el-row>
        </el-form>
        <el-link
            :underline="false"
            type="primary"
            v-if="quote==''"
            @click="showDialog1=true"
        >Chọn mẫu email</el-link>
        <TinyMCE :height="450" :content.sync="form.content" />
        <SelectEmailTemplate
            @handle-select="handleSelectEmailTemplate"
            :show-dialog.sync="showDialog1"
        />
        <span slot="footer" class="dialog-footer">
            <el-button size="medium" @click="closeDialog">Hủy</el-button>
            <el-button size="medium" :loading="loading" @click="createData" type="primary">Gửi</el-button>
        </span>
    </el-dialog>
</template>
<script>
import { store } from "@/api/marketing/email";
import { getEmailAddresses } from "@/api/company/user";
import SelectEmailTemplate from "@/components/dialogs/SelectEmailTemplate/index.vue";
import TinyMCE from "@/components/TinyMCE/index";
import checkEditor from "@/mixins/editor";

export default {
    props: ["showDialog", "type", "quote"],
    mixins: [checkEditor],
    components: { TinyMCE, SelectEmailTemplate },
    watch: {
        showDialog() {
            if (!this.quote) for (let field in this.form) this.form[field] = "";
            this.form.from_name = this.$store.getters.name;
            if (this.emailAddresses.length > 0)
                this.form.from_email = this.emailAddresses[0].email;
        }
    },
    data() {
        return {
            showDialog1: false,
            loading: false,
            emailAddresses: [],
            form: {
                subject: "",
                from_name: "",
                from_email: "",
                content: ""
            },
            rules: {
                subject: [
                    {
                        required: true,
                        message: "Hãy nhập chủ đề",
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
                ]
            }
        };
    },
    methods: {
        handleSelectEmailTemplate(val) {
            this.form.content = val.content;
            this.form.subject = val.name;
        },
        closeDialog() {
            this.$emit("update:showDialog", false);
            this.$refs["form"].resetFields();
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
                await this.$refs["form"].validate();
                if (!this.checkEditor(this.form.content)) return;
                this.loading = true;
                await store({
                    ...this.form,
                    type: this.type,
                    id: this.quote
                        ? this.quote.customer_id
                        : this.$route.params.id
                });
                this.$message.success("Gửi email thành công");
                this.$emit("reload");
                this.closeDialog();
                this.loading = false;
            } catch (error) {
                this.loading = false;
            }
        }
    },
    created() {
        if (this.quote) this.form.content = this.quote.content;
        this.getData();
    }
};
</script>
<style lang="">
</style>