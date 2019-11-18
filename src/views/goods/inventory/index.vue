<template>
    <div class="app-container">
        <el-row class="control">
            <SearchForm :warehouses="warehouses" :params="params" @handle-search="getData" />
        </el-row>

        <el-row>
            <el-col :span="24">
                <TableData :table-data="tableData" :loading.sync="loading"></TableData>
            </el-col>
        </el-row>
        <Pagination
            :pagination="pagination"
            @size-change="params.perPage=$event;params.page=1;getData()"
            @current-change="params.page=$event;getData()"
        />
    </div>
</template>
<script>
import { index as getWarehouses } from "@/api/goods/warehouse";
import { index } from "@/api/goods/inventory";
import TableData from "./components/TableData";
import Pagination from "@/components/Pagination/index";
import SearchForm from "./components/SearchForm";
export default {
    components: { TableData, Pagination, SearchForm },
    data() {
        return {
            tableData: [],
            loading: false,
            pagination: {},
            warehouses: [],
            params: {
                perPage: 5,
                page: 1,
                warehouse: "",
                search: ""
            }
        };
    },
    methods: {
        async getData() {
            try {
                this.loading = true;
                const { data, meta } = await index(this.params);
                this.tableData = data;
                this.pagination = meta;
                this.loading = false;
            } catch (error) {}
        },
        async getWarehouses() {
            try {
                const { data } = await getWarehouses();
                this.warehouses = data;
            } catch (error) {}
        }
    },
    created() {
        this.getData();
        this.getWarehouses();
    }
};
</script>
<style lang="scss">
.control {
    margin-bottom: 20px;
}
</style>