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
                    icon="el-icon-plus"
                    circle
                ></el-button>
                <el-button
                    type="primary"
                    size="medium"
                    class="fr mr-10"
                    @click="getData"
                    icon="el-icon-search"
                    circle
                ></el-button>
            </el-col>
        </el-row>

        <el-row>
            <el-col :span="24">
                <TableData
                    :form="form"
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
            :editing="editing"
            :form="form"
        />
    </div>
</template>
<script>
import { index } from "@/api/accounting/cashbook";
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
            params: {
                perPage: 10,
                page: 1,
                name: "",
                type: "",
                description: ""
            },
            showDialog: false,
            editing: false,
            form: {
                id: "",
                type: "Tiền mặt",
                name: "",
                owner: "",
                bank_name: "",
                bank_branch: "",
                currency: "",
                address: "",
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
        showDialogForm(mode, row) {
            if (mode == "edit") {
                console.log(row);

                for (let field in this.form)
                    if (field != "balance") this.form[field] = row[field];
                this.editing = true;
            } else {
                for (let field in this.form)
                    if (field != "type") this.form[field] = "";
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