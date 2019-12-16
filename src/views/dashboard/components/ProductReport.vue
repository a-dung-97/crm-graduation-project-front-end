<template>
    <el-card style="height:434px">
        <div slot="header" style="height:32px;line-height:32px">
            <span>Top 10 sản phẩm bán chạy</span>
            <el-select
                class="fr"
                size="small"
                v-model="params.time"
                placeholder="Thời gian"
                @change="getData"
                @clear="getData"
                clearable
            >
                <el-option value="today" label="Hôm nay"></el-option>
                <el-option value="yestoday" label="Hôm qua"></el-option>
                <el-option value="thisweek" label="Tuần này"></el-option>
                <el-option value="lastweek" label="Tuần trước"></el-option>
                <el-option value="thismonth" label="Tháng này"></el-option>
                <el-option value="lastmonth" label="Tháng trước"></el-option>
            </el-select>
        </div>
        <el-table height="300px" :data="tableData" v-loading="loading">
            <el-table-column label="STT" type="index" width="50" align="center"></el-table-column>
            <el-table-column width="200" label="Tên">
                <template slot-scope="scope">
                    <router-link
                        tag="a"
                        class="link"
                        :to="`/goods/product/show/${scope.row.id}`"
                    >{{ scope.row.name }}</router-link>
                </template>
            </el-table-column>
            <el-table-column prop="code" width="100" label="Mã"></el-table-column>
            <el-table-column prop="total_sales" width="130" label="Doanh số" align="center"></el-table-column>
            <el-table-column label="Doanh thu" width="100" prop="total">
                <template slot-scope="scope">{{ scope.row.revenue|money }}</template>
            </el-table-column>
        </el-table>
    </el-card>
</template>
<script>
import { getProductReport } from "@/api/report/report";
export default {
    data() {
        return {
            loading: false,
            params: {
                time: ""
            },
            tableData: []
        };
    },
    methods: {
        async getData() {
            try {
                this.loading = true;
                const { data, meta } = await getProductReport(this.params);
                this.tableData = data;
                this.loading = false;
            } catch (error) {
                this.loading = false;
            }
        }
    },
    created() {
        this.getData();
    }
};
</script>
<style lang="">
</style>