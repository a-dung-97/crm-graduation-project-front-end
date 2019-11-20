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
                >Mời người dùng</el-button>
            </el-col>
        </el-row>

        <el-row>
            <el-col :span="24">
                <TableData
                    :form="form"
                    :table-data="tableData"
                    @handle-edit="showDialogForm('edit')"
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
            :options="options"
            :show-dialog.sync="showDialog"
            :editing="editing"
            :form="form"
        />
    </div>
</template>
<script>
import { index } from "@/api/company/user";
import { index as getPositions } from "@/api/company/position";
import { index as getDepartments } from "@/api/company/department";
import { index as getRoles } from "@/api/company/role";
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
            search: "",
            options: {
                positions: [],
                departments: []
            },
            pagination: {},
            params: {
                perPage: 10,
                page: 1,
                search: ""
            },
            showDialog: false,
            editing: false,
            form: {
                name: "",
                phone_number: "",
                active: "",
                position_id: "",
                email: "",
                department_id: "",
                role_id: ""
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
            } catch (error) {
                console.log(error);
            }
        },
        async getOption() {
            try {
                let request = await Promise.all([
                    getPositions(),
                    getDepartments(),
                    getRoles()
                ]);
                [
                    this.options.positions,
                    this.options.departments,
                    this.options.roles
                ] = request.map(item => item.data);
                // console.log(request);
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
    }
};
</script>
<style lang="scss">
</style>