<template>
    <div>
        <el-row class="mb-20">
            <el-col :span="24">
                <el-button
                    class="fr"
                    @click="$router.push({name: 'Thêm mới báo giá',params:{cus}})"
                    size="medium"
                    type="primary"
                >Thêm báo giá</el-button>
            </el-col>
        </el-row>
        <el-row>
            <el-col :span="24">
                <TableData @handle-delete="getData" :table-data="tableData" :loading.sync="loading"></TableData>
            </el-col>
        </el-row>
        <Pagination
            :pagination="pagination"
            @size-change="params.perPage=$event;params.page=1;getData()"
            @current-change="params.page=$event;getData()"
        />
    </div>
</template>
<script>
import { getRelatedInfo } from "@/api/customer/customer";
import TableData from "./components/TableData";
import Pagination from "@/components/Pagination/index";
export default {
    components: { TableData, Pagination },
    props: ["user"],
    data() {
        return {
            tableData: [],
            loading: false,
            pagination: {},
            cus: "",
            params: {
                perPage: 10,
                page: 1
            }
        };
    },
    methods: {
        async getData() {
            try {
                this.loading = true;
                const { data, meta } = await getRelatedInfo(
                    this.$route.params.id,
                    "quote",
                    this.params
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
        this.bus.$on("customer", data => {
            this.cus = data;
        });
        this.getData();
    }
};
</script>
<style lang="scss">
</style>