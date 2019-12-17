<template>
    <el-row class="mb-20">
        <h3 class="title">
            Hóa đơn
            <el-button
                class="fr"
                v-if="tableData.length==0"
                @click="$router.push({name:'Thêm mới hóa đơn',params:{order}})"
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
    props: ["order"],
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
                const { data } = await getInvoices(this.$route.params.id);
                if (data) this.tableData = [data];
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