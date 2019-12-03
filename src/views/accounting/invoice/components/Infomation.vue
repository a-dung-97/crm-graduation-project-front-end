<template>
    <el-card>
        <h3 class="title">
            Thông tin cơ hội
            <el-button
                class="fr"
                @click="$router.push(`/accounting/invoice/edit/${$route.params.id}`)"
                type="primary"
                size="small"
                icon="el-icon-edit"
                circle
            ></el-button>
        </h3>
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
                        <p class="my-label">Mã hóa đơn</p>
                    </el-col>
                    <el-col :span="14">
                        <p class="content">{{ data.code}}</p>
                    </el-col>
                </el-row>
                <el-row class="item">
                    <el-col :span="10">
                        <p class="my-label">Đơn hàng</p>
                    </el-col>
                    <el-col :span="14">
                        <p class="content">{{ data.order }}</p>
                    </el-col>
                </el-row>
                <el-row class="item">
                    <el-col :span="10">
                        <p class="my-label">Khách hàng</p>
                    </el-col>
                    <el-col :span="14">
                        <p class="content">{{ data.customer }}</p>
                    </el-col>
                </el-row>
                <el-row class="item">
                    <el-col :span="10">
                        <p class="my-label">Mã số thuế</p>
                    </el-col>
                    <el-col :span="14">
                        <p class="content">{{ data.tax_code }}</p>
                    </el-col>
                </el-row>
                <el-row class="item">
                    <el-col :span="10">
                        <p class="my-label">Người phụ trách</p>
                    </el-col>
                    <el-col :span="14">
                        <p class="content">{{ data.user }}</p>
                    </el-col>
                </el-row>
            </el-col>
            <el-col :span="12">
                <el-row class="item">
                    <el-col :span="10">
                        <p class="my-label">Số tiền thanh toán</p>
                    </el-col>
                    <el-col :span="14">
                        <p class="content">{{ data.payment_amount }}</p>
                    </el-col>
                </el-row>
                <el-row class="item">
                    <el-col :span="10">
                        <p class="my-label">Hình thức thanh toán</p>
                    </el-col>
                    <el-col :span="14">
                        <p class="content">{{ data.payment_method }}</p>
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
                        <p class="my-label">Ngày hết hạn</p>
                    </el-col>
                    <el-col :span="14">
                        <p class="content">{{ data.expiration_date|date }}</p>
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
                        <p class="my-label">Ghi chú</p>
                    </el-col>
                    <el-col :span="14">
                        <p class="content">{{ data.note }}</p>
                    </el-col>
                </el-row>
            </el-col>
        </el-row>

        <Bill />
    </el-card>
</template>
<script>
import { show } from "@/api/accounting/invoice";
import Bill from "@/components/Bill/index";
export default {
    components: { Bill },
    data() {
        return {
            data: "",
            bills: []
        };
    },
    methods: {
        async getInvoice() {
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
        this.getInvoice();
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
</style>