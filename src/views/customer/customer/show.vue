<template>
    <div class="app-container">
        <el-tabs>
            <el-tab-pane label="Thông tin">
                <Infomation @loaded="user=$event" />
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
            <el-tab-pane :label="'Cơ hội '+(count.opportunity>0?('('+count.opportunity+')'):'')">
                <Opportunity :user="user" @handle-load="handleLoad('opportunity',$event)" />
            </el-tab-pane>
            <el-tab-pane :label="'Báo giá '+(count.quote>0?('('+count.quote+')'):'')">
                <Quote :user="user" @handle-load="handleLoad('quote',$event)" />
            </el-tab-pane>
            <el-tab-pane :label="'Đơn hàng '+(count.order>0?('('+count.order+')'):'')">
                <Order :user="user" @handle-load="handleLoad('order',$event)" />
            </el-tab-pane>
        </el-tabs>
    </div>
</template>
<script>
import count from "@/mixins/count";
import CustomerDetail from "./components/CustomerDetail";
import Infomation from "./components/Infomation";
import Note from "@/components/Note/index";
import File from "@/components/File/index";
import Task from "@/components/Task/index";
import Opportunity from "@/components/Opportunity/index";
import Quote from "@/components/Quote/index";
import Order from "@/components/Order/index";
export default {
    components: {
        CustomerDetail,
        Note,
        File,
        Task,
        Infomation,
        Opportunity,
        Quote,
        Order
    },
    data() {
        return {
            user: {}
        };
    },
    mixins: [count]
};
</script>
<style lang="">
</style>