<template>
    <div class="app-container">
        <el-row class="mb-20">
            <el-col :span="21">
                <SearchForm :params="params" />
            </el-col>
            <el-col :span="3">
                <el-button
                    class="fr"
                    @click="$router.push('/business/quote/create')"
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
                    @handle-delete="getData"
                    :table-data="tableData"
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
import { index } from "@/api/business/quote";
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
                deliveryAddress: "",
                customer: "",
                ownerableType: "",
                ownerableId: "",
                quoteDate: ""
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