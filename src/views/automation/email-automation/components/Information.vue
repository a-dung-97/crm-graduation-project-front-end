<template>
    <el-card>
        <h3 class="title">
            Thông tin
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
                        <p class="my-label">Tên</p>
                    </el-col>
                    <el-col :span="14">
                        <p class="content">{{ data.name }}</p>
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
                        <p class="my-label">Danh sách email</p>
                    </el-col>
                    <el-col :span="14">
                        <p class="content">{{ data.mailing_list }}</p>
                    </el-col>
                </el-row>
            </el-col>
        </el-row>
        <Detail />
    </el-card>
</template>
<script>
import { show } from "@/api/automation/email-automation";
import Detail from "./detail/Detail";
export default {
    components: { Detail },
    data() {
        return {
            data: ""
        };
    },
    methods: {
        async getCampaign() {
            try {
                this.openFullScreen();
                const { data } = await show(this.$route.params.id);
                this.data = data;
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