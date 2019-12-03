<template>
    <el-row class="mb-20" :gutter="20">
        <el-col :span="24">
            <el-row class="mb-10" :gutter="10">
                <el-col :span="6">
                    <el-input
                        v-model="params.code"
                        size="small"
                        placeholder="Mã hóa đơn"
                        clearable
                        @keyup.enter.native="$emit('handle-search')"
                    ></el-input>
                </el-col>

                <el-col :span="6">
                    <el-input
                        v-model="params.customer"
                        size="small"
                        placeholder="Khách hàng"
                        clearable
                        @keyup.enter.native="$emit('handle-search')"
                    ></el-input>
                </el-col>
                <el-col :span="6">
                    <el-input
                        v-model="params.order"
                        size="small"
                        placeholder="Đơn hàng"
                        clearable
                        @keyup.enter.native="$emit('handle-search')"
                    ></el-input>
                </el-col>
                <el-col :span="6">
                    <el-select
                        style="width:100%"
                        v-model="params.paymentMethod"
                        size="small"
                        clearable
                        placeholder="Hình thức thanh toán"
                    >
                        <el-option label="Tiền mặt" value="Tiền mặt"></el-option>
                        <el-option label="Chuyển khoản" value="Chuyển khoản"></el-option>
                    </el-select>
                </el-col>
            </el-row>
            <el-row :gutter="10">
                <el-col :span="8">
                    <el-select
                        class="w-100"
                        v-model="params.user"
                        size="small"
                        clearable
                        placeholder="Người phụ trách"
                    >
                        <el-option
                            v-for="item in userOptions"
                            :key="item.id"
                            :label="item.name"
                            :value="item.id"
                        ></el-option>
                    </el-select>
                </el-col>
                <el-col :span="8">
                    <el-date-picker
                        v-model="params.createdAt"
                        class="w-100"
                        size="small"
                        type="daterange"
                        start-placeholder="Tạo từ"
                        end-placeholder="Tạo đến"
                        format="dd/MM/yyyy"
                        value-format="yyyy-MM-dd"
                    ></el-date-picker>
                </el-col>
                <el-col :span="8">
                    <el-select
                        style="width:100%"
                        v-model="params.status"
                        size="small"
                        clearable
                        placeholder="Trạng thái"
                    >
                        <el-option
                            v-for="item in catalogs['Trạng thái']"
                            :key="item.id"
                            :label="item.name"
                            :value="item.id"
                        ></el-option>
                    </el-select>
                </el-col>
            </el-row>
        </el-col>
    </el-row>
</template>
<script>
export default {
    props: ["params"],
    data() {
        return {
            catalogs: {
                "Trạng thái": []
            },
            options: "",
            loading: false
        };
    },
    created() {
        Promise.all([
            this.getCatalog("Hóa đơn", "Trạng thái"),
            this.getUsers()
        ]);
    }
};
</script>
<style lang="">
</style>