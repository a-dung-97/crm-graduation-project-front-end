import { list } from '@/api/setting/catalog';
import { index as getUsers } from '@/api/company/user';
import { index as getGroups } from '@/api/company/group';
export default {
    data() {
        return {
            catalogs: {

            },
            userOptions: [],
            groupOptions: [],
        }
    },
    methods: {
        async getCatalog(root, parent) {
            const { data } = await list(root, parent);
            console.log(data);
            this.catalogs[parent] = data
        },
        async getUsers() {
            try {
                const { data } = await getUsers();
                this.userOptions = data;
            } catch (error) {
                console.log(error);
            }
        },
        async getGroups() {
            try {
                const { data } = await getGroups();
                this.groupOptions = data;
            } catch (error) {
                console.log(error);
            }
        }
    }
}