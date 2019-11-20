<template>
    <el-row :gutter="20">
        <el-col :span="18">
            <el-row :gutter="20">
                <el-col class="col" :span="6">
                    <el-select
                        size="medium"
                        class="w-100"
                        v-model="params.type"
                        placeholder="Loại"
                        clearable
                    >
                        <el-option label="Tiềm năng" value="App\Lead"></el-option>
                        <el-option label="Khách hàng" value="App\Customer"></el-option>
                    </el-select>
                </el-col>
                <el-col class="col" :span="6">
                    <el-select
                        size="medium"
                        class="w-100"
                        v-model="params.status"
                        placeholder="Trạng thái"
                        clearable
                    >
                        <el-option value="1" label="Chưa thực hiện"></el-option>
                        <el-option value="2" label="Đang thực hiện"></el-option>
                        <el-option value="3" label="Đã giải quyết"></el-option>
                        <el-option value="4" label="Đã hoàn thành"></el-option>
                    </el-select>
                </el-col>
                <el-col class="col" :span="6">
                    <el-input v-model="params.title" size="medium" placeholder="Tiêu đề" clearable></el-input>
                </el-col>
                <el-col class="col" :span="6">
                    <el-select v-model="params.user" clearable placeholder="Chủ sở hữu">
                        <el-option
                            v-for="item in userOptions"
                            :key="item.id"
                            :label="item.name"
                            :value="item.id"
                        ></el-option>
                    </el-select>
                </el-col>
                <el-col class="col" :span="12">
                    <el-date-picker
                        v-model="params.startDate"
                        class="w-100"
                        type="daterange"
                        range-separator="-"
                        start-placeholder="Bắt đầu từ"
                        end-placeholder="Bắt đầu đến"
                    ></el-date-picker>
                </el-col>
                <el-col class="col" :span="12">
                    <el-date-picker
                        class="w-100"
                        v-model="params.finishDate"
                        type="daterange"
                        range-separator="-"
                        start-placeholder="Hoàn thành từ"
                        end-placeholder="Hoàn thành đến"
                    ></el-date-picker>
                </el-col>
            </el-row>
        </el-col>

        <el-col :span="6">
            <el-button type="primary" size="medium" @click="$emit('handle-search')">Tìm kiếm</el-button>
        </el-col>
    </el-row>
</template>
<script>
import { index } from "@/api/company/user";
export default {
    props: ["params"],
    data() {
        return {};
    },
    methods: {},
    created() {
        this.getUsers();
    }
};
</script>
<style lang="css" scoped>
.col:nth-child(1n + 5) {
    margin-top: 10px;
}
</style>