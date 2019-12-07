<template>
    <el-table
        ref="multipleTable"
        @selection-change="$emit('selection-change', $event)"
        height="58vh"
        :data="tableData"
        border
        v-loading="loading"
        style="width: 100%"
    >
        <el-table-column type="selection" width="55"></el-table-column>
        <el-table-column fixed width="200" label="Họ tên">
            <template slot-scope="scope">
                <router-link
                    tag="a"
                    class="link"
                    :to="`/customer/lead/show/${scope.row.id}`"
                >{{ scope.row.name }}</router-link>
            </template>
        </el-table-column>
        <el-table-column prop="email" width="250" label="Email"></el-table-column>
        <el-table-column prop="phone_number" width="120" label="Số điện thoại"></el-table-column>
        <el-table-column prop="owner" width="200" label="Chủ sở hữu"></el-table-column>
        <el-table-column prop="company" width="200" label="Công ty"></el-table-column>
        <el-table-column prop="office_address" width="200" label="Địa chỉ"></el-table-column>
        <el-table-column width="150" label="Ngày tạo">
            <template slot-scope="scope">{{ scope.row.created_at|datetime}}</template>
        </el-table-column>
        <el-table-column align="center" fixed="right" width="150" label="Hành động">
            <template slot-scope="scope">
                <el-button
                    type="primary"
                    @click="$router.push(`/customer/lead/edit/${scope.row.id}`)"
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