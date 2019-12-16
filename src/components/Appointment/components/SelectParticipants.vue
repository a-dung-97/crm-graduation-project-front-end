<template>
    <el-dialog
        :before-close="closeDialog"
        title="Chọn người tham gia"
        :visible.sync="showDialog"
        append-to-body
        width="40%"
        center
    >
        <el-input
            v-model="params.name"
            @keyup.enter.native="getData"
            placeholder="Nhập để tìm kiếm"
        ></el-input>
        <el-table
            :data="tableData"
            v-loading="loading"
            max-height="300"
            ref="multipleTable"
            style="width: 100%"
            @selection-change="handleSelectionChange"
        >
            <el-table-column type="selection" width="55"></el-table-column>
            <el-table-column prop="name" label="Tên"></el-table-column>
            <el-table-column prop="email" label="Email"></el-table-column>
        </el-table>
        <Pagination
            :pagination="pagination"
            @size-change="params.perPage=$event;params.page=1;getData()"
            @current-change="params.page=$event;getData()"
        />
        <span slot="footer" class="dialog-footer">
            <el-button @click="cancel">Hủy</el-button>
            <el-button :loading="btnLoading" @click="updateData" type="primary">OK</el-button>
        </span>
    </el-dialog>
</template>
<script>
import { index as getUsers } from "@/api/company/user";
import { index as getLeads } from "@/api/customer/lead";
import { index as getContacts } from "@/api/customer/contact";
import Pagination from "@/components/Pagination/index";

export default {
    props: ["showDialog", "data", "mode"],
    components: { Pagination },
    data() {
        return {
            loading: false,
            btnLoading: false,
            search: null,
            pagination: {},
            params: {
                perPage: 10,
                list: true,
                name: ""
            },
            tableData: []
        };
    },

    computed: {
        tmp() {
            return [...this.data];
        }
    },
    watch: {
        showDialog(val) {
            if (val) {
                this.getData();
            }
        }
    },
    methods: {
        cancel() {
            this.closeDialog();
            this.tmp.splice(0, this.tmp.length);
            this.data.forEach(item => this.tmp.push(item));
        },
        closeDialog() {
            this.$emit("update:showDialog", false);
        },
        async getData() {
            try {
                this.loading = true;
                let getDataFunc = "";
                switch (this.mode) {
                    case "users":
                        getDataFunc = getUsers;
                        break;
                    case "contacts":
                        getDataFunc = getContacts;
                        break;
                    case "leads":
                        getDataFunc = getLeads;
                        break;
                    default:
                        break;
                }
                let request = await getDataFunc(this.params);
                this.tableData = request.data;
                this.pagination = request.meta;
                let toggleList = this.tableData.filter(
                    item => this.tmp.indexOf(item.id) != -1
                );
                setTimeout(() => {
                    this.toggleSelection(toggleList);
                }, 0);
                this.loading = false;
            } catch (error) {
                this.loading = false;
                console.log(error);
            }
        },
        getToggleList() {
            return this.tableData.filter(
                item => this.tmp.indexOf(item.id) != -1
            );
        },
        handleSelectionChange(val) {
            val = val.map(item => item.id);
            let toggleList = this.getToggleList().map(item => item.id);
            toggleList.forEach(item => {
                if (val.indexOf(item) == -1) {
                    this.tmp.splice(this.tmp.indexOf(item), 1);
                }
            });
            val.forEach(item => {
                if (toggleList.indexOf(item) == -1) this.tmp.push(item);
            });
        },
        toggleSelection(rows) {
            if (rows) {
                rows.forEach(row => {
                    this.$refs.multipleTable.toggleRowSelection(row);
                });
            } else {
                this.$refs.multipleTable.clearSelection();
            }
        },
        updateData() {
            this.$emit("handle-select", this.tmp);
            this.closeDialog();
        }
    }
};
</script>
<style lang="">
</style>