<template>
    <div>
        <el-table height="65vh" :data="tableData" border v-loading="loading" style="width: 100%">
            <el-table-column align="center" type="index" width="50" label="STT"></el-table-column>
            <el-table-column label="Tên">
                <template slot-scope="scope">
                    <router-link
                        tag="a"
                        class="link"
                        :to="`/business/opportunity/show/${scope.row.id}`"
                    >{{ scope.row.name }}</router-link>
                </template>
            </el-table-column>
            <el-table-column prop="source" label="Nguồn"></el-table-column>
            <el-table-column prop="owner" label="Chủ sở hữu"></el-table-column>
            <el-table-column label="Ngày kết thúc">
                <template slot-scope="scope">{{ scope.row.end_date|date }}</template>
            </el-table-column>
            <el-table-column label="Ngày tạo">
                <template slot-scope="scope">{{ scope.row.created_at|date }}</template>
            </el-table-column>
        </el-table>
    </div>
</template>
<script>
import { destroy } from "@/api/business/opportunity";
export default {
    props: ["tableData", "loading"]
};
</script>
<style lang="">
</style>