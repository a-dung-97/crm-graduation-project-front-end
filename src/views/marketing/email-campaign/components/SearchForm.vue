<template>
    <el-col :span="21">
        <el-input
            v-model="params.search"
            size="medium"
            placeholder="Nhập tên, tiêu đề hoặc mô tả"
            class="input-text"
            clearable
            @keyup.enter.native="$emit('handle-search')"
        ></el-input>
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