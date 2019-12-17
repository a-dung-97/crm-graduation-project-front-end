<template>
    <div>
        <el-table :data="tableData" v-loading="loading" style="width: 100%">
            <el-table-column align="center" type="index" width="50" label="STT"></el-table-column>
            <el-table-column label="Mã">
                <template slot-scope="scope">
                    <router-link
                        tag="a"
                        class="link"
                        :to="`/business/quote/show/${scope.row.id}`"
                    >{{ scope.row.code }}</router-link>
                </template>
            </el-table-column>
            <el-table-column prop="status" label="Trạng thái"></el-table-column>
            <el-table-column prop="owner" label="Chủ sở hữu"></el-table-column>
            <el-table-column label="Ngày báo giá">
                <template slot-scope="scope">{{ scope.row.order_date|date }}</template>
            </el-table-column>
        </el-table>
    </div>
</template>
<script>
export default {
    props: ["tableData", "loading"]
};
</script>
<style lang="">
</style>