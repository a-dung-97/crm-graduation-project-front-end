<script>
import { Doughnut, mixins } from "vue-chartjs";
const { reactiveProp } = mixins;
export default {
    extends: Doughnut,
    mixins: [reactiveProp],
    data() {
        let rate = 0;

        return {
            options: {
                responsive: true,
                maintainAspectRatio: false
            }
        };
    },
    mounted() {
        this.renderChart(this.chartData, this.options);
    }
};
</script>