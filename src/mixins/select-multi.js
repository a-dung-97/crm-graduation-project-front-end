export default {
    data() {
        return {
            selected: [],
            showMailingListDialog: false,
            isSelecting: true,
        }
    },
    methods: {
        handleSelectionChange(val) {
            this.isSelecting = !val.length > 0;
            this.selected = [
                ...val.filter(item => item.email).map(item => (
                    {
                        id: item.id,
                        name: item.name,
                        email: item.email
                    }
                ))
            ];
        }
    }
}