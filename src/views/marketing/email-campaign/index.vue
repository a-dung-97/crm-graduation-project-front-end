<template>
    <div class="app-container">
        <el-row class="mb-20">
            <SearchForm :params="params" @handle-search="getData" />
            <el-col :span="3">
                <el-button
                    @click="showDialog=true"
                    class="fr"
                    size="medium"
                    type="primary"
                >Thêm chiến dịch email</el-button>
            </el-col>
        </el-row>
        <el-row>
            <el-col :span="24">
                <TableData
                    :table-data="tableData"
                    @handle-delete="getData()"
                    :loading.sync="loading"
                ></TableData>
            </el-col>
        </el-row>
        <Pagination
            :pagination="pagination"
            @size-change="params.perPage=$event;params.page=1;getData()"
            @current-change="params.page=$event;getData()"
        />
        <DialogForm @reload="getData" :show-dialog.sync="showDialog" />
    </div>
</template>
<script>
import { index } from "@/api/marketing/email-campaign";
import TableData from "./components/TableData";
import Pagination from "@/components/Pagination/index";
import SearchForm from "./components/SearchForm";
import DialogForm from "./components/DialogForm";
export default {
    components: { TableData, Pagination, SearchForm, DialogForm },
    data() {
        return {
            tableData: [],
            showDialog: false,
            loading: false,
            pagination: {},
            params: {
                perPage: 10,
                page: 1,
                search: ""
            }
        };
    },
    methods: {
        async getData() {
            try {
                this.loading = true;
                let request = await index(this.params);
                this.tableData = request.data;
                this.pagination = request.meta;
                this.loading = false;
            } catch (error) {}
        }
    },
    created() {
        this.getData();
    }
};
</script>
<style lang="scss">
</style>