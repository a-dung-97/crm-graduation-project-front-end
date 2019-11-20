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
                >Thêm chức vụ</el-button>
            </el-col>
        </el-row>

        <el-row>
            <el-col :span="4">
                <Tree :data="recursive" />
            </el-col>
            <el-col :span="20">
                <TableData
                    :form="form"
                    :table-data="tableData"
                    @handle-edit="showDialogForm('edit')"
                    @handle-delete="getData();getRecursive();getOption()"
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
            @reload="getData();getRecursive();getOption()"
            :options="options"
            :show-dialog.sync="showDialog"
            :editing="editing"
            :form="form"
        />
    </div>
</template>
<script>
import { index, recursive } from "@/api/company/position";
import TableData from "./components/TableData";
import DialogForm from "./components/DialogForm";
import Pagination from "@/components/Pagination/index";
import SearchForm from "./components/SearchForm";
import Tree from "./components/Tree";
export default {
    components: { TableData, DialogForm, Pagination, SearchForm, Tree },
    data() {
        return {
            tableData: [],
            loading: false,
            search: "",
            options: [],
            recursive: [],
            pagination: {},
            params: {
                perPage: 10,
                page: 1,
                search: "",
                parent: ""
            },
            showDialog: false,
            editing: false,
            form: {
                name: "",
                description: "",
                parent_id: ""
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
        async getOption() {
            try {
                let request = await index();
                this.options = request.data;
            } catch (error) {
                console.log(error);
            }
        },
        async getRecursive() {
            try {
                let request = await recursive();
                this.recursive = request.data;
            } catch (error) {
                console.log(error);
            }
        },
        showDialogForm(mode) {
            if (mode == "edit") this.editing = true;
            else {
                for (let field in this.form) this.form[field] = "";
                this.editing = false;
            }
            this.showDialog = true;
        }
    },
    created() {
        this.getData();
        this.getOption();
        this.getRecursive();
    }
};
</script>
<style lang="scss">
</style>