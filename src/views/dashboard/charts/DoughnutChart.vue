<script>
import { Doughnut, mixins } from "vue-chartjs";
const { reactiveProp } = mixins;
export default {
    extends: Doughnut,
    mixins: [reactiveProp],
    data() {
        let rate = 0;
        if (this.chartData.datasets[0].data.length > 0)
            rate =
                Math.round(
                    (this.chartData.datasets[0].data[2] * 100 * 100) /
                        this.chartData.datasets[0].data[0]
                ) / 100;
        return {
            options: {
                responsive: true,
                maintainAspectRatio: false,
                title: {
                    display: true,
                    position: "bottom",
                    text: "Tỉ lệ chuyển đổi " + rate + "%"
                }
            }
        };
    },
    mounted() {
        this.renderChart(this.chartData, this.options);
    }
};
</script>