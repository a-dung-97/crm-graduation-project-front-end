<template>
    <el-card>
        <el-row>
            <el-col :span="12">
                <el-row :gutter="50">
                    <el-col v-for="image in data.images" :key="image.name" :span="4">
                        <el-avatar :fit="'fill'" :size="100" :src="image.path"></el-avatar>
                    </el-col>
                </el-row>
            </el-col>
            <el-col :span="12">
                <el-button
                    class="fr"
                    @click="$router.push(`/goods/product/edit/${$route.params.id}`)"
                    type="primary"
                    size="small"
                >Sửa</el-button>
            </el-col>
        </el-row>
        <h3 class="title">Thông tin sản phẩm</h3>
        <el-row>
            <el-col :span="12">
                <el-row class="item">
                    <el-col :span="10">
                        <p class="my-label">Tên sản phẩm</p>
                    </el-col>
                    <el-col :span="14">
                        <p class="content">{{ data.name }}</p>
                    </el-col>
                </el-row>
                <el-row class="item">
                    <el-col :span="10">
                        <p class="my-label">Mã sản phẩm</p>
                    </el-col>
                    <el-col :span="14">
                        <p class="content">{{ data.code}}</p>
                    </el-col>
                </el-row>
                <el-row class="item">
                    <el-col :span="10">
                        <p class="my-label">Loại</p>
                    </el-col>
                    <el-col :span="14">
                        <p class="content">{{ data.type=='product'?'Hàng hóa':'Dịch vụ' }}</p>
                    </el-col>
                </el-row>
                <el-row class="item">
                    <el-col :span="10">
                        <p class="my-label">Đơn vị</p>
                    </el-col>
                    <el-col :span="14">
                        <p class="content">{{ data.unit }}</p>
                    </el-col>
                </el-row>
            </el-col>
            <el-col :span="12">
                <el-row class="item">
                    <el-col :span="10">
                        <p class="my-label">Nhãn hiệu</p>
                    </el-col>
                    <el-col :span="14">
                        <p class="content">{{ data.brand}}</p>
                    </el-col>
                </el-row>
                <el-row class="item">
                    <el-col :span="10">
                        <p class="my-label">Mã vạch</p>
                    </el-col>
                    <el-col :span="14">
                        <p class="content">{{ data.barcode }}</p>
                    </el-col>
                </el-row>
                <el-row class="item">
                    <el-col :span="10">
                        <p class="my-label">Nhà sản xuất</p>
                    </el-col>
                    <el-col :span="14">
                        <p class="content">{{ data.manufacturer }}</p>
                    </el-col>
                </el-row>
            </el-col>
        </el-row>
        <h3 class="title">Chi tiết giá</h3>
        <el-row>
            <el-col :span="12">
                <el-row class="item">
                    <el-col :span="10">
                        <p class="my-label">Giá mua</p>
                    </el-col>
                    <el-col :span="14">
                        <p class="content">{{ data.perchase_price|money }}</p>
                    </el-col>
                </el-row>

                <el-row class="item">
                    <el-col :span="10">
                        <p class="my-label">Thuế</p>
                    </el-col>
                    <el-col :span="14">
                        <p class="content">{{ data.tax }} %</p>
                    </el-col>
                </el-row>
                <el-row class="item">
                    <el-col :span="10">
                        <p class="my-label">Chi tiết mua</p>
                    </el-col>
                    <el-col :span="14">
                        <p class="content">{{ data.perchase_detail }}</p>
                    </el-col>
                </el-row>
            </el-col>
            <el-col :span="12">
                <el-row class="item">
                    <el-col :span="10">
                        <p class="my-label">Giá bán</p>
                    </el-col>
                    <el-col :span="14">
                        <p class="content">{{ data.sale_price|money}}</p>
                    </el-col>
                </el-row>
                <el-row class="item">
                    <el-col :span="10">
                        <p class="my-label">Nhà phân phối</p>
                    </el-col>
                    <el-col :span="14">
                        <p class="content">{{ data.distributor }}</p>
                    </el-col>
                </el-row>
                <el-row class="item">
                    <el-col :span="10">
                        <p class="my-label">Chi tiết bán</p>
                    </el-col>
                    <el-col :span="14">
                        <p class="content">{{ data.sale_detail }}</p>
                    </el-col>
                </el-row>
            </el-col>
        </el-row>
    </el-card>
</template>
<script>
import { show } from "@/api/goods/product";
export default {
    data() {
        return {
            data: ""
        };
    },
    methods: {
        async getProduct() {
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
        this.getProduct();
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