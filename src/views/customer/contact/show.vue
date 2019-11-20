<template>
    <div class="app-container">
        <el-tabs>
            <el-tab-pane label="Thông tin">
                <LeadDetail :is-show="true" />
            </el-tab-pane>
            <el-tab-pane :label="'Đính kèm '+(count.file>0?('('+count.file+')'):'')">
                <File @handle-load="handleLoad('file',$event)" type="customer" />
            </el-tab-pane>
            <el-tab-pane :label="'Ghi chú ' +(count.note>0?('('+count.note+')'):'')">
                <Note @handle-load="handleLoad('note',$event)" type="customer" />
            </el-tab-pane>
            <el-tab-pane :label="'Hoạt động '+(count.task>0?('('+count.task+')'):'')">
                <Task @handle-load="handleLoad('task',$event)" type="customer" />
            </el-tab-pane>
        </el-tabs>
    </div>
</template>
<script>
import count from "@/mixins/count";

import LeadDetail from "./components/LeadDetail";
import Note from "@/components/Note/index";
import File from "@/components/File/index";
import Task from "@/components/Task/index";
export default {
    components: { LeadDetail, Note, File, Task },
    mixins: [count]
};
</script>
<style lang="">
</style>