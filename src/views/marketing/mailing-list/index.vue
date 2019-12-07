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
                >Thêm danh sách email</el-button>
            </el-col>
        </el-row>

        <el-row>
            <el-col :span="24">
                <TableData
                    :form="form"
                    :table-data="tableData"
                    @handle-edit="showDialogForm('edit')"
                    @handle-delete="getData()"
                    @handle-edit-members="showDialogTableUpdateMembers($event)"
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
            :editing="editing"
            :form="form"
        />
        <DialogTable @reload="getData()" :id="currentListId" :show-dialog.sync="showDialogTable" />
    </div>
</template>
<script>
import { index } from "@/api/marketing/mailing-list";
import TableData from "./components/TableData";
import DialogForm from "./components/DialogForm";
import Pagination from "@/components/Pagination/index";
import SearchForm from "./components/SearchForm";
import DialogTable from "./components/DialogTable";
export default {
    components: { TableData, DialogForm, Pagination, SearchForm, DialogTable },
    data() {
        return {
            tableData: [],
            loading: false,
            pagination: {},
            params: {
                perPage: 10,
                page: 1,
                search: ""
            },
            users: [],
            currentListId: "",
            showDialog: false,
            showDialogTable: false,
            editing: false,
            form: {
                name: "",
                description: ""
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
        },
        showDialogForm(mode) {
            if (mode == "edit") this.editing = true;
            else {
                for (let field in this.form) this.form[field] = "";
                this.editing = false;
            }
            this.showDialog = true;
        },
        showDialogTableUpdateMembers(e) {
            this.currentListId = e;
            this.showDialogTable = true;
        }
    },
    created() {
        this.getData();
    }
};
</script>
<style lang="scss">
</style>