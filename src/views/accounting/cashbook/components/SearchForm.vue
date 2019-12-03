<template>
    <el-col :span="21">
        <el-input
            v-model="params.name"
            size="medium"
            placeholder="Nhập tên sổ quỹ"
            class="input-text"
            clearable
            @keyup.enter.native="$emit('handle-search')"
        ></el-input>
        <el-select
            v-model="params.type"
            size="medium"
            placeholder="Chọn loại"
            clearable
            @keyup.enter.native="$emit('handle-search')"
        >
            <el-option label="Tiền mặt" value="Tiền mặt"></el-option>
            <el-option label="Ngân hàng" value="Ngân hàng"></el-option>
        </el-select>
        <el-input
            v-model="params.description"
            size="medium"
            placeholder="Nhập mô tả"
            class="input-text"
            clearable
            @keyup.enter.native="$emit('handle-search')"
        ></el-input>
    </el-col>
</template>
<script>
export default {
    props: ["params"]
};
</script>
<style lang="">
</style>