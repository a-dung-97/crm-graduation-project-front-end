<template>
    <el-table height="62vh" :data="tableData" border v-loading="loading" style="width: 100%">
        <el-table-column prop="title" width="250" label="Tiêu đề"></el-table-column>
        <el-table-column prop="content" label="Nội dung"></el-table-column>
        <el-table-column prop="type" width="120" label="Loại"></el-table-column>
        <el-table-column width="200" label="Đối tượng">
            <template slot-scope="scope">
                <router-link
                    tag="a"
                    class="link"
                    :to="`${convertType(scope.row.type)}${scope.row.id}`"
                >{{ scope.row.noteable.name }}</router-link>
            </template>
        </el-table-column>
        <el-table-column width="150" label="Ngày tạo">
            <template slot-scope="scope">{{ scope.row.created_at|datetime }}</template>
        </el-table-column>
        <el-table-column prop="user" width="200" label="Người tạo"></el-table-column>
    </el-table>
</template>
<script>
export default {
    props: ["tableData", "loading"],
    methods: {
        convertType(val) {
            switch (val) {
                case "Tiềm năng":
                    return "/customer/lead/show/";
                    break;
                case "Liên hệ":
                    return "/customer/contact/show/";
                    break;
                case "Khách hàng":
                    return "/customer/customer/show/";
                    break;
                case "Sản phẩm":
                    return "/goods/product/show/";
                    break;
                case "Cơ hội":
                    return "/business/opportunity/show/";
                    break;
                default:
                    break;
            }
        }
    }
};
</script>
<style lang="">
</style>