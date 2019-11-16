import { list } from '@/api/setting/catalog';
export default {
    data() {
        return {
            options: {

            }
        }
    },
    methods: {
        async getCatalog(root, parent) {
            const { data } = await list(root, parent);
            console.log(data);
            this.options[parent] = data
        }
    }
}