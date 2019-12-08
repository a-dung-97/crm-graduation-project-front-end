<template>
    <el-card>
        <h3 class="title">
            Thông tin chiến dịch
            <el-button
                class="fr"
                @click="getCampaign"
                type="primary"
                size="small"
                icon="el-icon-refresh"
                circle
            ></el-button>
        </h3>
        <el-row>
            <el-col :span="12">
                <el-row class="item">
                    <el-col :span="10">
                        <p class="my-label">Tên chiến dịch</p>
                    </el-col>
                    <el-col :span="14">
                        <p class="content">{{ data.name }}</p>
                    </el-col>
                </el-row>
                <el-row class="item">
                    <el-col :span="10">
                        <p class="my-label">Tiêu đề</p>
                    </el-col>
                    <el-col :span="14">
                        <p class="content">{{ data.subject}}</p>
                    </el-col>
                </el-row>
                <el-row class="item">
                    <el-col :span="10">
                        <p class="my-label">Mô tả</p>
                    </el-col>
                    <el-col :span="14">
                        <p class="content">{{ data.description }}</p>
                    </el-col>
                </el-row>
                <el-row class="item">
                    <el-col :span="10">
                        <p class="my-label">Ngày tạo</p>
                    </el-col>
                    <el-col :span="14">
                        <p class="content">{{ data.created_at|date }}</p>
                    </el-col>
                </el-row>
                <el-row class="item">
                    <el-col :span="10">
                        <p class="my-label">Gửi từ tên</p>
                    </el-col>
                    <el-col :span="14">
                        <p class="content">{{ data.from_name }}</p>
                    </el-col>
                </el-row>
                <el-row class="item">
                    <el-col :span="10">
                        <p class="my-label">Gửi từ email</p>
                    </el-col>
                    <el-col :span="14">
                        <p class="content">{{ data.from_email }}</p>
                    </el-col>
                    <el-row class="item">
                        <el-col :span="10">
                            <p class="my-label">Tổng gửi</p>
                        </el-col>
                        <el-col :span="14">
                            <p class="content">
                                <span
                                    class="status-link"
                                    @click="mode='total'"
                                >{{ data.total_count }}</span>
                            </p>
                        </el-col>
                    </el-row>
                </el-row>
            </el-col>
            <el-col :span="12">
                <el-row class="item">
                    <el-col :span="10">
                        <p class="my-label">Thành công</p>
                    </el-col>
                    <el-col :span="14">
                        <p class="content">
                            <span
                                @click="mode='success'"
                                class="status-link"
                            >{{ data.success_count }}</span>
                            ({{ rate(data.success_count) }})
                        </p>
                    </el-col>
                </el-row>
                <el-row class="item">
                    <el-col :span="10">
                        <p class="my-label">Đã nhận</p>
                    </el-col>
                    <el-col :span="14">
                        <p class="content">
                            <span
                                @click="mode='delivered'"
                                class="status-link"
                            >{{ data.delivered_count }}</span>
                            ({{ rate(data.delivered_count) }})
                        </p>
                    </el-col>
                </el-row>
                <el-row class="item">
                    <el-col :span="10">
                        <p class="my-label">Click</p>
                    </el-col>
                    <el-col :span="14">
                        <p class="content">
                            <span
                                @click="mode='clicked'"
                                class="status-link"
                            >{{ data.clicked_count }}</span>
                            ({{ rate(data.clicked_count) }})
                        </p>
                    </el-col>
                </el-row>

                <el-row class="item">
                    <el-col :span="10">
                        <p class="my-label">Mở</p>
                    </el-col>
                    <el-col :span="14">
                        <p class="content">
                            <span @click="mode='opened'" class="status-link">{{ data.opened_count }}</span>
                            ({{ rate(data.opened_count) }})
                        </p>
                    </el-col>
                </el-row>
                <el-row class="item">
                    <el-col :span="10">
                        <p class="my-label">Trả lại</p>
                    </el-col>
                    <el-col :span="14">
                        <p class="content">
                            <span @click="mode='failed'" class="status-link">{{ data.failed_count }}</span>
                            ({{ rate(data.failed_count) }})
                        </p>
                    </el-col>
                </el-row>
                <el-row class="item">
                    <el-col :span="10">
                        <p class="my-label">Bỏ theo dõi</p>
                    </el-col>
                    <el-col :span="14">
                        <p class="content">
                            <span
                                @click="mode='unsubscribed'"
                                class="status-link"
                            >{{ data.unsubscribed_count }}</span>
                            ({{ rate(data.unsubscribed_count) }})
                        </p>
                    </el-col>
                </el-row>
                <el-row class="item">
                    <el-col :span="10">
                        <p class="my-label">Đánh dấu spam</p>
                    </el-col>
                    <el-col :span="14">
                        <p class="content">
                            <span
                                @click="mode='complained'"
                                class="status-link"
                            >{{ data.complained_count }}</span>
                            ({{ rate(data.complained_count) }})
                        </p>
                    </el-col>
                </el-row>
            </el-col>
        </el-row>

        <Detail :success="data.success_count>0" :mode="mode" />
    </el-card>
</template>
<script>
import { show } from "@/api/marketing/email-campaign";
import Detail from "./Detail";
export default {
    components: { Detail },
    data() {
        return {
            mode: "total",
            data: ""
        };
    },
    methods: {
        rate(val) {
            if (this.data != "")
                return ((val * 100) / this.data.total_count).toFixed(2) + "%";
        },
        async getCampaign() {
            try {
                this.openFullScreen();
                const { data } = await show(this.$route.params.id);
                this.data = data;
                this.mode = "total";
                this.closeFullScreen();
            } catch (error) {
                console.log(error);
                this.closeFullScreen();
            }
        }
    },
    created() {
        this.getCampaign();
    }
};
</script>
<style lang="scss" scoped>
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
    height: 32px;
}
.infomation {
    margin-top: 10px;
    font-size: 14px;
    color: #7f10c10d;
}
.infomation i {
    padding-right: 5px;
}
.status-link {
    color: #3498db;
    cursor: pointer;
    &:hover {
        color: #2980b9;
    }
}
</style>