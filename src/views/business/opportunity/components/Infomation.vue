<template>
    <el-card>
        <el-row>
            <el-col :span="24">
                <el-button
                    class="fr"
                    @click="$router.push(`/business/opportunity/edit/${$route.params.id}`)"
                    type="primary"
                    size="small"
                >Sửa</el-button>
            </el-col>
        </el-row>
        <h3 class="title">Thông tin cơ hội</h3>
        <el-row>
            <el-col :span="12">
                <el-row class="item">
                    <el-col :span="10">
                        <p class="my-label">Chủ sở hữu</p>
                    </el-col>
                    <el-col :span="14">
                        <p class="content">{{ data.owner }}</p>
                    </el-col>
                </el-row>
                <el-row class="item">
                    <el-col :span="10">
                        <p class="my-label">Tên</p>
                    </el-col>
                    <el-col :span="14">
                        <p class="content">{{ data.name}}</p>
                    </el-col>
                </el-row>
                <el-row class="item">
                    <el-col :span="10">
                        <p class="my-label">Liên hệ</p>
                    </el-col>
                    <el-col :span="14">
                        <p class="content">{{ data.contact?data.contact.name:'' }}</p>
                    </el-col>
                </el-row>
                <el-row class="item">
                    <el-col :span="10">
                        <p class="my-label">Khách hàng</p>
                    </el-col>
                    <el-col :span="14">
                        <p class="content">{{ data.customer?data.customer.name:null }}</p>
                    </el-col>
                </el-row>
                <el-row class="item">
                    <el-col :span="10">
                        <p class="my-label">Nguồn</p>
                    </el-col>
                    <el-col :span="14">
                        <p class="content">{{ data.source }}</p>
                    </el-col>
                </el-row>
                <el-row class="item">
                    <el-col :span="10">
                        <p class="my-label">Kiểu</p>
                    </el-col>
                    <el-col :span="14">
                        <p class="content">{{ data.type }}</p>
                    </el-col>
                </el-row>
                <el-row class="item">
                    <el-col :span="10">
                        <p class="my-label">Bước tiếp theo</p>
                    </el-col>
                    <el-col :span="14">
                        <p class="content">{{ data.next_step }}</p>
                    </el-col>
                </el-row>
            </el-col>
            <el-col :span="12">
                <el-row class="item">
                    <el-col :span="10">
                        <p class="my-label">Ngày kết thúc</p>
                    </el-col>
                    <el-col :span="14">
                        <p class="content">{{ data.end_date|date }}</p>
                    </el-col>
                </el-row>
                <el-row class="item">
                    <el-col :span="10">
                        <p class="my-label">Trạng thái</p>
                    </el-col>
                    <el-col :span="14">
                        <p class="content">{{ data.status }}</p>
                    </el-col>
                </el-row>
                <el-row class="item">
                    <el-col :span="10">
                        <p class="my-label">Xác suất thành công</p>
                    </el-col>
                    <el-col :span="14">
                        <p class="content">{{ data.probability_of_success }} %</p>
                    </el-col>
                </el-row>
                <el-row class="item">
                    <el-col :span="10">
                        <p class="my-label">Giá trị</p>
                    </el-col>
                    <el-col :span="14">
                        <p class="content">{{ data.value }}</p>
                    </el-col>
                </el-row>
                <el-row class="item">
                    <el-col :span="10">
                        <p class="my-label">Doanh số kì vọng</p>
                    </el-col>
                    <el-col :span="14">
                        <p class="content">{{ data.expected_sales }}</p>
                    </el-col>
                </el-row>
                <el-row class="item">
                    <el-col :span="10">
                        <p class="my-label">Ngày tạo</p>
                    </el-col>
                    <el-col :span="14">
                        <p class="content">{{ data.created_at|datetime }}</p>
                    </el-col>
                </el-row>
            </el-col>
        </el-row>
        <h3 class="title">Mô tả</h3>
        <el-row>
            <el-col :span="24">
                <p class="content">{{ data.description }}</p>
            </el-col>
        </el-row>
        <Quote :opportunity="data" />
        <Order :opportunity="data" />
    </el-card>
</template>
<script>
import { show } from "@/api/business/opportunity";
import Quote from "./Quote/index";
import Order from "./Order/index";
export default {
    components: { Quote, Order },
    data() {
        return {
            data: ""
        };
    },
    methods: {
        async getOpportunity() {
            try {
                this.openFullScreen();
                const { data } = await show(this.$route.params.id);
                this.data = data;
                this.$emit("customer", data.customer.id);
                this.closeFullScreen();
            } catch (error) {
                console.log(error);
                this.closeFullScreen();
            }
        }
    },
    created() {
        this.getOpportunity();
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
    color: #7f10c10d;
}
.infomation i {
    padding-right: 5px;
}
</style>