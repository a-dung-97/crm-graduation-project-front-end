<template>
    <div class="app-container">
        <el-row class="mb-20">
            <!-- <SearchForm :params="params" @handle-search="getData" /> -->

            <el-col :span="24">
                <el-button :disabled="true" type="primary" size="small">Xóa</el-button>
                <el-button
                    :disabled="isSelecting"
                    @click="showMailingListDialog=true"
                    type="primary"
                    size="small"
                >Danh sách email</el-button>
                <el-button :disabled="isSelecting" type="primary" size="small">Xuất Excel</el-button>
                <el-button
                    class="fr"
                    @click="$router.push('/customer/customer/create')"
                    size="medium"
                    type="primary"
                    icon="el-icon-plus"
                    circle
                ></el-button>
            </el-col>
        </el-row>

        <SearchForm :params="params" @handle-search="getData" />

        <el-row>
            <el-col :span="24">
                <TableData
                    :table-data="tableData"
                    :loading.sync="loading"
                    @selection-change="handleSelectionChange"
                />
                <Pagination
                    :pagination="pagination"
                    @size-change="params.perPage=$event;params.page=1;getData()"
                    @current-change="params.page=$event;getData()"
                />
            </el-col>
        </el-row>
        <MailingList :members="selected" :show-dialog.sync="showMailingListDialog" type="customer" />
    </div>
</template>
<script>
import { index } from "@/api/customer/customer";
import TableData from "./components/TableData";
import Pagination from "@/components/Pagination/index";
import SearchForm from "./components/SearchForm";
import MailingList from "@/components/MailingList/index";
import selectMulti from "@/mixins/select-multi";
export default {
    components: { TableData, Pagination, SearchForm, MailingList },
    mixins: [selectMulti],
    data() {
        return {
            tableData: [],
            loading: false,
            pagination: {},
            params: {
                perPage: 10,
                page: 1,
                search: "",
                source: "",
                branch: "",
                ownerable: "",
                createdAt: "",
                tags: "",
                birthday: "",
                ownerableType: "",
                ownerableId: ""
            }
        };
    },
    methods: {
        async getData() {
            try {
                this.loading = true;
                const { data, meta } = await index(this.params);
                this.tableData = data;
                this.pagination = meta;
                this.loading = false;
            } catch (error) {
                console.log(error);
                this.loading = false;
            }
        }
    },
    mounted() {
        this.$bus.$on("refresh", () => this.getData());
    },
    created() {
        this.getData();
    }
};
</script>
<style lang="">
</style>