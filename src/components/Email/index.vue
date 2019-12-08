<template>
    <div>
        <el-row class="mb-20">
            <el-col :span="24">
                <el-button
                    circle
                    size="medium"
                    type="primary"
                    icon="el-icon-refresh"
                    @click="getData"
                ></el-button>
                <el-button
                    class="fr"
                    @click="showDialog=true"
                    size="medium"
                    type="primary"
                >Gửi email</el-button>
            </el-col>
        </el-row>
        <el-row>
            <el-col :span="24">
                <TableData
                    :table-data="tableData"
                    @handle-delete="getData()"
                    :loading.sync="loading"
                    :recipient="recipient"
                ></TableData>
            </el-col>
        </el-row>
        <Pagination
            :pagination="pagination"
            @size-change="params.perPage=$event;params.page=1;getData()"
            @current-change="params.page=$event;getData()"
        />
        <SendingEmail @reload="getData" :show-dialog.sync="showDialog" :type="type" />
    </div>
</template>
<script>
import { index } from "@/api/marketing/email";
import TableData from "./components/TableData";
import Pagination from "@/components/Pagination/index";
import SendingEmail from "@/components/SendingEmail/index";
export default {
    components: { TableData, Pagination, SendingEmail },
    props: ["type"],
    data() {
        let type = this.type;
        let id = this.$route.params.id;
        return {
            tableData: [],
            loading: false,
            pagination: {},
            recipient: "",
            params: {
                perPage: 10,
                page: 1,
                type,
                id
            },
            showDialog: false
        };
    },
    methods: {
        async getData() {
            try {
                this.loading = true;
                const { data, meta, recipient } = await index(this.params);
                this.tableData = data;
                this.pagination = meta;
                this.recipient = recipient;
                this.loading = false;
                this.$emit("handle-load", meta.total);
            } catch (error) {}
        }
    },
    created() {
        this.getData();
    }
};
</script>
<style lang="scss">
</style>