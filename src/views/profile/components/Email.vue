<template>
    <div>
        <el-row>
            <el-button
                @click="showDialog=true;form.email=''"
                class="fr"
                type="primary"
                size="small"
                icon="el-icon-plus"
                circle
            ></el-button>

            <el-button
                @click="getEmailAddresses"
                class="fr mr-10"
                type="primary"
                size="small"
                icon="el-icon-refresh"
                circle
            ></el-button>
        </el-row>
        <el-table v-loading="loading" :data="tableData">
            <el-table-column prop="email" label="Email"></el-table-column>
            <el-table-column label="Xác nhận">
                <template
                    slot-scope="scope"
                >{{ scope.row.verified==0?'Chưa xác nhận':(scope.row.verified==1?'Chờ xác nhận':'Đã xác nhận') }}</template>
            </el-table-column>
            <el-table-column align="center" label="Email chính">
                <template slot-scope="scope">
                    <i v-if="scope.row.primary" class="el-icon-check"></i>
                </template>
            </el-table-column>
            <el-table-column align="center" width="170" label="Hành động">
                <template slot-scope="scope">
                    <el-tooltip v-if="!scope.row.primary" content="Email chính" placement="top">
                        <el-button
                            size="small"
                            @click="setPrimary(scope.row.id)"
                            icon="el-icon-message"
                            type="primary"
                            circle
                        ></el-button>
                    </el-tooltip>
                    <el-tooltip
                        v-if="scope.row.verified!=2"
                        content="Gửi email xác nhận"
                        placement="top"
                    >
                        <el-button
                            @click="sendConfirmEmail(scope.row.id)"
                            size="small"
                            type="success"
                            icon="el-icon-position"
                            circle
                        ></el-button>
                    </el-tooltip>
                    <el-button
                        size="small"
                        @click="deleteEmailAddress(scope.row.id)"
                        type="danger"
                        icon="el-icon-delete"
                        circle
                    ></el-button>
                </template>
            </el-table-column>
        </el-table>
        <el-dialog width="30%" center title="Thêm địa chỉ email" :visible.sync="showDialog">
            <el-form
                label-position="left"
                labelWidth="120px"
                :model="form"
                :rules="rules"
                ref="form"
            >
                <el-form-item label="Địa chỉ email" prop="email">
                    <el-input v-model="form.email"></el-input>
                </el-form-item>
            </el-form>
            <span slot="footer" class="dialog-footer">
                <el-button @click="showDialog=false">Hủy</el-button>
                <el-button :loading="btnLoading" @click="createEmailAddress" type="primary">Tạo mới</el-button>
            </span>
        </el-dialog>
    </div>
</template>
<script>
import {
    getEmailAddresses,
    deleteEmailAddress,
    sendConfirmEmail,
    setPrimary,
    createEmailAddress
} from "@/api/company/user";
export default {
    data() {
        return {
            tableData: [],
            loading: false,
            btnLoading: false,
            showDialog: false,
            form: {
                email: ""
            },
            rules: {
                email: [
                    {
                        required: true,
                        message: "Hãy nhập địa chỉ email",
                        trigger: "blur"
                    },
                    {
                        type: "email",
                        message: "Địa chỉ email không chính xác",
                        trigger: "blur"
                    }
                ]
            }
        };
    },
    methods: {
        async getEmailAddresses() {
            try {
                this.loading = true;
                const { data } = await getEmailAddresses();
                this.tableData = data;
                this.loading = false;
            } catch (error) {
                this.loading = false;
            }
        },
        async deleteEmailAddress(id) {
            await this.$confirm("Bạn có chắc chắn muốn xóa?", "Cảnh báo", {
                confirmButtonText: "Xóa",
                cancelButtonText: "Hủy",
                type: "warning"
            });
            this.openFullScreen();
            await deleteEmailAddress(id);
            this.closeFullScreen();
            this.$message.success("Xóa dữ liệu thành công");
            this.getEmailAddresses();
        },
        async setPrimary(id) {
            await this.$confirm(
                "Bạn có muốn đặt địa chỉ email chính?",
                "Xác nhận",
                {
                    confirmButtonText: "Xóa",
                    cancelButtonText: "Hủy",
                    type: "warning"
                }
            );
            this.openFullScreen();
            await setPrimary(id);
            this.closeFullScreen();
            this.$message.success("Đặt email chính thành công");
            this.getEmailAddresses();
        },
        async sendConfirmEmail(id) {
            this.openFullScreen();
            await sendConfirmEmail(id);
            this.closeFullScreen();
            this.$message.success("Gửi email xác nhận thành công");
            this.getEmailAddresses();
        },
        async sendConfirmEmail(id) {
            this.openFullScreen();
            await sendConfirmEmail(id);
            this.closeFullScreen();
            this.$message.success("Gửi email xác nhận thành công");
            this.getEmailAddresses();
        },
        async createEmailAddress() {
            try {
                await this.$refs["form"].validate();
                this.btnLoading = true;
                await createEmailAddress(this.form);
                this.btnLoading = false;
                this.$message.success("Thêm địa chỉ email thành công");
                this.showDialog = false;
                this.getEmailAddresses();
            } catch (error) {
                this.btnLoading = false;
            }
        }
    },
    created() {
        this.getEmailAddresses();
    }
};
</script>
<style lang="scss">
</style>