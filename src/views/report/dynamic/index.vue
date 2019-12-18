<template>
    <div class="app-container">
        <el-row class="mb-20">
            <SearchForm :params="params" @handle-search="getData" />
            <el-col :span="3">
                <el-button
                    class="fr"
                    @click="showDialogForm('create')"
                    size="medium"
                    type="primary"
                >Thêm báo cáo</el-button>
            </el-col>
        </el-row>
        <el-row>
            <el-col :span="24">
                <TableData
                    :table-data="tableData"
                    @handle-edit="showDialogForm('edit',$event)"
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
        <DialogForm
            @reload="getData()"
            :show-dialog.sync="showDialog"
            :isEdit="isEdit"
            :data="data"
        />
    </div>
</template>
<script>
import { index } from "@/api/report/dynamic";
import TableData from "./components/TableData";
import DialogForm from "./components/DialogForm";
import Pagination from "@/components/Pagination/index";
import SearchForm from "./components/SearchForm";
export default {
    components: { TableData, DialogForm, Pagination, SearchForm },
    data() {
        return {
            tableData: [],
            loading: false,
            pagination: {},
            data: "",
            params: {
                perPage: 10,
                page: 1,
                search: ""
            },
            showDialog: false,
            isEdit: false
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
        },
        showDialogForm(mode, data) {
            this.showDialog = true;
            if (mode == "edit") {
                this.isEdit = true;
                this.data = data;
            } else this.isEdit = false;
        }
    },
    created() {
        this.getData();
    }
};
</script>
<style lang="scss">
</style>