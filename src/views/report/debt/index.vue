<template>
    <div class="app-container">
        <el-row class="mb-20">
            <el-date-picker
                v-model="params.orderDate"
                type="datetimerange"
                range-separator="-"
                start-placeholder="Từ ngày"
                size="medium"
                end-placeholder="Tới ngày"
                format="dd/MM/yyyy"
                value-format="yyyy-MM-dd"
            ></el-date-picker>
            <el-button
                size="medium"
                style="margin-left:10px"
                type="success"
                circle
                icon="el-icon-view"
                @click="getData"
            ></el-button>
            <el-button
                size="medium"
                @click="tableData=[];params.orderDate=null"
                type="primary"
                circle
                icon="el-icon-refresh"
            ></el-button>
        </el-row>
        <el-row>
            <el-table :data="tableData">
                <el-table-column label="Khách hàng" prop="name"></el-table-column>
                <el-table-column label="Chủ sở hữu" prop="owner"></el-table-column>
                <el-table-column label="Doanh thu" prop="total">
                    <template slot-scope="scope">{{ scope.row.total|money }}</template>
                </el-table-column>
                <el-table-column label="Đã thanh toán" prop="paid">
                    <template slot-scope="scope">{{ scope.row.paid|money }}</template>
                </el-table-column>
                <el-table-column label="% thanh toán" prop="rate"></el-table-column>
                <el-table-column label="Còn nợ" prop="owed">
                    <template slot-scope="scope">{{ scope.row.owed|money }}</template>
                </el-table-column>
            </el-table>
        </el-row>
    </div>
</template>
<script>
import { getDebt } from "@/api/report/report";
export default {
    data() {
        return {
            params: {
                orderDate: null
            },
            tableData: []
        };
    },
    methods: {
        async getData() {
            try {
                if (this.params.orderDate === null) {
                    this.$message.error("Bạn chưa nhập ngày");
                    return;
                }
                this.openFullScreen();
                const { data } = await getDebt(this.params);
                this.tableData = data;
                this.closeFullScreen();
            } catch (error) {}
        }
    }
};
</script>
<style lang="">
</style>