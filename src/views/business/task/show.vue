<template>
    <div class="app-container">
        <el-row :gutter="20">
            <el-col :span="7">
                <el-card style="height:420px">
                    <el-tabs v-if="data" v-model="tab" stretch>
                        <el-tab-pane
                            v-if="data.taskable.type=='App\\Customer'"
                            label="Khách hàng"
                            name="customer"
                        ></el-tab-pane>
                        <el-tab-pane v-else label="Tiềm năng" name="lead">
                            <div class="infomation">
                                <i class="el-icon-user"></i>
                                <span>{{ data.taskable.detail.full_name }}</span>
                            </div>
                            <div class="infomation">
                                <i class="el-icon-phone-outline"></i>
                                <span>{{ data.taskable.detail.phone_number }}</span>
                            </div>
                            <div class="infomation">
                                <i class="el-icon-message"></i>
                                <span>{{ data.taskable.detail.email }}</span>
                            </div>
                        </el-tab-pane>
                        <!-- <el-tab-pane label="Liên hệ" name="contact"></el-tab-pane> -->
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
                            <h3 class="title" style="margin-top:10px">Thông tin công việc</h3>
                        </el-col>
                        <el-col :span="12">
                            <el-button
                                style="margin-left:10px"
                                class="fr"
                                v-if="!data.finish_date"
                                @click="finishTask"
                                type="primary"
                                size="small"
                            >Đóng công việc</el-button>
                            <el-button
                                class="fr"
                                v-if="!data.finish_date"
                                @click="$router.push(`/business/task/edit/${$route.params.id}`)"
                                type="primary"
                                size="small"
                            >Sửa</el-button>
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
                            <p class="my-label">Ngày bắt đầu</p>
                        </el-col>
                        <el-col :span="6">
                            <p class="content">{{ data.start_date|date }}</p>
                        </el-col>
                    </el-row>
                    <el-row class="item">
                        <el-col :span="6">
                            <p class="my-label">Ngày hết hạn</p>
                        </el-col>
                        <el-col :span="6">
                            <p class="content">{{ data.expiration_date|date }}</p>
                        </el-col>
                    </el-row>
                    <el-row class="item">
                        <el-col :span="6">
                            <p class="my-label">Ngày hoàn thành</p>
                        </el-col>
                        <el-col :span="6">
                            <p class="content">{{ data.finish_date|date }}</p>
                        </el-col>
                    </el-row>
                    <el-row class="item">
                        <el-col :span="6">
                            <p class="my-label">Độ ưu tiên</p>
                        </el-col>
                        <el-col :span="6">
                            <p class="content">{{ data.priority }}</p>
                        </el-col>
                    </el-row>
                    <el-row class="item">
                        <el-col :span="6">
                            <p class="my-label">Trạng thái</p>
                        </el-col>
                        <el-col :span="6">
                            <p class="content">{{ data.status }}</p>
                        </el-col>
                    </el-row>
                    <h3 class="title">Mô tả công việc</h3>
                    <el-row>
                        <el-col :span="24">
                            <p class="content">{{ data.description }}</p>
                        </el-col>
                    </el-row>
                    <h3 class="title">Nhắc nhở công việc</h3>
                    <template v-if="data.reminder&&data.reminder.time">
                        <el-row class="item">
                            <el-col :span="6">
                                <p class="my-label">Thời gian nhắc</p>
                            </el-col>
                            <el-col :span="6">
                                <p class="content">{{ data.reminder.time|datetime }}</p>
                            </el-col>
                        </el-row>
                        <el-row class="item">
                            <el-col :span="6">
                                <p class="my-label">Kiểu nhắc</p>
                            </el-col>
                            <el-col :span="6">
                                <p
                                    class="content"
                                >{{ data.reminder.type=="1"?'Email':(data.reminder.type=="2"?'Thông báo':'Email, Thông báo') }}</p>
                            </el-col>
                        </el-row>
                    </template>
                </el-card>
            </el-col>
        </el-row>
    </div>
</template>
<script>
import { show, finishTask } from "@/api/business/task";
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
                if (data.taskable.type == "App\\Lead") this.tab = "lead";
                else this.tab = "customer";
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