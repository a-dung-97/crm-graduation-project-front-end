<template>
    <div class="block" style="margin-top:20px">
        <el-pagination
            background
            @size-change="$emit('size-change',$event)"
            @current-change="$emit('current-change',$event)"
            :current-page.sync="pagination.current_page"
            :page-size="5"
            :page-sizes="[5, 10, 15, 20]"
            layout="total, sizes, prev, pager, next"
            :total="pagination.total"
        ></el-pagination>
    </div>
</template>
<script>
export default {
    props: ["pagination"]
};
</script>
<style lang="">
</style>