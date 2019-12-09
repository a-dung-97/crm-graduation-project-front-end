<template>
    <el-form :model="form" :rules="rules" ref="form" label-position="left" label-width="150px">
        <div class="app-container">
            <el-row class="mb-20" :gutter="50">
                <el-col :span="8">
                    <el-input
                        :disabled="active==3"
                        v-model="form.name"
                        placeholder="Nhập tên webform"
                    ></el-input>
                </el-col>
                <el-col :span="8">
                    <el-input
                        :disabled="active==3"
                        v-model="form.campaign"
                        placeholder="Nhập tên chiến dịch"
                    ></el-input>
                </el-col>
                <el-col :span="8">
                    <div class="fr">
                        <el-button v-if="active==2" @click="active=1">Quay lại</el-button>
                        <el-button v-if="active==1" @click="active=2" type="primary">Tiếp theo</el-button>
                        <el-button
                            v-if="active==2&&!isEdit"
                            @click="createWebform"
                            type="primary"
                        >Lưu</el-button>
                        <el-button
                            v-if="active==2&&isEdit"
                            @click="updateWebform"
                            type="primary"
                        >Cập nhật</el-button>
                        <el-button
                            v-if="active==3"
                            @click="$router.push('/marketing/webform/index')"
                            type="primary"
                        >Trở về</el-button>
                    </div>
                </el-col>
            </el-row>
            <el-steps class="mb-20" :active="active" align-center>
                <el-step title="Bạn cần lấy thông tin gì?"></el-step>
                <el-step title="Thiết lập"></el-step>
                <el-step title="Mã nhúng"></el-step>
            </el-steps>
            <el-row v-if="active==1" :gutter="40">
                <el-col :xs="24" :span="12">
                    <el-table :data="tableData">
                        <el-table-column label="STT" type="index" width="50" align="center"></el-table-column>
                        <el-table-column prop="name" label="Tên trường"></el-table-column>
                        <el-table-column align="center" label="Tên trường">
                            <template slot-scope="scope">
                                <el-switch
                                    active-color="#13ce66"
                                    v-model="form.field[scope.row.field]"
                                ></el-switch>
                            </template>
                        </el-table-column>
                    </el-table>
                </el-col>
                <el-col :xs="24" :span="12">
                    <Webform :field="form.field" :demo="true" :name="form.name" />
                </el-col>
            </el-row>
            <el-card v-if="active==2">
                <el-row :gutter="30">
                    <el-col :span="12">
                        <el-form-item label="Chủ sở hữu" prop="ownerable_id">
                            <el-row>
                                <el-col :span="6">
                                    <el-select
                                        v-model="form.ownerable_type"
                                        @change="form.ownerable_id=''"
                                    >
                                        <el-option value="App\User" label="Nhân viên"></el-option>
                                        <el-option value="App\Group" label="Nhóm"></el-option>
                                    </el-select>
                                </el-col>
                                <el-col :span="18">
                                    <el-select
                                        class="w-100"
                                        v-model="form.ownerable_id"
                                        :disabled="!form.ownerable_type"
                                        filterable
                                        placeholder="Chọn chủ sở hữu"
                                    >
                                        <template v-if="form.ownerable_type=='App\\User'">
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
                                        </template>
                                        <template v-else>
                                            <el-option
                                                style="max-height:100%"
                                                v-for="item in groupOptions"
                                                :key="item.id"
                                                :disabled="item.count==0"
                                                :label="item.name"
                                                :value="item.id"
                                            >
                                                <span style="float: left">{{ item.name }}</span>
                                                <span
                                                    style="float: right; color: #8492a6; font-size: 13px"
                                                >{{ item.count+' nhân viên' }}</span>
                                            </el-option>
                                        </template>
                                    </el-select>
                                </el-col>
                            </el-row>
                        </el-form-item>
                        <el-form-item label="Tên miền" prop="url">
                            <el-input v-model="form.url" placeholder="Nhập tên miền của bạn">
                                <el-select style="width:100px" v-model="protocol" slot="prepend">
                                    <el-option label="https://" value="https:"></el-option>
                                    <el-option label="http://" value="http:"></el-option>
                                </el-select>
                            </el-input>
                        </el-form-item>
                        <el-form-item label="URL điều hướng" prop="redirect_url">
                            <el-input v-model="form.redirect_url" placeholder="Nhập URL điều hướng"></el-input>
                        </el-form-item>
                    </el-col>
                    <el-col :span="12">
                        <el-form-item label="Ngôn ngữ" prop="language">
                            <el-select v-model="form.language" class="w-100">
                                <el-option label="Tiếng Việt" :value="1"></el-option>
                                <el-option label="English" disabled :value="0"></el-option>
                            </el-select>
                        </el-form-item>
                        <el-form-item label="Chiều rộng" prop="width">
                            <el-input-number class="w-100" v-model="form.width" :min="0"></el-input-number>
                        </el-form-item>
                        <el-form-item label="Chiều cao" prop="height">
                            <el-input-number class="w-100" v-model="form.height" :min="0"></el-input-number>
                        </el-form-item>
                    </el-col>
                </el-row>
            </el-card>
            <el-card v-if="active==3">
                <el-row :gutter="30">
                    <el-col :span="20">
                        <el-input type="textarea" v-model="code" disabled></el-input>
                    </el-col>
                    <el-col :span="4">
                        <el-button size="medium" type="primary" @click="copy(code,$event)">
                            <i class="el-icon-document-copy"></i> Copy
                        </el-button>
                    </el-col>
                </el-row>
            </el-card>
        </div>
    </el-form>
