<template>
    <div class="app-container">
        <el-tabs>
            <el-tab-pane label="Thông tin">
                <ProductDetail :is-show="true" />
            </el-tab-pane>
            <el-tab-pane :label="'Đính kèm '+(count.file>0?('('+count.file+')'):'')">
                <File @handle-load="handleLoad('file',$event)" type="customer" />
            </el-tab-pane>
            <el-tab-pane :label="'Ghi chú ' +(count.note>0?('('+count.note+')'):'')">
                <Note @handle-load="handleLoad('note',$event)" type="customer" />
            </el-tab-pane>
        </el-tabs>
    </div>
</template>
<script>
import count from "@/mixins/count";
import ProductDetail from "./components/ProductDetail";
import Note from "@/components/Note/index";
import File from "@/components/File/index";
export default {
    components: { ProductDetail, Note, File },
    mixins: [count]
};
</script>
<style lang="">
</style>