
export default {
    data() {
        return {
            count: {
                file: 0,
                note: 0,
                task: 0,
                opportunity: 0,
                order: 0,
                quote: 0,
                email: 0
            }
        };
    },
    methods: {
        handleLoad(mode, val) {
            this.count[mode] = val;
        }
    }
}