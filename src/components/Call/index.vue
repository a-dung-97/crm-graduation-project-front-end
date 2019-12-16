<template>
    <div>
        <el-row class="mb-20">
            <el-col :span="24">
                <el-button
                    class="fr"
                    @click="showDialogForm('create')"
                    size="medium"
                    type="primary"
                >Thêm cuộc gọi</el-button>
            </el-col>
        </el-row>

        <el-row>
            <el-col :span="24">
                <TableData
                    :type="type"
                    @handle-edit="showDialogForm('edit',$event)"
                    @handle-delete="getData"
                    :table-data="tableData"
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
            :is-edit="isEdit"
            :lead="lead"
            :data="data"
            :contact="contact"
            :customer="customer"
            @reload="getData()"
            :show-dialog.sync="showDialog"
            :type="type"
        />
    </div>
</template>
<script>
import { getCalls } from "@/api/business/call";
import TableData from "./components/TableData";
import DialogForm from "./components/DialogForm";
import Pagination from "@/components/Pagination/index";
export default {
    components: { TableData, DialogForm, Pagination },
    props: ["type", "lead", "contact", "customer"],
    data() {
        return {
            tableData: [],
            isEdit: false,
            loading: false,
            data: "",
            pagination: {},
            params: {
                perPage: 10,
                page: 1
            },
            showDialog: false
        };
    },
    methods: {
        async getData() {
            try {
                this.loading = true;
                const { data, meta } = await getCalls(
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