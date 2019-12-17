<template>
    <el-card v-loading="loading" style="height:434px">
        <div slot="header" style="height:32px;line-height:32px">
            <span>Doanh thu nhân viên</span>
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
                <el-option value="yesterday" label="Hôm qua"></el-option>
                <el-option value="thisweek" label="Tuần này"></el-option>
                <el-option value="lastweek" label="Tuần trước"></el-option>
                <el-option value="thismonth" label="Tháng này"></el-option>
                <el-option value="lastmonth" label="Tháng trước"></el-option>
            </el-select>
        </div>
        <div class="chart-container">
            <BarChart :chart-data="chartData" v-if="chartData" :styles="myStyles" />
        </div>
    </el-card>
</template>
<script>
import BarChart from "../charts/BarChart";
import { getRevenueReport } from "@/api/report/report";
export default {
    components: { BarChart },
    data() {
        return {
            loading: false,
            chartData: "",
            params: {
                time: ""
            },
            myStyles: {
                height: "100%",
                maxWidth: `100%`,
                position: "relative"
            }
        };
    },
    methods: {
        async getData() {
            try {
                this.loading = true;
                const { data } = await getRevenueReport(this.params);
                let labels = [];
                let datasets = [
                    {
                        label: "Doanh thu",
                        backgroundColor: "#74b9ff",
                        data: []
                    }
                ];
                data.forEach(item => {
                    labels.push(item.name);
                    datasets[0].data.push(item.total);
                });
                this.chartData = { labels, datasets };
                this.loading = false;
            } catch (error) {}
        }
    },
    created() {
        this.getData();
    }
};
</script>
<style lang="css">
.chart-container {
    height: 320px;
}
</style>