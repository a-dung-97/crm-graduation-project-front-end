<template>
    <el-row class="mb-20" :gutter="20">
        <el-col :span="24">
            <el-row class="mb-10" :gutter="10">
                <el-col :span="6">
                    <el-input
                        v-model="params.name"
                        size="medium"
                        placeholder="Họ tên"
                        clearable
                        @keyup.enter.native="$emit('handle-search')"
                    ></el-input>
                </el-col>

                <el-col :span="6">
                    <el-input
                        v-model="params.email"
                        size="medium"
                        placeholder="Email"
                        clearable
                        @keyup.enter.native="$emit('handle-search')"
                    ></el-input>
                </el-col>
                <el-col :span="6">
                    <el-select
                        style="width:100%"
                        v-model="params.position"
                        size="medium"
                        clearable
                        placeholder="Chức vụ"
                    >
                        <el-option
                            v-for="item in catalogs['Chức vụ']"
                            :key="item.id"
                            :label="item.name"
                            :value="item.id"
                        ></el-option>
                    </el-select>
                </el-col>
                <el-col :span="6">
                    <el-select
                        style="width:100%"
                        v-model="params.gender"
                        size="medium"
                        clearable
                        placeholder="Giới tính"
                    >
                        <el-option value="1" label="Nam"></el-option>
                        <el-option value="0" label="Nữ"></el-option>
                    </el-select>
                </el-col>
            </el-row>
            <el-row :gutter="10">
                <el-col :span="6">
                    <el-date-picker
                        v-model="params.createdAt"
                        class="w-100"
                        size="medium"
                        type="daterange"
                        start-placeholder="Tạo từ"
                        end-placeholder="Tạo đến"
                        format="dd/MM/yyyy"
                        value-format="yyyy-MM-dd"
                    ></el-date-picker>
                </el-col>
                <el-col :span="6">
                    <el-row>
                        <el-col :span="8">
                            <el-select
                                class="w-100"
                                v-model="params.ownerableType"
                                @change="params.ownerableId=''"
                                size="medium"
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
                                size="medium"
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
                    <el-input
                        v-model="params.phoneNumber"
                        size="medium"
                        placeholder="Số điện thoại"
                        clearable
                        @keyup.enter.native="$emit('handle-search')"
                    ></el-input>
                </el-col>
                <el-col :span="6">
                    <el-input
                        v-model="params.mobileNumber"
                        size="medium"
                        placeholder="Số di động"
                        clearable
                        @keyup.enter.native="$emit('handle-search')"
                    ></el-input>
                </el-col>
            </el-row>
        </el-col>
    </el-row>
</template>
<script>
import { index } from "@/api/general/tag";
export default {
    props: ["params"],
    data() {
        return {
            catalogs: {
                Nguồn: [],
                "Chức vụ": []
            },
            options: "",
            loading: false
        };
    },
    methods: {
        async remoteMethod(query) {
            if (query !== "") {
                this.loading = true;
                const { data } = await index("lead", query);
                this.options = data;
                this.loading = false;
            } else {
                this.options = [];
            }
        }
    },
    created() {
        Promise.all([
            this.getCatalog("Liên hệ", "Chức vụ"),
            this.getUsers(),
            this.getGroups()
        ]);
    }
};
</script>
<style lang="">
</style>