export default {
    data() {
        return {
            fullScreenLoading: null,
        }
    },
    methods: {
        openFullScreen() {
            this.fullScreenLoading = this.$loading({
                lock: true,
                text: 'Xin vui lòng chờ',
                spinner: 'el-icon-loading',
                background: 'rgba(0, 0, 0, 0.7)'
            });
        },
        closeFullScreen() {
            this.fullScreenLoading.close();
        }
    }
}