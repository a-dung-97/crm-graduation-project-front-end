<template>
    <div class="app-container">
        <el-row :gutter="20">
            <el-col :span="7">
                <el-card style="height:420px">
                    <el-tabs v-if="data" v-model="tab" stretch>
                        <el-tab-pane v-if="data.customer" label="Khách hàng" name="customer">
                            <div class="infomation">
                                <i class="el-icon-user"></i>
                                <span>{{ data.customer.name }}</span>
                            </div>
                            <div class="infomation">
                                <i class="el-icon-phone-outline"></i>
                                <span>{{ data.customer.phone_number }}</span>
                            </div>
                            <div class="infomation">
                                <i class="el-icon-mobile-phone"></i>
                                <span>{{ data.customer.mobile_number }}</span>
                            </div>
                            <div class="infomation">
                                <i class="el-icon-message"></i>
                                <span>{{ data.customer.email }}</span>
                            </div>
                        </el-tab-pane>
                        <el-tab-pane
                            v-if="data.callable"
                            :label="data.callable.type=='App\\Lead'?'Tiềm năng':'Liên hệ'"
                            name="callable"
                        >
                            <div class="infomation">
                                <i class="el-icon-user"></i>
                                <span>{{ data.callable.detail.name }}</span>
                            </div>
                            <div class="infomation">
                                <i class="el-icon-phone-outline"></i>
                                <span>{{ data.callable.detail.phone_number }}</span>
                            </div>
                            <div class="infomation">
                                <i class="el-icon-mobile-phone"></i>
                                <span>{{ data.callable.detail.mobile_number }}</span>
                            </div>
                            <div class="infomation">
                                <i class="el-icon-message"></i>
                                <span>{{ data.callable.detail.email }}</span>
                            </div>
                        </el-tab-pane>
                        <el-tab-pane label="Mốc thời gian" name="timeline">
                            <el-timeline style="padding-left:0">
                                <el-timeline-item
                                    :timestamp="data.timeline.created_at|datetime"
                                    placement="top"
                                >
                                    <el-card>
                                        <h4>Tạo bởi</h4>
                                        <p>{{ data.timeline.created_by }}</p>
                                    </el-card>
                                </el-timeline-item>
                                <el-timeline-item
                                    v-if="data.timeline.updated_by"
                                    :timestamp="data.timeline.updated_at|datetime"
                                    placement="top"
                                >
                                    <el-card>
                                        <h4>Chỉnh sửa lần cuối bởi</h4>
                                        <p>{{ data.timeline.updated_by }}</p>
                                    </el-card>
                                </el-timeline-item>
                            </el-timeline>
                        </el-tab-pane>
                    </el-tabs>
                </el-card>
            </el-col>
            <el-col :span="17">
                <el-card>
                    <el-row>
                        <el-col :span="12">
                            <h3 class="title" style="margin-top:10px">Thông tin cuộc gọi</h3>
                        </el-col>
                    </el-row>

                    <el-row class="item">
                        <el-col :span="6">
                            <p class="my-label">Tiêu đề</p>
                        </el-col>
                        <el-col :span="6">
                            <p class="content">{{ data.title }}</p>
                        </el-col>
                    </el-row>
                    <el-row class="item">
                        <el-col :span="6">
                            <p class="my-label">Chủ sở hữu</p>
                        </el-col>
                        <el-col :span="6">
                            <p class="content">{{ data.user }}</p>
                        </el-col>
                    </el-row>
                    <el-row class="item">
                        <el-col :span="6">
                            <p class="my-label">Loại cuộc gọi</p>
                        </el-col>
                        <el-col :span="6">
                            <p class="content">{{ data.type }}</p>
                        </el-col>
                    </el-row>
                    <el-row class="item">
                        <el-col :span="6">
                            <p class="my-label">Mục tiêu</p>
                        </el-col>
                        <el-col :span="6">
                            <p class="content">{{ data.target }}</p>
                        </el-col>
                    </el-row>
                    <el-row class="item">
                        <el-col :span="6">
                            <p class="my-label">Thời gian gọi</p>
                        </el-col>
                        <el-col :span="6">
                            <p class="content">{{ data.time|datetime }}</p>
                        </el-col>
                    </el-row>
                    <el-row class="item">
                        <el-col :span="6">
                            <p class="my-label">Thời lượng(s)</p>
                        </el-col>
                        <el-col :span="6">
                            <p class="content">{{ data.duration }}</p>
                        </el-col>
                    </el-row>
                    <el-row class="item">
                        <el-col :span="6">
                            <p class="my-label">Kết quả</p>
                        </el-col>
                        <el-col :span="6">
                            <p class="content">{{ data.result }}</p>
                        </el-col>
                    </el-row>
                    <h3 class="title">Mô tả cuộc gọi</h3>
                    <el-row>
                        <el-col :span="24">
                            <p class="content">{{ data.description }}</p>
                        </el-col>
                    </el-row>
                </el-card>
            </el-col>
        </el-row>
    </div>
</template>
<script>
import { show } from "@/api/business/call";
export default {
    data() {
        return {
            data: "",
            tab: ""
        };
    },
    methods: {
        async getTask() {
            try {
                this.openFullScreen();
                const { data } = await show(this.$route.params.id);
                this.data = data;
                this.tab = data.callable ? "callable" : "timeline";
                this.closeFullScreen();
            } catch (error) {
                this.closeFullScreen();
                console.log(error);
            }
        },
        async finishTask() {
            try {
                await this.$confirm("Bạn có muốn đóng công việc này?");
                this.openFullScreen();
                await finishTask(this.$route.params.id);
                await this.getTask();
                this.closeFullScreen();
                this.$message.success("Đóng công việc thành công");
            } catch (error) {
                this.closeFullScreen();
                console.log(error);
            }
        }
    },
    created() {
        this.getTask();
    }
};
</script>
<style lang="css" scoped>
.my-label {
    color: gray;
}
.content,
.my-label {
    margin-top: 13px;
    margin-bottom: 13px;
}
.item {
    border-bottom: 1px solid #ecf0f1;
}
.title {
    margin-bottom: 10px;
}
.infomation {
    margin-top: 10px;
    font-size: 14px;
    color: #7f8c8d;
}
.infomation i {
    padding-right: 5px;
}
.infomation span {
}
</style>