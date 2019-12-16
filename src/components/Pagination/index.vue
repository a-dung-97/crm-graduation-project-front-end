<template>
    <div class="block" style="margin-top:30px;text-align:center">
        <el-pagination
            style="text-al"
            background
            @size-change="$emit('size-change',$event)"
            @current-change="$emit('current-change',$event)"
            :current-page.sync="pagination.current_page"
            :page-size="Number(pagination.per_page)"
            :page-sizes="[10, 25, 50, 100]"
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