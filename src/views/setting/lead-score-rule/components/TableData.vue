<template>
    <div>
        <el-table height="68vh" :data="tableData" v-loading="loading" style="width: 100%">
            <el-table-column type="index" width="50" label="STT"></el-table-column>
            <el-table-column label="Trường tiềm năng">
                <template slot-scope="scope">
                    <span style="color:#2980b9">{{ scope.row.field }}</span>
                    <span>{{ scope.row.condition|condition(scope.row.field) }}</span>
                    <span style="color:#2980b9">{{ scope.row.value|value(scope.row.field,options)}}</span>
                </template>
            </el-table-column>
            <el-table-column label="Quy tắc">
                <template slot-scope="scope">
                    <span>{{ scope.row.action?'Cộng':'Trừ' }}</span>
                    <span>{{ scope.row.score}} điểm</span>
                </template>
            </el-table-column>
            <el-table-column label="Ngày áp dụng">
                <template slot-scope="scope">{{ scope.row.created_at|date }}</template>
            </el-table-column>
            <el-table-column align="center" width="200" label="Hành động">
                <template slot-scope="scope">
                    <el-button
                        size="medium"
                        icon="el-icon-edit"
                        circle
                        type="success"
                        @click="handleEdit(scope.row)"
                    ></el-button>
                    <el-button
                        @click="handleDelete(scope.row.id)"
                        size="medium"
                        type="danger"
                        icon="el-icon-delete"
                        circle
                    ></el-button>
                </template>
            </el-table-column>
        </el-table>
    </div>
</template>
<script>
import { destroy } from "@/api/setting/lead-score-rule";
export default {
    props: ["tableData", "loading", "form", "options"],
    filters: {
        value(val, field, options) {
            if (val != null) {
                if (field == "Nguồn") {
                    if (options["Nguồn"].find(item => item.id == val))
                        return options["Nguồn"].find(item => item.id == val)
                            .name;
                } else if (field == "Ngành nghề") {
                    if (options["Ngành nghề"].find(item => item.id == val))
                        return options["Ngành nghề"].find(
                            item => item.id == val
                        ).name;
                } else if (field == "Doanh thu")
                    return (
                        val
                            .toString()
                            .replace(/(\d)(?=(\d{3})+(?!\d))/g, "$1.") + " đ"
                    );
                else return val;
            } else return "";
        },
        condition(val, field) {
            if (field == "Nguồn" || field == "Ngành nghề")
                return val == "=" ? "là" : val == "!=" ? "không là" : val;
            else return val;
        }
    },
    methods: {
        handleEdit(row) {
            this.form.id = row.id;
            this.form.field = row.field;
            this.form.condition = row.condition;
            this.form.value = Number(row.value);
            this.form.action = row.action;
            this.form.score = row.score;
            setTimeout(() => {
                this.$emit("handle-edit");
            }, 0);
        },
        async handleDelete(id) {
            await this.$confirm("Bạn có chắc chắn muốn xóa?", "Cảnh báo", {
                confirmButtonText: "Xóa",
                cancelButtonText: "Hủy",
                type: "warning"
            });
            this.openFullScreen();
            await destroy(id);
            this.$message.success("Xóa dữ liệu thành công");
            this.$emit("handle-delete");
            this.closeFullScreen();
        }
    }
};
</script>
<style lang="">
</style>