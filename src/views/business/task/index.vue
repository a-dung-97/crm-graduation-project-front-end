<template>
    <div class="app-container">
        <el-row class="mb-20">
            <el-col :span="21">
                <SearchForm :params="params" @handle-search="getData" />
            </el-col>

            <el-col :span="3">
                <el-button
                    class="fr"
                    @click="$router.push('/business/task/create')"
                    size="medium"
                    type="primary"
                >Thêm công việc</el-button>
            </el-col>
        </el-row>
        <el-row style="margin-top:30px">
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
import { index } from "@/api/business/task";
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
                title: "",
                startDate: "",
                status: "",
                finishDate: "",
                user: "",
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
    created() {
        this.getData();
    }
};
</script>
<style lang="">
</style>