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
            @size-change="params.per_page=$event;params.page=1;getData()"
            @current-change="params.page=$event;getData()"
        />
        <DialogUpload @reload="getData()" :show-dialog.sync="showDialog" :type="type" />
    </div>
</template>
<script>
import { getFiles as getProductFiles } from "@/api/goods/product";
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
                per_page: 5,
                page: 1
            },
            showDialog: false
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
        getFilesByType() {
            switch (this.type) {
                case "product":
                    this.getDataFunc = getProductFiles;
                    break;
                default:
                    break;
            }
        },
        showDialogUpload() {
            this.showDialog = true;
        }
    },
    created() {
        this.getFilesByType();
        this.getData();
    }
};
</script>
<style lang="scss">
.control {
    margin-bottom: 20px;
}
</style>