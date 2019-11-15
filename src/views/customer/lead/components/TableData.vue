<template>
    <el-table :data="tableData" border v-loading="loading" style="width: 100%">
        <el-table-column align="center" type="index" width="50" label="STT"></el-table-column>
        <el-table-column width="300" label="Tên">
            <template slot-scope="scope">
                <router-link
                    tag="a"
                    class="link"
                    :to="`/goods/product/show/${scope.row.id}`"
                >{{ scope.row.name }}</router-link>
            </template>
        </el-table-column>
        <el-table-column prop="code" label="Mã"></el-table-column>
        <el-table-column prop="manufacturer" label="Nhà sản xuất"></el-table-column>
        <el-table-column width="100" label="Loại">
            <template slot-scope="scope">
                <el-tag
                    :type="scope.row.type === 'product' ? 'success' : 'primary'"
                    disable-transitions
                    size="small"
                >{{scope.row.type==='product'?'Hàng hóa':"Dịch vụ"}}</el-tag>
            </template>
        </el-table-column>
        <el-table-column prop="barcode" label="Mã vạch"></el-table-column>
        <el-table-column prop="brand" label="Nhãn hiệu"></el-table-column>
        <el-table-column width="120" label="Hình ảnh">
            <template slot-scope="scope">
                <el-avatar
                    :fit="'fill'"
                    v-if="scope.row.image"
                    :size="100"
                    :src="scope.row.image.path"
                ></el-avatar>
            </template>
        </el-table-column>
        <el-table-column align="center" width="150" label="Hành động">
            <template slot-scope="scope">
                <el-button
                    type="primary"
                    @click="$router.push(`/goods/product/edit/${scope.row.id}`)"
                    icon="el-icon-edit"
                    circle
                ></el-button>
                <el-button type="danger" icon="el-icon-delete" circle></el-button>
            </template>
        </el-table-column>
    </el-table>
</template>
<script>
export default {
    props: ["tableData", "loading"],
    methods: {}
};
</script>
<style lang="">
</style>