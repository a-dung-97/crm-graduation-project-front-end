<template>
    <div>
        <el-row class="control">
            <el-col :span="24">
                <el-button
                    class="fr"
                    @click="showDialogUpload()"
                    size="medium"
                    type="primary"
                >Tải lên</el-button>
            </el-col>
        </el-row>

        <el-row>
            <el-col :span="24">
                <TableData
                    :table-data="tableData"
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
        <DialogUpload @reload="getData()" :show-dialog.sync="showDialog" :type="type" />
    </div>
</template>
<script>
import { addFiles, getFiles } from "@/api/general/file";
import TableData from "./components/TableData";
import DialogUpload from "./components/DialogUpload";
import Pagination from "@/components/Pagination/index";
export default {
    components: { TableData, DialogUpload, Pagination },
    props: ["type"],
    data() {
        return {
            tableData: [],
            loading: false,
            getDataFunc: "",
            pagination: {},
            params: {
                perPage: 5,
                page: 1
            },
            showDialog: false
        };
    },
    methods: {
        async getData() {
            try {
                this.loading = true;
                const { data, meta } = await getFiles(
                    this.params,
                    this.type,
                    this.$route.params.id
                );
                this.tableData = data;
                this.pagination = meta;
                this.loading = false;
            } catch (error) {}
        },
        showDialogUpload() {
            this.showDialog = true;
        }
    },
    created() {
        this.getData();
    }
};
</script>
<style lang="scss">
.control {
    margin-bottom: 20px;
}
</style>