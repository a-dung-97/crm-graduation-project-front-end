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
                <el-button type="primary" @click="exportExcel" size="small">Xuất Excel</el-button>
                <ChangingTag :objs="selected" type="lead" />
                <el-button
                    class="fr"
                    @click="$router.push('/customer/lead/create')"
                    size="medium"
                    type="primary"
                    icon="el-icon-plus"
                    circle
                ></el-button>
                <el-button
                    class="fr mr-10"
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
                <TableData
                    @selection-change="handleSelectionChange"
                    :table-data="tableData"
                    :loading.sync="loading"
                />
                <Pagination
                    :pagination="pagination"
                    @size-change="params.perPage=$event;params.page=1;getData()"
                    @current-change="params.page=$event;getData()"
                />
            </el-col>
        </el-row>
        <MailingList :members="selected" :show-dialog.sync="showMailingListDialog" type="lead" />
    </div>
</template>
<script>
import { index } from "@/api/customer/lead";
import TableData from "./components/TableData";
import Pagination from "@/components/Pagination/index";
import SearchForm from "./components/SearchForm";
import MailingList from "@/components/MailingList/index";
import selectMulti from "@/mixins/select-multi";
import ChangingTag from "@/components/TagChanging/index";
import axios from "axios";
import { getToken } from "@/utils/auth";
export default {
    components: { TableData, Pagination, SearchForm, MailingList, ChangingTag },
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
        },
        exportExcel() {
            this.openFullScreen();
            axios({
                url: process.env.VUE_APP_BASE_API + "leads",
                method: "get",
                headers: { ["Authorization"]: "Bearer " + getToken() },
                responseType: "blob", // important
                params: { ...this.params, export: true }
            }).then(response => {
                const url = window.URL.createObjectURL(
                    new Blob([response.data])
                );
                const link = document.createElement("a");
                link.href = url;
                link.setAttribute("download", "CRM_Lead_Export.xlsx");
                document.body.appendChild(link);
                link.click();
                this.closeFullScreen();
            });
        }
    },

    created() {
        this.getData();
    }
};
</script>
<style lang="">
</style>