<template>
    <div>
        <el-row class="mb-20">
            <el-col :span="24">
                <el-button
                    class="fr"
                    @click="showDialogForm('create')"
                    size="medium"
                    type="primary"
                >Thêm công việc</el-button>
            </el-col>
        </el-row>

        <el-row>
            <el-col :span="24">
                <TableData
                    :form="form"
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
        <DialogForm @reload="getData()" :show-dialog.sync="showDialog" :form="form" :type="type" />
    </div>
</template>
<script>
import { getTasks } from "@/api/business/task";
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
            pagination: {},
            params: {
                perPage: 10,
                page: 1
            },
            showDialog: false,
            form: {
                id: "",
                user_id: "",
                title: "",
                start_date: "",
                expiration_date: "",
                priority: "",
                status: "",
                reminder_time: "",
                reminder_type: ""
            }
        };
    },
    methods: {
        async getData() {
            try {
                this.loading = true;
                const { data, meta } = await getTasks(
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
        showDialogForm() {
            for (let field in this.form) this.form[field] = "";
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