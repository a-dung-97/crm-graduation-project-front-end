<template>
    <div class="app-container">
        <el-tabs>
            <el-tab-pane label="Thông tin">
                <ProductDetail :is-show="true" />
            </el-tab-pane>
            <el-tab-pane label="Đính kèm">
                <File type="product" />
            </el-tab-pane>
            <el-tab-pane label="Ghi chú">
                <Note type="product" />
            </el-tab-pane>
        </el-tabs>
    </div>
</template>
<script>
import ProductDetail from "./components/ProductDetail";
import Note from "@/components/Note/index";
import File from "@/components/File/index";
export default {
    components: { ProductDetail, Note, File }
};
</script>
<style lang="">
</style>