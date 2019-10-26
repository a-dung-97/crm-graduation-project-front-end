<template>
    <el-dialog
        :before-close="closeDialog"
        title="Người dùng"
        :visible.sync="showDialog"
        width="30%"
        center
    >
        <el-input v-model="search" @keyup.enter.native="getUsers" placeholder="Nhập để tìm kiếm"></el-input>
        <el-table
            :data="tableData"
            v-loading="loading"
            max-height="300"
            ref="multipleTable"
            style="width: 100%"
            @selection-change="handleSelectionChange"
        >
            <el-table-column type="selection" width="55"></el-table-column>
            <el-table-column prop="name" label="Họ tên"></el-table-column>
        </el-table>
        <span slot="footer" class="dialog-footer">
            <el-button @click="cancel">Hủy</el-button>
            <el-button :loading="btnLoading" @click="updateUsers" type="primary">Cập nhật</el-button>
        </span>
    </el-dialog>
</template>
<script>
import { index } from "@/api/company/user";
import { updateUsers } from "@/api/company/group";
export default {
    props: ["showDialog", "users", "id"],
    data() {
        return {
            loading: false,
            btnLoading: false,
            search: null,
            isToggling: true,
            tableData: []
            // tmp: [...this.users]
        };
    },

    computed: {
        tmp() {
            return [...this.users];
        }
    },
    watch: {
        showDialog(val) {
            if (val) {
                this.getUsers();
            }
        }
    },
    methods: {
        cancel() {
            this.closeDialog();
            this.tmp.splice(0, this.tmp.length);
            this.users.forEach(item => this.tmp.push(item));
        },
        closeDialog() {
            this.$emit("update:showDialog", false);
        },
        async getUsers() {
            try {
                this.loading = true;

                let request = await index({ search: this.search });
                this.tableData = request.data;
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
            console.log(this.tmp);
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
        reload() {
            this.btnLoading = false;
            this.$message.success("Cập nhật thành công");
            this.closeDialog();
            this.$emit("reload");
        },
        async updateUsers() {
            try {
                console.log(this.tmp);
                this.btnLoading = true;
                await updateUsers(this.id, this.tmp);
                this.reload();
            } catch (error) {
                console.log(error);
                this.btnLoading = false;
            }
        }
    }
};
</script>
<style lang="">
</style>