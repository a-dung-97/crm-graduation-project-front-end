<template>
    <div class="app-container">
        <el-row class="mb-20">
            <!-- <SearchForm :params="params" @handle-search="getData" /> -->

            <el-col :span="24">
                <el-button disabled type="primary" size="small">Xóa</el-button>
                <el-button disabled type="primary" size="small">Gửi email</el-button>
                <el-button disabled type="primary" size="small">Gửi SMS</el-button>
                <el-button disabled type="primary" size="small">Danh sách email</el-button>
                <el-button disabled type="primary" size="small">Chuyển chủ sở hữu</el-button>
                <el-button
                    class="fr"
                    @click="$router.push('/customer/lead/create')"
                    size="medium"
                    type="primary"
                    icon="el-icon-plus"
                    circle
                ></el-button>
                <el-button
                    class="fr"
                    @click="getData"
                    size="medium"
                    type="primary"
                    icon="el-icon-search"
                    circle
                ></el-button>
            </el-col>
        </el-row>

        <SearchForm :params="params" />

        <el-row>
            <el-col :span="24">
                <TableData :table-data="tableData" :loading.sync="loading" />
                <Pagination
                    :pagination="pagination"
                    @size-change="params.perPage=$event;params.page=1;getData()"
                    @current-change="params.page=$event;getData()"
                />
            </el-col>
        </el-row>
    </div>
</template>
<script>
import { index } from "@/api/customer/lead";
import TableData from "./components/TableData";
import Pagination from "@/components/Pagination/index";
import SearchForm from "./components/SearchForm";
export default {
    components: { TableData, Pagination, SearchForm },
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
                company: "",
                branch: "",
                user: "",
                createdAt: "",
                scoreFrom: "",
                scoreTo: "",
                tags: "",
                birthday: "",
                interactive: "",
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