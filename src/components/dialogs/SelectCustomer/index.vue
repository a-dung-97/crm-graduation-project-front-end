<template>
    <el-dialog
        top="0"
        :title="type=='App\\Lead'?'Chọn tiềm năng':(type=='App\\Customer'?'Chọn khách hàng':'Chọn liên hệ')"
        :visible.sync="showDialog "
        :before-close="closeDialog"
        width="75%"
        append-to-body
        center
    >
        <el-input
            prefix-icon="el-icon-search"
            v-model="params.name"
            style="width:25%"
            size="small"
            placeholder="Tìm kiếm theo tên"
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
            <el-table-column v-if="type=='App\\Lead'" prop="name" label="Họ tên"></el-table-column>
            <el-table-column v-else prop="name" label="Tên"></el-table-column>
            <el-table-column prop="email" label="Email"></el-table-column>
            <el-table-column prop="phone_number" label="Số điện thoại"></el-table-column>
            <el-table-column prop="mobile_number" label="Số di động"></el-table-column>
        </el-table>
        <Pagination
            :pagination="pagination"
            @size-change="params.perPage=$event;params.page=1;getData()"
            @current-change="params.page=$event;getData()"
        />
    </el-dialog>
</template>

<script>
import { index as getLeads } from "@/api/customer/lead";
import { index as getCustomers } from "@/api/customer/customer";
import { index as getContacts } from "@/api/customer/contact";
import Pagination from "@/components/Pagination/index";
export default {
    props: ["showDialog", "type", "customer"],
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
            name: "",
            params: {
                name: "",
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
                if (this.type == "App\\Lead") this.getDataFunc = getLeads;
                else if (this.type == "App\\Customer")
                    this.getDataFunc = getCustomers;
                else {
                    this.params.customer = this.customer;
                    this.getDataFunc = getContacts;
                }
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