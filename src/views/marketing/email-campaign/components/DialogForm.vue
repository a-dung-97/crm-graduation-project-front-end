<template>
    <el-dialog
        width="65%"
        center
        top="0vh"
        title="Thêm chiến dịch email"
        :before-close="closeDialog"
        :visible.sync="showDialog"
    >
        <el-steps style="margin-bottom:10px" :active="active" simple finish-status="success">
            <el-step title="Thông tin chiến dịch"></el-step>
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
                    <el-input placeholder="Nhập tên chiến dịch" v-model="form.name"></el-input>
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
                <el-form-item label="Tới danh sách email" prop="mailing_list_id">
                    <el-select filterable class="w-100" v-model="form.mailing_list_id">
                        <el-option
                            :label="item.name"
                            v-for="item in lists"
                            :key="item.id"
                            :value="item.id"
                        ></el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="Điều kiện">
                    <el-select @change="handleChange" class="w-100" v-model="form.conditional">
                        <el-option label="Tất cả email trong list" :value="false"></el-option>
                        <el-option label="Theo chiến dịch email trước" :value="true"></el-option>
                    </el-select>
                </el-form-item>
                <el-form-item v-if="form.conditional" label="Chiến dịch" prop="email_campaign_id">
                    <el-select filterable class="w-100" v-model="form.email_campaign_id">
                        <el-option
                            :label="item.name"
                            v-for="item in campaigns.filter(item=>item.mailing_list_id==form.mailing_list_id)"
                            :key="item.id"
                            :value="item.id"
                        ></el-option>
                    </el-select>
                </el-form-item>
                <el-form-item v-if="form.conditional" prop="event" label="Sư kiện">
                    <el-select class="w-100" v-model="form.event">
                        <el-option label="Đã mở" value="Đã mở"></el-option>
                        <el-option label="Đã click" value="Đã click"></el-option>
                        <el-option label="Đã gửi" value="Đã gửi"></el-option>
                        <el-option label="Không mở" value="Không mở"></el-option>
                        <el-option label="Không click" value="Không click"></el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="Mô tả">
                    <el-input v-model="form.description" placeholder="Nhập thông tin mô tả"></el-input>
                </el-form-item>
            </el-form>
            <template v-else>
                <el-input
                    style="margin-bottom:10px"
                    placeholder="Nhập chủ đề"
                    v-model="form.subject"
                ></el-input>
                <el-link type="primary">Chọn mẫu email</el-link>
                <TinyMCE :content.sync="form.content" />
            </template>
        </div>

        <span slot="footer" class="dialog-footer">
            <el-button size="medium" v-if="active==0" @click="closeDialog">Hủy</el-button>
            <el-button size="medium" v-else @click="active=0">Quay lại</el-button>
            <el-button size="medium" v-if="active==0" @click="next" type="primary">Tiếp</el-button>
            <el-button size="medium" v-else type="primary">Lưu</el-button>
        </span>
    </el-dialog>
</template>
<script>
import { index as getMailingLists } from "@/api/marketing/mailing-list";
import { index as getCampaigns } from "@/api/marketing/email-campaign";
import { getEmailAddresses } from "@/api/company/user";
import { store } from "@/api/marketing/email-campaign";
import TinyMCE from "@/components/TinyMCE/index";
export default {
    props: ["showDialog"],
    components: { TinyMCE },
    watch: {
        showDialog() {
            for (let field in this.form) this.form[field] = "";
            this.form.conditional = false;
            this.form.from_name = this.$store.getters.name;
            if (this.emailAddresses.length > 0)
                this.form.from_email = this.emailAddresses[0].email;
        }
    },
    data() {
        return {
            lists: [],
            active: 0,
            loading: false,
            campaigns: [],
            emailAddresses: [],
            form: {
                name: "",
                mailing_list_id: "",
                subject: "",
                description: "",
                conditional: false,
                email_campaign_id: "",
                event: "",
                from_name: "",
                from_email: "",
                content: ""
            },
            rules: {
                name: [
                    {
                        required: true,
                        message: "Hãy nhập tên chiến dịch",
                        trigger: "blur"
                    }
                ],
                mailing_list_id: [
                    {
                        required: true,
                        message: "Hãy chọn danh sách email",
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
                email_campaign_id: [],
                event: []
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
            console.log(val);
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
        closeDialog() {
            this.$emit("update:showDialog", false);
            this.$refs["form"].resetFields();
            this.active = 0;
        },
        async getData() {
            try {
                const [lists, campaigns, emailAddresses] = await Promise.all([
                    getMailingLists({ list: true }),
                    getCampaigns({ list: true }),
                    getEmailAddresses({ list: true })
                ]);
                this.lists = lists.data;
                this.campaigns = campaigns.data;
                this.emailAddresses = emailAddresses.data;
            } catch (error) {
                console.log(error);
            }
        }
        // async updateData() {
        //     try {
        //         await this.$refs["form"].validate();
        //         this.loading = true;
        //         await update(this.form, this.form.id);
        //         this.reload();
        //     } catch (error) {
        //         this.loading = false;
        //     }
        // },
        // async createData() {
        //     try {
        //         await this.$refs["form"].validate();
        //         this.loading = true;
        //         await store(this.form);
        //         this.reload();
        //     } catch (error) {
        //         this.loading = false;
        //     }
        // },
        // reload() {
        //     this.loading = false;
        //     this.$message.success(
        //         this.editing ? "Cập nhật thành công" : "Thêm mới thành công"
        //     );
        //     this.closeDialog();
        //     this.$emit("reload");
        // }
    },
    created() {
        this.getData();
    }
};
</script>
<style lang="">
</style>