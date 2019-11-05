<template>
    <el-col :span="21">
        <el-input
            v-model="params.search"
            size="medium"
            placeholder="Nhập tên hoặc mã sản phẩm"
            class="input-text"
            clearable
            @keyup.enter.native="$emit('handle-search')"
        ></el-input>
        <el-select clearable v-model="params.warehouse" placeholder="Kho hàng" size="medium">
            <el-option
                v-for="item in warehouses"
                :key="item.id"
                :label="item.name"
                :value="item.id"
            ></el-option>
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
    props: ["params", "warehouses"]
};
</script>
<style lang="">
</style>