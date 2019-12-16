<template>
    <el-card v-loading="loading" style="height:434px">
        <div slot="header" style="height:32px;line-height:32px">
            <span>Chiến dịch email</span>
            <el-switch
                v-model="mode"
                style="margin-top:6px"
                class="fr"
                active-color="#13ce66"
                inactive-color="#ff4949"
                active-text="Biểu đồ"
                inactive-text="Bảng"
            ></el-switch>
        </div>
        <div v-if="mode" class="chart-container">
            <LineChart :chart-data="chartData" v-if="chartData" :styles="myStyles" />
        </div>
        <el-table v-else height="300px" :data="tableData">
            <el-table-column label="Tên">
                <template slot-scope="scope">
                    <el-link
                        :underline="false"
                        @click="$router.push(`/marketing/email-campaign/show/${scope.row.id}`)"
                        type="primary"
                    >{{ scope.row.name }}</el-link>
                </template>
            </el-table-column>
            <el-table-column align="center" prop="total_count" width="100" label="Tổng gửi"></el-table-column>
            <el-table-column align="center" prop="success_count" width="110" label="Thành công"></el-table-column>
            <el-table-column align="center" prop="delivered_count" width="80" label="Đã nhận"></el-table-column>
            <el-table-column align="center" prop="opened_count" label="Mở" width="50"></el-table-column>
            <el-table-column align="center" prop="failed_count" label="Trả lại" width="80"></el-table-column>
        </el-table>
    </el-card>
</template>
<script>
import LineChart from "../charts/LineChart";
import { getEmailCampaignReport } from "@/api/report/report";
export default {
    components: { LineChart },
    data() {
        return {
            mode: true,
            loading: false,
            chartData: "",
            myStyles: {
                height: "100%",
                maxWidth: `100%`,
                position: "relative"
            },
            tableData: []
        };
    },
    methods: {
        async getData() {
            try {
                this.loading = true;
                const { data } = await getEmailCampaignReport();
                this.tableData = data;
                let labels = [];
                let datasets = [
                    {
                        label: "Tổng gửi",
                        borderColor: "#fab1a0",
                        fill: false,
                        data: []
                    },
                    {
                        label: "Thành công",
                        borderColor: "#00b894",
                        fill: false,
                        data: []
                    },
                    {
                        label: "Đã nhận",
                        borderColor: "#686de0",
                        fill: false,
                        data: []
                    },
                    {
                        label: "Mở",
                        borderColor: "#f9ca24",
                        fill: false,
                        data: []
                    },
                    {
                        label: "Trả lại",
                        borderColor: "#eb4d4b",
                        fill: false,
                        data: []
                    }
                ];
                data.forEach(item => {
                    labels.push(item.name);
                    datasets[0].data.push(item.total_count);
                    datasets[1].data.push(item.success_count);
                    datasets[2].data.push(item.delivered_count);
                    datasets[3].data.push(item.opened_count);
                    datasets[4].data.push(item.failed_count);
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