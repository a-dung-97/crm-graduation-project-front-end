<template>
    <el-dialog
        :before-close="closeDialog"
        title="Danh sách email"
        :visible.sync="showDialog"
        width="50%"
        top="5vh"
        center
    >
        <el-row class="mb-20" :gutter="20">
            <el-col :span="7">
                <el-input size="small" v-model="search.name" placeholder="Tìm kiếm theo tên"></el-input>
            </el-col>
            <el-col :span="7">
                <el-input size="small" v-model="search.email" placeholder="Tìm kiếm theo email"></el-input>
            </el-col>
            <el-col :span="7">
                <el-select
                    size="small"
                    clearable
                    v-model="search.type"
                    placeholder="Tìm kiếm theo loại"
                >
                    <el-option label="Liên hệ" value="App\Contact"></el-option>
                    <el-option label="Khách hàng" value="App\Customer"></el-option>
                    <el-option label="Tiềm năng" value="App\Lead"></el-option>
                </el-select>
            </el-col>
            <el-col :span="3">
                <el-button type="primary" @click="filter" circle icon="el-icon-search" size="small"></el-button>
            </el-col>
        </el-row>

        <el-table
            :data="filteredData"
            v-loading="loading"
            height="400"
            ref="multipleTable"
            style="width: 100%"
            @selection-change="handleSelectionChange"
        >
            <el-table-column type="selection" width="55"></el-table-column>
            <el-table-column prop="name" label="Tên"></el-table-column>
            <el-table-column prop="email" label="Email"></el-table-column>
            <el-table-column prop="type" label="Loại">
                <template
                    slot-scope="scope"
                >{{ scope.row.type=='App\\Contact'?'Liên hệ':(scope.row.type=='App\\Customer'?'Khách hàng':'Tiềm năng') }}</template>
            </el-table-column>
        </el-table>
        <span slot="footer" class="dialog-footer">
            <el-button size="medium" @click="closeDialog">Hủy</el-button>
            <el-button size="medium" :loading="btnLoading" type="primary" @click="deleteMembers">Xóa</el-button>
        </span>
    </el-dialog>
</template>
<script>
import { show, deleteMembers } from "@/api/marketing/mailing-list";
export default {
    props: ["showDialog", "id"],
    data() {
        return {
            loading: false,
            btnLoading: false,
            search: {
                name: "",
                email: "",
                type: ""
            },
            tableData: [],
            filteredData: [],
            data: ""
            // tmp: [...this.users]
        };
    },
    watch: {
        showDialog(val) {
            if (val) {
                this.getMailingList();
            }
        }
    },
    methods: {
        closeDialog() {
            this.$emit("update:showDialog", false);
        },
        async getMailingList() {
            try {
                this.loading = true;
                const { data } = await show(this.id);
                this.tableData = data;
                this.filteredData = data;
                this.loading = false;
            } catch (error) {
                this.loading = false;
            }
        },
        handleSelectionChange(val) {
            this.data = val;
        },
        filter() {
            if (!this.search.name && !this.search.email && !this.search.type)
                this.filteredData = this.tableData;
            if (this.search.name)
                this.filteredData = this.tableData.filter(data =>
                    data.name
                        .toLowerCase()
                        .includes(this.search.name.toLowerCase())
                );
            if (this.search.email)
                this.filteredData = this.tableData.filter(data =>
                    data.email
                        .toLowerCase()
                        .includes(this.search.email.toLowerCase())
                );
            if (this.search.type)
                this.filteredData = this.tableData.filter(
                    data => data.type == this.search.type
                );
        },
        async deleteMembers() {
            this.btnLoading = true;
            await deleteMembers(this.data, this.id);
            this.btnLoading = false;
            this.data = "";
            this.closeDialog();
            this.$emit("reload");
        }
    }
};
</script>
<style lang="">
</style>