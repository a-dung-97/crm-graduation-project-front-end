<template>
    <div class="app-container">
        <el-tabs>
            <el-tab-pane label="Thông tin">
                <LeadDetail :is-show="true" />
            </el-tab-pane>
            <el-tab-pane label="Đính kèm">
                <File type="lead" />
            </el-tab-pane>
            <el-tab-pane label="Ghi chú">
                <Note type="lead" />
            </el-tab-pane>
        </el-tabs>
    </div>
</template>
<script>
import LeadDetail from "./components/LeadDetail";
import Note from "@/components/Note/index";
import File from "@/components/File/index";
export default {
    components: { LeadDetail, Note, File }
};
</script>
<style lang="">
</style>