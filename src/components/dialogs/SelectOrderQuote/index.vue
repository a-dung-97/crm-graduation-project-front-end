<template>
    <el-dialog
        top="0"
        :title="type=='order'?'Chọn đơn hàng':'Chọn báo giá'"
        :visible.sync="showDialog "
        :before-close="closeDialog"
        width="60%"
        center
    >
        <el-input
            prefix-icon="el-icon-search"
            v-model="params.code"
            style="width:25%"
            size="small"
            placeholder="Tìm kiếm theo mã"
        >
            <el-button @click="params.page=1;getData()" slot="append" icon="el-icon-search"></el-button>
        </el-input>
        <el-table
            ref="singleTable"
            height="400px"
            highlight-current-row
            @current-change="handleCurrentChange"
            :data="tableData"
            v-loading="loading"
            style="width: 100%"
        >
            <el-table-column prop="code" label="Mã"></el-table-column>
            <el-table-column prop="customer" label="Khách hàng"></el-table-column>
        </el-table>
        <Pagination
            :pagination="pagination"
            @size-change="params.perPage=$event;params.page=1;getData()"
            @current-change="params.page=$event;getData()"
        />
    </el-dialog>
</template>

<script>
import { index as getOrders } from "@/api/business/order";
import { index as getQuotes } from "@/api/business/quote";
import Pagination from "@/components/Pagination/index";
export default {
    props: ["showDialog", "customer", "type"],
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
            getDataFunc: "",
            pagination: {},
            params: {
                code: "",
                perPage: 10,
                list: true
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
                this.params.customer = this.customer;
                if (this.type == "order") this.getDataFunc = getOrders;
                else this.getDataFunc = getQuotes;
                const { data, meta } = await this.getDataFunc(this.params);
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