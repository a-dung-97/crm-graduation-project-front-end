<template>
    <el-col :span="21">
        <el-input
            v-model="params.search"
            size="medium"
            placeholder="Nhập từ khóa"
            class="input-text"
            clearable
            @keyup.enter.native="$emit('handle-search')"
        ></el-input>
        <el-select
            v-model="params.type"
            placeholder="Loại"
            @change="getData(1,pagination.perPage)"
            clearable
            size="medium"
        >
            <el-option label="Hàng hóa" value="product"></el-option>
            <el-option label="Dịch vụ" value="service"></el-option>
        </el-select>
        <el-button
            type="primary"
            size="medium"
            @click="$emit('handle-search')"
            icon="el-icon-search"
            circle
        ></el-button>
    </el-col>
</template>
<script>
export default {
    props: ["params"]
};
</script>
<style lang="">
</style>