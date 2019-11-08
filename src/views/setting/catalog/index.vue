<template>
    <div
        class="app-container"
        v-loading.fullscreen.lock="loading"
        element-loading-text="Xin vui lòng chờ"
        element-loading-background="rgba(0, 0, 0, 0.8)"
    >
        <el-tabs tab-position="left" style="max-height: calc(100vh - 50px);">
            <el-tab-pane label="Liên hệ">
                <TableData
                    :form="form"
                    v-if="tableData.length>0"
                    :table-data="catalog['Liên hệ']"
                    @handle-edit="showDialogForm('edit')"
                    @handle-create="showDialogForm('create',$event)"
                    @handle-delete="getData()"
                    :loading.sync="loading"
                ></TableData>
            </el-tab-pane>
            <el-tab-pane label="Cơ hội">
                <TableData
                    :form="form"
                    v-if="tableData.length>0"
                    :table-data="catalog['Cơ hội']"
                    @handle-edit="showDialogForm('edit')"
                    @handle-create="showDialogForm('create',$event)"
                    @handle-delete="getData()"
                    :loading.sync="loading"
                ></TableData>
            </el-tab-pane>
            <el-tab-pane label="Hóa đơn">
                <TableData
                    :form="form"
                    v-if="tableData.length>0"
                    :table-data="catalog['Hóa đơn']"
                    @handle-edit="showDialogForm('edit')"
                    @handle-create="showDialogForm('create',$event)"
                    @handle-delete="getData()"
                    :loading.sync="loading"
                ></TableData>
            </el-tab-pane>
            <el-tab-pane label="Tiềm năng">
                <TableData
                    :form="form"
                    v-if="tableData.length>0"
                    :table-data="catalog['Tiềm năng']"
                    @handle-edit="showDialogForm('edit')"
                    @handle-create="showDialogForm('create',$event)"
                    @handle-delete="getData()"
                    :loading.sync="loading"
                ></TableData>
            </el-tab-pane>
            <el-tab-pane label="Đơn hàng">
                <TableData
                    :form="form"
                    v-if="tableData.length>0"
                    :table-data="catalog['Đơn hàng']"
                    @handle-edit="showDialogForm('edit')"
                    @handle-create="showDialogForm('create',$event)"
                    @handle-delete="getData()"
                    :loading.sync="loading"
                ></TableData>
            </el-tab-pane>
            <el-tab-pane label="Báo giá">
                <TableData
                    :form="form"
                    v-if="tableData.length>0"
                    :table-data="catalog['Báo giá']"
                    @handle-edit="showDialogForm('edit')"
                    @handle-delete="getData()"
                    @handle-create="showDialogForm('create',$event)"
                    :loading.sync="loading"
                ></TableData>
            </el-tab-pane>
        </el-tabs>
        <DialogForm
            @reload="getData"
            :show-dialog.sync="showDialog"
            :editing="editing"
            :form="form"
        />
    </div>
</template>
<script>
import { index } from "@/api/setting/catalog";
import TableData from "./components/TableData";
import DialogForm from "./components/DialogForm";

export default {
    components: { TableData, DialogForm },
    data() {
        return {
            tableData: [],
            loading: false,
            catalog: {
                "Liên hệ": [],
                "Cơ hội": [],
                "Hóa đơn": [],
                "Tiềm năng": [],
                "Đơn hàng": [],
                "Báo giá": []
            },
            showDialog: false,
            editing: false,
            form: {
                name: "",
                description: "",
                parent_id: ""
            }
        };
    },
    methods: {
        async getData() {
            try {
                this.loading = true;
                let request = await index();
                this.tableData = request.data;
                this.loading = false;
                // console.log(
                //     this.tableData.find(item => item.name == "Liên hệ").children
                // );
                for (let obj in this.catalog) {
                    this.catalog[obj] = this.tableData.find(
                        item => item.name == obj
                    ).children;
                }
                console.log(this.catalog);
            } catch (error) {}
        },
        showDialogForm(mode, id = null) {
            if (mode == "edit") this.editing = true;
            else {
                for (let field in this.form) this.form[field] = "";
                this.form.parent_id = id;
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
<style lang="scss">
.control {
    margin-bottom: 20px;
}
</style>