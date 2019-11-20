<template>
    <div>
        <el-row class="mb-20">
            <el-col :span="24">
                <el-button
                    class="fr"
                    @click="showDialogForm('create')"
                    size="medium"
                    type="primary"
                >Thêm ghi chú</el-button>
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
            :show-dialog.sync="showDialog"
            :editing="editing"
            :form="form"
            :type="type"
        />
    </div>
</template>
<script>
import { getNotes } from "@/api/general/note";
import TableData from "./components/TableData";
import DialogForm from "./components/DialogForm";
import Pagination from "@/components/Pagination/index";
export default {
    components: { TableData, DialogForm, Pagination },
    props: ["type"],
    data() {
        return {
            tableData: [],
            loading: false,
            getDataFunc: "",
            pagination: {},
            params: {
                perPage: 10,
                page: 1
            },
            showDialog: false,
            editing: false,
            form: {
                id: "",
                title: "",
                content: ""
            }
        };
    },
    methods: {
        async getData() {
            try {
                this.loading = true;
                const { data, meta } = await getNotes(
                    this.params,
                    this.type,
                    this.$route.params.id
                );
                this.tableData = data;
                this.pagination = meta;
                this.loading = false;
                this.$emit("handle-load", meta.total);
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