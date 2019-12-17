<template>
    <el-row class="mb-20">
        <h3 class="title">
            Danh sách báo giá
            <el-button
                class="fr"
                @click="$router.push({name:'Thêm mới báo giá',params:{opportunity}})"
                type="primary"
                size="small"
                icon="el-icon-plus"
                circle
            ></el-button>
        </h3>
        <TableData @handle-delete="getData" :table-data="tableData" :loading.sync="loading"></TableData>
    </el-row>
</template>
<script>
import { getQuotes } from "@/api/business/opportunity";
import TableData from "./components/TableData";
export default {
    props: ["opportunity"],
    components: { TableData },
    data() {
        return {
            tableData: [],
            loading: false
        };
    },
    methods: {
        async getData() {
            try {
                this.loading = true;
                const { data, meta } = await getQuotes(this.$route.params.id);
                this.tableData = data;
                this.loading = false;
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