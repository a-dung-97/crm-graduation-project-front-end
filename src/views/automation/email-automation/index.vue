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
                >Thêm email tự động</el-button>
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
            :mailing-lists="mailingLists"
            :editing="editing"
            :form="form"
        />
    </div>
</template>
<script>
import { index } from "@/api/automation/email-automation";
import { index as getMailingLists } from "@/api/marketing/mailing-list";
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
            mailingLists: [],
            params: {
                perPage: 10,
                page: 1,
                search: ""
            },
            users: [],
            showDialog: false,
            showDialogTable: false,
            editing: false,
            form: {
                name: "",
                description: "",
                mailing_list_id: ""
            }
        };
    },
    methods: {
        async getData() {
            try {
                this.loading = true;
                const [data, mailingLists] = await Promise.all([
                    index(this.params),
                    getMailingLists()
                ]);
                this.tableData = data.data;
                this.pagination = data.meta;
                this.mailingLists = mailingLists.data;
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
        }
    },
    created() {
        this.getData();
    }
};
</script>
<style lang="scss">
</style>