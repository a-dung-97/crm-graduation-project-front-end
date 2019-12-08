<template>
    <el-dialog
        top="10vh"
        title="Chọn mẫu email"
        :visible.sync="showDialog "
        :before-close="closeDialog"
        width="30%"
        center
        append-to-body
    >
        <el-input
            class="w-100"
            prefix-icon="el-icon-search"
            v-model="params.code"
            style="width:25%"
            size="small"
            placeholder="Tìm kiếm theo tên"
        >
            <el-button @click="params.page=1;getData()" slot="append" icon="el-icon-search"></el-button>
        </el-input>
        <el-table
            ref="singleTable"
            height="300px"
            highlight-current-row
            @current-change="handleCurrentChange"
            :data="tableData"
            v-loading="loading"
            style="width: 100%"
        >
            <el-table-column prop="name" label="Tên"></el-table-column>
            <el-table-column label="Ngày tạo">
                <template slot-scope="scope">{{ scope.row.created_at }}</template>
            </el-table-column>
        </el-table>
        <Pagination
            :pagination="pagination"
            @size-change="params.perPage=$event;params.page=1;getData()"
            @current-change="params.page=$event;getData()"
        />
    </el-dialog>
</template>

<script>
import { index } from "@/api/marketing/email-template";
import Pagination from "@/components/Pagination/index";
export default {
    props: ["showDialog"],
    components: { Pagination },
    watch: {
        showDialog(val) {
            if (val) this.getData();
        }
    },
    data() {
        return {
            tableData: [],
            loading: false,
            pagination: {},
            params: {
                perPage: 10,
                list: true,
                name: ""
            }
        };
    },
    methods: {
        closeDialog() {
            this.$emit("update:showDialog", false);
        },
        async getData() {
            try {
                this.loading = true;
                const { data, meta } = await index(this.params);
                this.tableData = data;
                this.pagination = meta;
                this.loading = false;
            } catch (error) {
                console.log(error);
                this.loading = false;
                this.tableData = [];
            }
        },
        handleCurrentChange(val) {
            if (val) {
                this.$emit("handle-select", val);
                this.closeDialog();
            }
        }
    }
};
</script>

<style scoped>
</style>