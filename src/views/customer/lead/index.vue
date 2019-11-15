<template>
    <div class="app-container">
        <el-row class="control">
            <SearchForm :params="params" @handle-search="getData" />
            <el-col :span="3">
                <el-button
                    class="fr"
                    @click="$router.push('/goods/product/create')"
                    size="medium"
                    type="primary"
                >Thêm sản phẩm</el-button>
            </el-col>
        </el-row>
        <el-row>
            <el-col :span="24">
                <TableData :table-data="tableData" :loading.sync="loading" />
                <Pagination
                    :pagination="pagination"
                    @size-change="params.per_page=$event;params.page=1;getData()"
                    @current-change="params.page=$event;getData()"
                />
            </el-col>
        </el-row>
    </div>
</template>
<script>
import { index } from "@/api/goods/product";
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
                per_page: 5,
                page: 1,
                search: "",
                type: ""
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
    mounted() {
        this.$bus.$on("refresh", () => this.getData());
    },
    created() {
        this.getData();
    }
};
</script>
<style lang="">
</style>