</template>
<script>
import copy from "@/utils/clipboard";
import { store, show, update } from "@/api/marketing/webform";
import Webform from "@/components/Webform/index";
import { validateDomain } from "@/utils/validate";
export default {
    components: { Webform },
    props: ["isEdit"],
    data() {
        return {
            active: 1,
            code: "",
            tableData: [
                {
                    name: "Số điện thoại",
                    field: "phone_number"
                },
                {
                    name: "Số di động",
                    field: "mobile_number"
                },
                {
                    name: "Email",
                    field: "email"
                },
                {
                    name: "Công ty",
                    field: "company"
                },
                {
                    name: "Địa chỉ",
                    field: "office_address"
                }
            ],
            protocol: "https:",
            form: {
                id: "",
                name: "",
                field: {
                    phone_number: true,
                    mobile_number: true,
                    email: true,
                    company: true,
                    office_address: true
                },
                url: "",
                language: 1,
                campaign: "",
                redirect_url: "",
                width: "",
                height: "",
                ownerable_type: "",
                ownerable_id: ""
            },
            rules: {
                ownerable_id: [
                    {
                        required: true,
                        message: "Hãy nhập tên chủ sở hữu tiềm năng",
                        trigger: "blur"
                    }
                ],
                url: [
                    {
                        validator: validateDomain,
                        trigger: "blur"
                    }
                ],
                redirect_url: [
                    {
                        type: "url",
                        message: "URL không đúng định dạng",
                        trigger: "blur"
                    }
                ],
                language: [
                    {
                        required: true,
                        message: "Hãy chọn ngôn ngữ",
                        trigger: "blur"
                    }
                ],
                width: [
                    {
                        required: true,
                        message: "Hãy nhập độ rộng",
                        trigger: "blur"
                    }
                ],
                height: [
                    {
                        required: true,
                        message: "Hãy nhập chiều cao",
                        trigger: "blur"
                    }
                ]
            }
        };
    },
    methods: {
        copy(text, event) {
            copy(text, event);
        },
        async createWebform() {
            try {
                if (this.form.name == "") {
                    this.$message.error("Bạn chưa nhập tên webform");
                    return;
                }
                await this.$refs["form"].validate();
                this.form.url = this.protocol + "//" + this.form.url;
                this.openFullScreen();
                const { data } = await store(this.form);
                this.active = 3;
                this.code = `<iframe src="${process.env.VUE_APP_BASE}#/webform/generated/webform/${data.id}" width="${this.form.width}" height="${this.form.height}" frameborder="0"></iframe>`;
                this.closeFullScreen();
                this.$message.success("Thêm webform thành công");
            } catch (error) {
                console.log(error);
                this.closeFullScreen();
            }
        },
        async updateWebform() {
            try {
                if (this.form.name == "") {
                    this.$message.error("Bạn chưa nhập tên webform");
                    return;
                }
                await this.$refs["form"].validate();
                this.form.url = this.protocol + "//" + this.form.url;
                this.openFullScreen();
                await update(this.form, this.$route.params.id);
                this.active = 3;
                this.code = `<iframe src="${process.env.VUE_APP_BASE}#/webform/generated/${this.$route.params.id}" width="${this.form.width}" height="${this.form.height}" frameborder="0"></iframe>`;
                this.closeFullScreen();
                this.$message.success("Sửa dữ liệu thành công");
            } catch (error) {
                console.log(error);
                this.closeFullScreen();
            }
        },
        async getWebform() {
            this.openFullScreen();
            const { data } = await show(this.$route.params.id);
            for (let field in this.form)
                if (field != "url") this.form[field] = data[field];
            let url = new URL(data.url);
            this.protocol = url.protocol;
            this.form.url = url.hostname;
            this.closeFullScreen();
        }
    },
    created() {
        Promise.all([this.getUsers(), this.getGroups()]);
        if (this.isEdit) this.getWebform();
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