<template>
    <!-- <el-row class="mb-20">
            <el-col :span="24">
                <el-button
                    class="fr"
                    @click="showDialogForm('create')"
                    size="medium"
                    type="primary"
                >Thêm ghi chú</el-button>
            </el-col>
    </el-row>-->

    <el-row>
        <h3 class="title">
            Danh sách phiếu thanh toán
            <el-button
                class="fr"
                @click="showDialogForm('create')"
                type="primary"
                size="small"
                icon="el-icon-plus"
                circle
            ></el-button>
        </h3>
        <TableData
            :form="form"
            :table-data="tableData"
            @handle-edit="showDialogForm('edit',$event)"
            @handle-delete="getData()"
            @handle-verify="getData"
            :loading.sync="loading"
        ></TableData>
        <DialogForm
            @reload="getData()"
            :show-dialog.sync="showDialog"
            :editing="editing"
            :cashbooks="cashbooks"
            :form="form"
        />
    </el-row>
</template>
<script>
import { index as getBills } from "@/api/accounting/bill";
import { index as getCashbooks } from "@/api/accounting/cashbook";
import TableData from "./components/TableData";
import DialogForm from "./components/DialogForm";
export default {
    components: { TableData, DialogForm },
    data() {
        return {
            tableData: [],
            loading: false,
            getDataFunc: "",
            pagination: {},
            showDialog: false,
            editing: false,
            cashbooks: [],
            form: {
                id: "",
                name: "",
                payment_method: "",
                payment_amount: "",
                note: "",
                cashbook_id: "",
                status: ""
            }
        };
    },
    methods: {
        async getData() {
            try {
                this.loading = true;
                const [bills, cashbooks] = await Promise.all([
                    getBills({ invoice: this.$route.params.id }),
                    getCashbooks({ list: true })
                ]);
                this.tableData = bills.data;
                this.cashbooks = cashbooks.data;
                this.loading = false;
            } catch (error) {
                this.loading = false;
            }
        },
        showDialogForm(mode, row) {
            if (mode == "edit") {
                for (let field in this.form) this.form[field] = row[field];
                this.editing = true;
            } else {
                for (let field in this.form) this.form[field] = "";
                this.editing = false;
            }
            this.showDialog = true;
        }
    },
    created() {
        this.getData();
    }
};
</script>
<style lang="scss" scoped>
.title {
    margin-bottom: 10px;
    height: 32px;
}
</style>