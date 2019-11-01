<template>
    <div>
        <el-row class="control">
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
            @size-change="params.per_page=$event;params.page=1;getData()"
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
import { getNotes as getProductNotes } from "@/api/goods/product";
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
                per_page: 5,
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
                const { data, meta } = await this.getDataFunc(
                    this.$route.params.id,
                    this.params
                );
                this.tableData = data;
                this.pagination = meta;
                this.loading = false;
            } catch (error) {}
        },
        getNotesByType() {
            switch (this.type) {
                case "product":
                    this.getDataFunc = getProductNotes;
                    break;
                default:
                    break;
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
        this.getNotesByType();
        this.getData();
    }
};
</script>
<style lang="scss">
.control {
    margin-bottom: 20px;
}
</style>