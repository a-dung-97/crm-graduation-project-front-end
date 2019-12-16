<template>
    <div class="app-container">
        <el-tabs value="3">
            <el-tab-pane label="Thông tin">
                <Infomation @loaded="name=$event" />
            </el-tab-pane>
            <el-tab-pane :label="'Đính kèm '+(count.file>0?('('+count.file+')'):'')">
                <File @handle-load="handleLoad('file',$event)" type="lead" />
            </el-tab-pane>
            <el-tab-pane :label="'Ghi chú ' +(count.note>0?('('+count.note+')'):'')">
                <Note @handle-load="handleLoad('note',$event)" type="lead" />
            </el-tab-pane>
            <el-tab-pane label="Hoạt động">
                <el-tabs value="2" tab-position="left" style="height: 100%;">
                    <el-tab-pane :label="'Công việc '+(count.task>0?('('+count.task+')'):'(0)')">
                        <Task @handle-load="handleLoad('task',$event)" type="lead" />
                    </el-tab-pane>
                    <el-tab-pane :label="'Cuộc gọi '+(count.call>0?('('+count.call+')'):'(0)')">
                        <Call :lead="name" @handle-load="handleLoad('call',$event)" type="lead" />
                    </el-tab-pane>
                    <el-tab-pane
                        :label="'Cuộc hẹn '+(count.appointment>0?('('+count.appointment+')'):'(0)')"
                    >
                        <Appointment @handle-load="handleLoad('appointment',$event)" type="lead" />
                    </el-tab-pane>
                </el-tabs>
            </el-tab-pane>
            <el-tab-pane :label="'Email '+(count.email>0?('('+count.email+')'):'')">
                <Email @handle-load="handleLoad('email',$event)" type="lead" />
            </el-tab-pane>
        </el-tabs>
    </div>
</template>
<script>
import count from "@/mixins/count";

import LeadDetail from "./components/LeadDetail";
import Infomation from "./components/Infomation";
import Note from "@/components/Note/index";
import File from "@/components/File/index";
import Task from "@/components/Task/index";
import Call from "@/components/Call/index";
import Email from "@/components/Email/index";
import Appointment from "@/components/Appointment/index";
export default {
    components: {
        LeadDetail,
        Note,
        File,
        Task,
        Infomation,
        Email,
        Call,
        Appointment
    },
    mixins: [count],
    data() {
        return {
            name: ""
        };
    }
};
</script>
<style lang="">
</style>