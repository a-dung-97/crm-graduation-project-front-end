<template>
    <el-row class="mb-20">
        <h3 class="title">
            Danh sách đơn hàng
            <el-button
                class="fr"
                @click="$router.push({name:'Thêm mới đơn hàng'})"
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
import { getOrders } from "@/api/business/quote";
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
                const { data, meta } = await getOrders(this.$route.params.id);
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