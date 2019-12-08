<template>
    <div>
        <el-table height="65vh" :data="tableData" border v-loading="loading" style="width: 100%">
            <el-table-column width="280" prop="subject" label="Tiêu đề"></el-table-column>
            <el-table-column label="Chiến dịch">
                <template slot-scope="scope">
                    <router-link
                        v-if="scope.row.campaign"
                        tag="a"
                        class="link"
                        :to="`/accounting/invoice/show/${scope.row.campaign.id}`"
                    >{{ scope.row.campaign.name }}</router-link>
                </template>
            </el-table-column>
            <el-table-column prop="from_email" width="230" label="Email gửi"></el-table-column>
            <el-table-column prop="created_at" width="150" label="Ngày gửi">
                <template slot-scope="scope">{{ scope.row.created_at|datetime }}</template>
            </el-table-column>

            <el-table-column prop="status" width="120" label="Trạng thái"></el-table-column>
            <el-table-column prop="opened" width="80" align="center" label="Mở">
                <template slot-scope="scope">
                    <i style="color:#2ecc71" class="el-icon-check" v-if="scope.row.opened"></i>
                    <i style="color:#e74c3c" class="el-icon-close" v-else></i>
                </template>
            </el-table-column>
            <el-table-column prop="clicked" width="80" align="center" label="Click">
                <template slot-scope="scope">
                    <i style="color:#2ecc71" class="el-icon-check" v-if="scope.row.clicked"></i>
                    <i style="color:#e74c3c" class="el-icon-close" v-else></i>
                </template>
            </el-table-column>
            <el-table-column align="center" width="80" label="Xem">
                <template slot-scope="scope">
                    <el-button
                        @click="openPreview(scope.row)"
                        size="small"
                        type="success"
                        circle
                        icon="el-icon-view"
                    ></el-button>
                </template>
            </el-table-column>
        </el-table>
        <el-dialog :title="email.subject" :visible.sync="showDialog" top="5vh" width="80%">
            <p>Từ: {{ email.from_name }} &#60;{{ email.from_email }}&#62;</p>
            <p>Tới: {{ recipient.name }} &#60;{{ recipient.email }}&#62;</p>
            <div v-html="email.content"></div>
        </el-dialog>
    </div>
</template>
<script>
import { destroy, download } from "@/api/general/file";
import axios from "axios";
export default {
    props: ["tableData", "loading", "recipient"],
    data() {
        return {
            showDialog: false,
            email: ""
        };
    },
    methods: {
        openPreview(email) {
            this.email = email;
            this.showDialog = true;
        },
        async handleDelete(id) {
            await this.$confirm("Bạn có chắc chắn muốn xóa?", "Cảnh báo", {
                confirmButtonText: "Xóa",
                cancelButtonText: "Hủy",
                type: "warning"
            });
            this.openFullScreen();
            await destroy(id);
            this.closeFullScreen();
            this.$message.success("Xóa dữ liệu thành công");
            this.$emit("handle-delete");
        },
        async download(name) {
            this.openFullScreen();
            let res = await download({ name });
            this.closeFullScreen();

            var fileURL = window.URL.createObjectURL(new Blob([res]));
            var fileLink = document.createElement("a");
            fileLink.href = fileURL;
            fileLink.setAttribute("download", name);
            document.body.appendChild(fileLink);
            fileLink.click();
            this.$message.success("Tải file thành công");
        }
    }
};
</script>
<style lang="">
</style>