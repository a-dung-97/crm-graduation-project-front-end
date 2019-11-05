<template>
    <div>
        <el-table :data="tableData" border v-loading="loading" style="width: 100%">
            <el-table-column type="index" width="50" label="STT"></el-table-column>
            <el-table-column prop="product_name" label="Tên hàng hóa"></el-table-column>
            <el-table-column prop="product_code" label="Mã hàng hóa"></el-table-column>
            <el-table-column prop="warehouse" label="Kho hàng"></el-table-column>
            <el-table-column prop="quantity" label="Số lượng"></el-table-column>
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