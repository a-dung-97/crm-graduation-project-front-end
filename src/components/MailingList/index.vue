<template>
    <div>
        <el-dialog
            width="30%"
            center
            title="Thêm vào danh sách email"
            :before-close="closeDialog"
            :visible.sync="showDialog"
            top="5vh"
        >
            <el-table
                ref="multipleTable"
                :data="tableData"
                style="width: 100%"
                height="300"
                v-loading="loading"
                @selection-change="handleSelectionChange"
            >
                <el-table-column type="selection" width="55"></el-table-column>
                <el-table-column label="Tên" prop="name"></el-table-column>
                <el-table-column property="Mô tả" label="Mô tả" prop="description"></el-table-column>
            </el-table>
            <p
                class="warning-text"
            >Chú ý: Tiềm năng, khách hàng hoặc liên hệ không có email sẽ bị bỏ qua</p>
            <span slot="footer" class="dialog-footer">
                <el-button @click="closeDialog">Hủy</el-button>
                <el-button type="primary" @click="addMembers" :loading="btnLoading">Cập nhật</el-button>
            </span>
        </el-dialog>
        <el-dialog width="50%" center title="Cảnh báo lỗi" :visible.sync="showErrors" top="5vh">
            <el-table :data="errors" style="width: 100%" height="300">
                <el-table-column type="index" label="STT" align="center" width="50"></el-table-column>
                <el-table-column label="Tên" prop="name"></el-table-column>
                <el-table-column prop="email" label="Email"></el-table-column>
                <el-table-column prop="list" label="Danh sách"></el-table-column>
            </el-table>
            <p
                class="warning-text"
            >Email bị bỏ qua do đã tồn tại trong danh sách mail, các email hợp lệ vẫn được thêm</p>
            <span slot="footer" class="dialog-footer">
                <el-button @click="showErrors=false;errors=[]" type="primary">Xác nhận</el-button>
            </span>
        </el-dialog>
    </div>
</template>
<script>
import { index, addMembers } from "@/api/marketing/mailing-list";
export default {
    props: ["showDialog", "type", "members"],
    data() {
        return {
            loading: false,
            showErrors: false,
            btnLoading: false,
            tableData: [],
            errors: [],
            lists: []
        };
    },
    watch: {
        showDialog(val) {
            if (val) this.getMailingLists();
        },
        errors(val) {
            if (val.length > 0) this.showErrors = true;
        }
    },
    methods: {
        closeDialog() {
            this.lists = [];
            this.$emit("update:showDialog", false);
        },
        handleSelectionChange(val) {
            this.lists = [
                ...val.map(item => ({
                    id: item.id,
                    name: item.name
                }))
            ];
            console.log(this.lists);
        },
        async getMailingLists() {
            try {
                this.loading = true;
                const { data } = await index({ list: true });
                this.tableData = data;
                this.loading = false;
            } catch (error) {
                console.log(error);
                this.loading = false;
            }
        },
        async addMembers() {
            try {
                this.btnLoading = true;
                const { errors } = await addMembers({
                    type: this.type,
                    mailing_lists: this.lists,
                    members: this.members
                });
                this.closeDialog();
                if (errors.length > 0) {
                    this.errors = errors;
                } else
                    this.$message.success(
                        "Thêm vào danh sách email thành công"
                    );
                this.btnLoading = false;
            } catch (error) {
                this.btnLoading = false;
            }
        }
    }
};
</script>
<style lang="css">
.warning-text {
    color: red;
    font-size: 12px;
    text-align: center;
    margin-bottom: 0;
}
</style>