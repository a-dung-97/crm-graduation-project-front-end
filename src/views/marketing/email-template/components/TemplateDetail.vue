<template>
    <el-card>
        <div style="height:32px;line-height:32px" slot="header">
            Thông tin mẫu email
            <el-button class="fr" @click="createTemplate" type="primary" size="small">Thêm</el-button>
        </div>
        <el-row :gutter="20">
            <el-col :span="18">
                <TinyMCE :initialValue="initialValue" :content.sync="form.content" />
            </el-col>
            <el-col :span="6">
                <el-form :model="form" :rules="rules" ref="form">
                    <el-form-item prop="name">
                        <el-input v-model="form.name" placeholder="Nhập tên mẫu email"></el-input>
                    </el-form-item>
                    <el-form-item>
                        <el-input
                            type="textarea"
                            v-model="form.description"
                            placeholder="Nhập mô tả"
                        ></el-input>
                    </el-form-item>
                </el-form>
                <el-select class="w-100" v-model="mode" placeholder="Chọn trường trộn" clearable>
                    <el-option label="Tiềm năng" value="lead"></el-option>
                    <el-option label="Khách hàng" value="customer"></el-option>
                    <el-option label="Liên hệ" value="contact"></el-option>
                </el-select>
                <el-card class="field-card" v-if="mode" style="margin-top:25px">
                    <div slot="header">Danh sách trường trộn</div>
                    <div class="field-container">
                        <div v-for="item in fields[mode]" :key="item.value" class="field">
                            <i class="el-icon-plus" @click="addField(item.value)"></i>
                            <span>{{ item.label }}</span>
                        </div>
                    </div>
                </el-card>
            </el-col>
        </el-row>
    </el-card>
</template>
<script>
import TinyMCE from "@/components/TinyMCE/index.vue";
import { store, show } from "@/api/marketing/email-template";
export default {
    components: { TinyMCE },
    props: ["isEdit"],
    data() {
        return {
            mode: "",
            initialValue: "",
            form: {
                id: "",
                name: "",
                content: "",
                description: ""
            },
            fields: {
                lead: [
                    {
                        label: "Xưng hô",
                        value: "lead_honorific"
                    },
                    {
                        label: "Họ tên đệm",
                        value: "lead_first_name"
                    },
                    {
                        label: "Tên",
                        value: "lead_last_name"
                    },
                    {
                        label: "Email",
                        value: "lead_email"
                    },
                    {
                        label: "Điện thoại",
                        value: "lead_phone_number"
                    },
                    {
                        label: "Di động",
                        value: "lead_mobile_number"
                    },
                    {
                        label: "Fax",
                        value: "lead_fax"
                    },
                    {
                        label: "Địa chỉ văn phòng",
                        value: "lead_office_address"
                    },
                    {
                        label: "Mã số thuế",
                        value: "lead_tax_code"
                    },
                    {
                        label: "Mô tả",
                        value: "lead_description"
                    },

                    {
                        label: "Công ty",
                        value: "lead_company"
                    },
                    {
                        label: "Website",
                        value: "lead_website"
                    },
                    {
                        label: "Facebook",
                        value: "lead_facebook"
                    },
                    {
                        label: "Ngày sinh",
                        value: "lead_birthday"
                    },
                    {
                        label: "Doanh thu",
                        value: "lead_revenue"
                    },
                    {
                        label: "Số nhân viên",
                        value: "lead_number_of_workers"
                    }
                ],
                customer: [
                    {
                        label: "Mã",
                        value: "customer_code"
                    },
                    {
                        label: "Tên",
                        value: "customer_name"
                    },
                    {
                        label: "Email",
                        value: "customer_email"
                    },
                    {
                        label: "Điện thoại",
                        value: "customer_phone_number"
                    },
                    {
                        label: "Di động",
                        value: "customer_mobile_number"
                    },
                    {
                        label: "Fax",
                        value: "customer_fax"
                    },
                    {
                        label: "Địa chỉ văn phòng",
                        value: "customer_office_address"
                    },
                    {
                        label: "Địa chỉ hóa",
                        value: "customer_invoice_address"
                    },
                    {
                        label: "Địa chỉ giao hàng",
                        value: "customer_delivery_address"
                    },
                    {
                        label: "Mã số thuế",
                        value: "customer_tax_code"
                    },
                    {
                        label: "Mô tả",
                        value: "customer_description"
                    },

                    {
                        label: "Website",
                        value: "customer_website"
                    },
                    {
                        label: "Ngày sinh",
                        value: "customer_birthday"
                    },
                    {
                        label: "Doanh thu",
                        value: "customer_revenue"
                    },
                    {
                        label: "Số nhân viên",
                        value: "customer_number_of_workers"
                    }
                ],
                contact: [
                    {
                        label: "Xưng hô",
                        value: "contact_honorific"
                    },
                    {
                        label: "Họ tên đệm",
                        value: "contact_first_name"
                    },
                    {
                        label: "Tên",
                        value: "contact_last_name"
                    },
                    {
                        label: "Email",
                        value: "contact_email"
                    },
                    {
                        label: "Điện thoại",
                        value: "contact_phone_number"
                    },
                    {
                        label: "Di động",
                        value: "contact_mobile_number"
                    },
                    {
                        label: "Fax",
                        value: "contact_fax"
                    },

                    {
                        label: "Mô tả",
                        value: "contact_description"
                    },

                    {
                        label: "Facebook",
                        value: "contact_facebook"
                    },
                    {
                        label: "Ngày sinh",
                        value: "contact_birthday"
                    }
                ]
            },
            rules: {
                name: [
                    {
                        required: true,
                        message: "Hãy nhập tên mẫu",
                        trigger: "blur"
                    }
                ]
            }
        };
    },
    methods: {
        addField(value) {
            window.tinyMCE.execCommand(
                "mceInsertContent",
                false,
                `%recipient.${value}%`
            );
        },
        async createTemplate() {
            try {
                await this.$refs["form"].validate();
                this.openFullScreen();
                const { data } = await store(this.form);
                this.loading = false;
                this.closeFullScreen();
                this.$router.push(`/marketing/email-template/index`);
            } catch (error) {
                console.log(error);
                this.closeFullScreen();
            }
        },
        async getTemplate() {
            this.openFullScreen();
            const { data } = await show(this.$route.params.id);
            for (let field in this.form) this.form[field] = data[field];
            this.initialValue = data.content;
            this.closeFullScreen();
        }
    },
    created() {
        if (this.isEdit) this.getTemplate();
    }
};
</script>
<style lang="scss">
.field-container {
    width: 100%;
    height: 250px;
    overflow-y: scroll;
    .field {
        margin-bottom: 5px;
        font-size: 14px;
        i {
            margin-right: 5px;
            &:hover {
                color: #3498db;
                cursor: pointer;
            }
        }
    }
}
.field-card {
    ::-webkit-scrollbar-track {
        box-shadow: inset 0 0 6px rgba(0, 0, 0, 0.3);
        background-color: #ecf0f1 !important;
    }

    ::-webkit-scrollbar {
        width: 4px;
        background-color: #f5f5f5 !important;
    }
}
</style>