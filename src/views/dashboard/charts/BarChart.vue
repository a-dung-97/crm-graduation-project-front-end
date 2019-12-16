<script>
import { Bar, mixins } from "vue-chartjs";
const { reactiveProp } = mixins;
export default {
    extends: Bar,
    mixins: [reactiveProp],
    data: () => ({
        options: {
            responsive: true,
            maintainAspectRatio: false,
            scales: {
                yAxes: [
                    {
                        ticks: {
                            beginAtZero: true,
                            callback: function(value, index, values) {
                                return value
                                    .toString()
                                    .replace(/(\d)(?=(\d{3})+(?!\d))/g, "$1,");
                            }
                        }
                    }
                ]
            },
            tooltips: {
                callbacks: {
                    label: function(tooltipItem, data) {
                        var label =
                            data.datasets[tooltipItem.datasetIndex].label || "";

                        if (label) {
                            label += ": ";
                        }
                        label += tooltipItem.yLabel
                            .toString()
                            .replace(/(\d)(?=(\d{3})+(?!\d))/g, "$1,");
                        return label;
                    }
                }
            }
        }
    }),

    mounted() {
        this.renderChart(this.chartData, this.options);
    }
};
</script>