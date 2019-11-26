<template>
    <div class="app-container">
        <el-card>
            <div style="height:32px" slot="header">
                Tạo quy tắc chấm điểm để định lượng khách hàng tiềm năng dựa trên các thông tin
                <el-button
                    class="fr"
                    @click="showDialogForm('create')"
                    size="small"
                    type="primary"
                >Thêm quy tắc</el-button>
            </div>

            <el-row>
                <el-col :span="24">
                    <TableData
                        :form="form"
                        :table-data="tableData"
                        @handle-edit="showDialogForm('edit')"
                        @handle-delete="getData()"
                        :loading.sync="loading"
                        :options="catalogs"
                    ></TableData>
                </el-col>
            </el-row>
            <h5
                style="margin-bottom:0"
            >* Điểm tiềm năng sẽ được cập nhật tự động khi thêm, xóa, sửa 1 quy tắc hoặc khi thêm hay sửa tiềm năng</h5>
        </el-card>

        <DialogForm
            @reload="getData()"
            :show-dialog.sync="showDialog"
            :editing="editing"
            :form="form"
            :options="catalogs"
        />
    </div>
</template>
<script>
import { index } from "@/api/setting/lead-score-rule";
import TableData from "./components/TableData";
import DialogForm from "./components/DialogForm";
export default {
    components: { TableData, DialogForm },
    data() {
        return {
            tableData: [],
            loading: false,
            pagination: {},
            showDialog: false,
            editing: false,
            form: {
                field: "",
                condition: "",
                value: "",
                score: "",
                action: true
            },
            catalogs: {
                Nguồn: [],
                "Ngành nghề": []
            }
        };
    },
    methods: {
        async getData() {
            try {
                this.loading = true;
                let request = await index(this.params);
                this.tableData = request.data;
                this.pagination = request.meta;
                this.loading = false;
            } catch (error) {}
        },
        showDialogForm(mode) {
            if (mode == "edit") this.editing = true;
            else {
                for (let field in this.form) this.form[field] = "";
                this.form.action = true;

                this.editing = false;
            }
            this.showDialog = true;
        }
    },
    created() {
        Promise.all([
            this.getCatalog("Tiềm năng", "Nguồn"),
            this.getCatalog("Tiềm năng", "Ngành nghề"),
            this.getData()
        ]);
    }
};
</script>
<style lang="scss">
</style>