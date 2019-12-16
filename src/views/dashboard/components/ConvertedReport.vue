<template>
    <el-card v-loading="loading" style="height:434px">
        <div slot="header" style="height:32px;line-height:32px">
            <span>Tỉ lệ chuyển đổi</span>
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
        <div class="chart-container">
            <DoughnutChart :chart-data="chartData" v-if="chartData" :styles="myStyles" />
        </div>
    </el-card>
</template>
<script>
import DoughnutChart from "../charts/DoughnutChart";
import { getConvertedReport } from "@/api/report/report";
export default {
    components: { DoughnutChart },
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
                const { data } = await getConvertedReport(this.params);
                let labels = ["Tiềm năng mới", "Liên hệ", "Cơ hội"];
                let datasets = [
                    {
                        backgroundColor: ["#7bed9f", "#ffaf40", "#ffb8b8"],
                        data: []
                    }
                ];
                datasets[0].data = [...data];
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