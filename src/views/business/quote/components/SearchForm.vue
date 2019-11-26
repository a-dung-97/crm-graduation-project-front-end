<template>
    <el-row class="mb-20" :gutter="20">
        <el-col :span="24">
            <el-row class="mb-10" :gutter="10">
                <el-col :span="4">
                    <el-input
                        v-model="params.code"
                        size="small"
                        placeholder="Tên"
                        clearable
                        @keyup.enter.native="$emit('handle-search')"
                    ></el-input>
                </el-col>
                <el-col :span="4">
                    <el-input
                        v-model="params.deliveryDate"
                        size="small"
                        placeholder="Địa chỉ giao hàng"
                        clearable
                        @keyup.enter.native="$emit('handle-search')"
                    ></el-input>
                </el-col>
                <el-col :span="4">
                    <el-input
                        v-model="params.customer"
                        size="small"
                        placeholder="Khách hàng"
                        clearable
                        @keyup.enter.native="$emit('handle-search')"
                    ></el-input>
                </el-col>
                <el-col :span="6">
                    <el-row>
                        <el-col :span="8">
                            <el-select
                                class="w-100"
                                v-model="params.ownerableType"
                                @change="params.ownerableId=''"
                                size="small"
                                clearable
                            >
                                <el-option label="NV" value="App\User"></el-option>
                                <el-option label="Nhóm" value="App\Group"></el-option>
                            </el-select>
                        </el-col>
                        <el-col :span="16">
                            <el-select
                                :disabled="params.ownerableType==''"
                                class="w-100"
                                v-model="params.ownerableId"
                                size="small"
                                clearable
                                placeholder="Chủ sở hữu"
                            >
                                <template v-if="params.ownerableType=='App\\User'">
                                    <el-option
                                        v-for="item in userOptions"
                                        :key="item.id"
                                        :label="item.name"
                                        :value="item.id"
                                    ></el-option>
                                </template>
                                <template v-else>
                                    <el-option
                                        v-for="item in groupOptions"
                                        :key="item.id"
                                        :label="item.name"
                                        :value="item.id"
                                    ></el-option>
                                </template>
                            </el-select>
                        </el-col>
                    </el-row>
                </el-col>
                <el-col :span="6">
                    <el-date-picker
                        v-model="params.quoteDate"
                        class="w-100"
                        size="small"
                        type="daterange"
                        start-placeholder="Báo giá từ"
                        end-placeholder="Báo giá đến"
                        format="dd/MM/yyyy"
                        value-format="yyyy-MM-dd"
                    ></el-date-picker>
                </el-col>
            </el-row>
        </el-col>
    </el-row>
</template>
<script>
export default {
    props: ["params"],
    created() {
        Promise.all([this.getUsers(), this.getGroups()]);
    }
};
</script>
<style lang="">
</style>