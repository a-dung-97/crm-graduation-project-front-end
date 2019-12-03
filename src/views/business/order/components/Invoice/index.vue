<template>
    <el-row class="mb-20">
        <h3 class="title">
            Danh sách hóa đơn
            <el-button
                class="fr"
                @click="$router.push({name:'Thêm mới hóa đơn'})"
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
import { getInvoices } from "@/api/business/order";
import TableData from "./components/TableData";
export default {
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
                const { data, meta } = await getInvoices(this.$route.params.id);
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