<template>
    <div class="app-container">
        <el-row>
            <h3 v-if="report" style="height:32px;line-height:32px">
                {{ title }} từ ngày {{ report.filter.value[0]|date }} đến ngày {{ report.filter.value[1]|date }}
                <el-button type="primary" size="small" @click="showDialog= true" class="fr">Sửa</el-button>
            </h3>
        </el-row>
        <el-row>
            <el-table :data="tableData">
                <el-table-column
                    v-for="item in report.column"
                    :key="item"
                    :prop="item"
                    :label="options.find(val=>val.value==item).label"
                ></el-table-column>
            </el-table>
        </el-row>
        <DialogForm
            @reload="getData()"
            :show-dialog.sync="showDialog"
            :isEdit="true"
            :data="report"
        />
    </div>
</template>
<script>
import { show } from "@/api/report/dynamic";
import options from "./components/data";
import DialogForm from "./components/DialogForm";
export default {
    components: { DialogForm },
    data() {
        return {
            showDialog: false,
            tableData: [],
            report: "",
            title: "",
            options: ""
        };
    },
    methods: {
        async getData() {
            try {
                this.openFullScreen();
                let request = await show(this.$route.params.id);
                this.tableData = request.data;
                this.report = request.report;
                this.title = this.getTitle(this.report);
                if (this.report.module == "customer")
                    this.options = options.customer
                        .concat(options.order)
                        .concat(options.quote);
                else if (this.report.module == "task")
                    this.options = options.task.concat(options.user);
                else if (this.report.module == "opportunity")
                    this.options = options.opportunity.concat(options.customer);
                console.log(this.options);
                this.closeFullScreen();
            } catch (error) {}
        },
        getTitle() {
            switch (this.report.module) {
                case "customer":
                    if (this.report.filter.column == "created_at")
                        return "Ngày tạo khách hàng";
                    else return "Ngày đặt hàng";
                    break;
                case "task":
                    return "Ngày bắt đầu";
                    break;
                case "opportunity":
                    if (this.report.filter.column == "created_at")
                        return "Ngày tạo khách hàng";
                    else return "Ngày kết thúc";
                    break;

                default:
                    break;
            }
        }
    },
    created() {
        this.getData();
    }
};
</script>