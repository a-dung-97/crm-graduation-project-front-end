<template>
    <el-col :span="21">
        <el-input
            v-model="params.search"
            size="medium"
            placeholder="Nhập tên hoặc mô tả"
            class="input-text"
            clearable
            @keyup.enter.native="$emit('handle-search')"
        ></el-input>
        <!-- <el-select
            v-model="params.parent"
            placeholder="Phòng ban cha"
            @change="getData(1,pagination.per_page)"
            size="small"
        >
            <el-option
                v-for="year in 5"
                :key="year"
                :label="new Date().getFullYear()+1-year"
                :value="new Date().getFullYear()+1-year"
            ></el-option>
        </el-select>-->
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