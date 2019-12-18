<template>
    <div class="app-container">
        <el-row class="mb-20">
            <SearchForm :params="params" @handle-search="getRoles" />
            <el-col :span="3">
                <el-button
                    class="fr"
                    @click="showDialogForm('create')"
                    size="medium"
                    type="primary"
                >Thêm quyền</el-button>
            </el-col>
        </el-row>

        <el-row>
            <el-col :span="24">
                <TableData
                    :form="form"
                    :table-data="tableData"
                    @handle-edit="showDialogForm('edit')"
                    @handle-delete="getRoles()"
                    @select-menu="showMenu"
                    :loading.sync="loading"
                ></TableData>
            </el-col>
        </el-row>
        <Pagination
            :pagination="pagination"
            @size-change="params.perPage=$event;params.page=1;getRoles()"
            @current-change="params.page=$event;getRoles()"
        />
        <DialogForm
            @reload="getRoles()"
            :show-dialog.sync="showDialog"
            :editing="editing"
            :form="form"
        />
        <Menu :menus="menus" :id="id" :show-dialog.sync="showDialog1" />
    </div>
</template>
<script>
import { index } from "@/api/company/role";
import { getMenuList } from "@/api/company/role";
import TableData from "./components/TableData";
import DialogForm from "./components/DialogForm";
import Pagination from "@/components/Pagination/index";
import SearchForm from "./components/SearchForm";
import Menu from "./components/Menu";
export default {
    components: { TableData, DialogForm, Pagination, SearchForm, Menu },
    data() {
        return {
            menus: [],
            id: "",
            tableData: [],
            loading: false,
            pagination: {},
            params: {
                perPage: 10,
                page: 1,
                search: ""
            },
            showDialog: false,
            showDialog1: false,
            editing: false,
            form: {
                id: "",
                name: "",
                description: ""
            }
        };
    },
    methods: {
        showMenu(id) {
            this.id = id;
            this.showDialog1 = true;
        },
        async getRoles() {
            try {
                this.loading = true;
                let request = await index(this.params);
                this.tableData = request.data;
                this.pagination = request.meta;
                this.loading = false;
            } catch (error) {}
        },
        async getMenuList() {
            try {
                let request = await getMenuList({ menu: true });
                this.menus = request.data;
            } catch (error) {}
        },
        async getData() {
            this.openFullScreen();
            await Promise.all([this.getRoles(), this.getMenuList()]);
            this.closeFullScreen();
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