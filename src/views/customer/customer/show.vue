<template>
    <div class="app-container">
        <el-tabs>
            <el-tab-pane label="Thông tin">
                <Infomation @loaded="user=$event" />
            </el-tab-pane>
            <el-tab-pane :label="'Liên hệ '+(count.contact>0?('('+count.contact+')'):'')">
                <Contact :user="user" @handle-load="handleLoad('contact',$event)" />
            </el-tab-pane>
            <el-tab-pane :label="'Đính kèm '+(count.file>0?('('+count.file+')'):'')">
                <File @handle-load="handleLoad('file',$event)" type="customer" />
            </el-tab-pane>
            <el-tab-pane :label="'Ghi chú ' +(count.note>0?('('+count.note+')'):'')">
                <Note @handle-load="handleLoad('note',$event)" type="customer" />
            </el-tab-pane>
            <el-tab-pane :label="'Hoạt động'">
                <el-tabs value="1" tab-position="left" style="height: 100%;">
                    <el-tab-pane :label="'Công việc '+(count.task>0?('('+count.task+')'):'(0)')">
                        <Task @handle-load="handleLoad('task',$event)" type="customer" />
                    </el-tab-pane>
                    <el-tab-pane :label="'Cuộc gọi '+(count.call>0?('('+count.call+')'):'(0)')">
                        <Call
                            :customer="user"
                            @handle-load="handleLoad('call',$event)"
                            type="customer"
                        />
                    </el-tab-pane>
                    <el-tab-pane
                        :label="'Cuộc hẹn '+(count.appointment>0?('('+count.appointment+')'):'(0)')"
                    >
                        <Appointment
                            @handle-load="handleLoad('appointment',$event)"
                            type="customer"
                        />
                    </el-tab-pane>
                </el-tabs>
            </el-tab-pane>
            <el-tab-pane :label="'Email '+(count.email>0?('('+count.email+')'):'')">
                <Email @handle-load="handleLoad('email',$event)" type="customer" />
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
import Email from "@/components/Email/index";
import Appointment from "@/components/Appointment/index";

import Task from "@/components/Task/index";
import Call from "@/components/Call/index";
import Opportunity from "@/components/Opportunity/index";
import Quote from "@/components/Quote/index";
import Order from "@/components/Order/index";
import Contact from "@/components/Contact/index";
export default {
    components: {
        CustomerDetail,
        Note,
        File,
        Task,
        Infomation,
        Opportunity,
        Quote,
        Order,
        Email,
        Contact,
        Call,
        Appointment
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