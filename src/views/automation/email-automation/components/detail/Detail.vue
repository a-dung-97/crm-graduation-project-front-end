<template>
    <el-row>
        <h3 class="title">
            Email tự động
            <el-button
                class="fr"
                @click="showDialogForm('create')"
                size="small"
                type="primary"
            >Thêm email</el-button>
        </h3>
        <el-table height="400px" :data="tableData" v-loading="loading" style="width: 100%">
            <el-table-column prop="order" width="50" align="center" label="STT"></el-table-column>
            <el-table-column prop="name" label="Tên"></el-table-column>
            <el-table-column prop="type" label="Sự kiện">
                <template
                    slot-scope="scope"
                >{{ scope.row.order>1?`${scope.row.after} ${scope.row.time_mode_name} sau khi ${scope.row.event.toLowerCase()} email trước`:'Thêm email vào nhóm' }}</template>
            </el-table-column>
            <el-table-column prop="delivered_count" align="center" width="100" label="Đã gửi"></el-table-column>
            <el-table-column prop="opened_count" align="center" width="100" label="Mở"></el-table-column>
            <el-table-column prop="clicked_count" align="center" width="100" label="Click"></el-table-column>
            <el-table-column align="center" width="150" label="Hành động">
                <template slot-scope="scope">
                    <el-button
                        size="medium"
                        icon="el-icon-edit"
                        circle
                        type="primary"
                        @click="showDialogForm('edit',scope.row)"
                    ></el-button>
                    <el-button
                        v-if="scope.row.order==count"
                        @click="handleDelete(scope.row.id)"
                        size="medium"
                        type="danger"
                        icon="el-icon-delete"
                        circle
                    ></el-button>
                </template>
            </el-table-column>
        </el-table>
        <Pagination
            :pagination="pagination"
            @size-change="params.perPage=$event;params.page=1;getData()"
            @current-change="params.page=$event;getData()"
        />
        <DialogForm
            @reload="getData"
            :show-dialog.sync="showDialog"
            :data="data"
            :editing="editing"
            :count="count"
        />
    </el-row>
</template>
<script>
import { getEmails } from "@/api/automation/email-automation";
import { destroy } from "@/api/marketing/email-campaign";
import Pagination from "@/components/Pagination/index";
import DialogForm from "./DialogForm";
export default {
    props: ["success"],
    components: { Pagination, DialogForm },

    data() {
        return {
            tableData: [],
            loading: false,
            editing: false,
            data: "",
            showDialog: false,
            pagination: {}
        };
    },
    computed: {
        count() {
            return this.tableData.length;
        }
    },
    methods: {
        showDialogForm(mode, data) {
            this.showDialog = true;
            if (mode == "create") this.editing = false;
            else {
                this.editing = true;
                this.data = data;
            }
        },
        async getData() {
            try {
                this.loading = true;
                const { data } = await getEmails(this.$route.params.id);
                this.tableData = data;
                this.loading = false;
            } catch (error) {
                this.loading = false;
            }
        },
        async handleDelete(id) {
            console.log(id);
            await this.$confirm("Bạn có chắc chắn muốn xóa?", "Cảnh báo", {
                confirmButtonText: "Xóa",
                cancelButtonText: "Hủy",
                type: "warning"
            });
            this.openFullScreen();
            await destroy(id);
            this.closeFullScreen();
            this.$message.success("Xóa dữ liệu thành công");
            this.getData();
        }
    },
    created() {
        this.getData();
    }
};
</script>
<style lang="scss" scoped>
.title {
    margin-bottom: 10px;
    height: 32px;
}
</style>