<template>
    <el-card style="height:434px">
        <div slot="header" style="height:32px;line-height:32px">
            <span>Top 10 tiềm năng mới nhất</span>
        </div>
        <el-table height="300px" :data="tableData" v-loading="loading">
            <el-table-column label="STT" type="index" width="50" align="center"></el-table-column>
            <el-table-column width="200" label="Họ tên">
                <template slot-scope="scope">
                    <router-link
                        tag="a"
                        class="link"
                        :to="`/customer/lead/show/${scope.row.id}`"
                    >{{ scope.row.name }}</router-link>
                </template>
            </el-table-column>
            <el-table-column prop="company" width="200" label="Công ty"></el-table-column>
            <el-table-column prop="email" width="250" label="Email"></el-table-column>
            <el-table-column prop="phone_number" width="120" label="Số điện thoại"></el-table-column>
            <el-table-column prop="owner" width="200" label="Chủ sở hữu"></el-table-column>
        </el-table>
    </el-card>
</template>
<script>
import { getLeadReport } from "@/api/report/report";
export default {
    data() {
        return {
            loading: false,
            tableData: []
        };
    },
    methods: {
        async getData() {
            try {
                this.loading = true;
                const { data, meta } = await getLeadReport();
                this.tableData = data;
                this.loading = false;
            } catch (error) {
                this.loading = false;
            }
        }
    },
    created() {
        this.getData();
    }
};
</script>
<style lang="">
</style>