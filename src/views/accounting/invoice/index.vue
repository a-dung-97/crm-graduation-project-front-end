<template>
    <div class="app-container">
        <el-row class="mb-20">
            <el-col :span="21">
                <SearchForm :params="params" />
            </el-col>

            <el-col :span="3">
                <el-button
                    class="fr"
                    @click="$router.push('/accounting/invoice/create')"
                    size="medium"
                    type="primary"
                    circle
                    icon="el-icon-plus"
                ></el-button>
                <el-button
                    class="fr mr-10"
                    @click="getData"
                    size="medium"
                    type="primary"
                    circle
                    icon="el-icon-search"
                ></el-button>
            </el-col>
        </el-row>
        <el-row>
            <el-col :span="24">
                <TableData
                    :table-data="tableData"
                    @handle-delete="getData"
                    :loading.sync="loading"
                />
                <Pagination
                    :pagination="pagination"
                    @size-change="params.perPage=$event;params.page=1;getData()"
                    @current-change="params.page=$event;getData()"
                />
            </el-col>
        </el-row>
    </div>
</template>
<script>
import { index } from "@/api/accounting/invoice";
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
            params: {
                perPage: 10,
                page: 1,
                code: "",
                customer: "",
                order: "",
                user: "",
                status: "",
                paymentMethod: "",
                createdAt: ""
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
            } catch (error) {
                console.log(error);
                this.loading = false;
            }
        }
    },
    created() {
        this.getData();
    }
};
</script>
<style lang="">
</style>