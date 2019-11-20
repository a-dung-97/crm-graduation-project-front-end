<template>
    <el-row class="mb-20" :gutter="20">
        <el-col :span="22">
            <el-row class="mb-10" :gutter="10">
                <el-col :span="4">
                    <el-input
                        v-model="params.search"
                        size="medium"
                        placeholder="Nhập thông tin"
                        clearable
                        @keyup.enter.native="$emit('handle-search')"
                    ></el-input>
                </el-col>
                <el-col :span="4">
                    <el-select
                        style="width:100%"
                        size="medium"
                        v-model="params.source"
                        clearable
                        placeholder="Nguồn"
                    >
                        <el-option
                            v-for="item in catalogs['Nguồn']"
                            :key="item.id"
                            :label="item.name"
                            :value="item.id"
                        ></el-option>
                    </el-select>
                </el-col>
                <el-col :span="4">
                    <el-input
                        v-model="params.company"
                        size="medium"
                        placeholder="Công ty"
                        clearable
                        @keyup.enter.native="$emit('handle-search')"
                    ></el-input>
                </el-col>
                <el-col :span="4">
                    <el-select
                        style="width:100%"
                        v-model="params.branch"
                        size="medium"
                        clearable
                        placeholder="Ngành nghề"
                    >
                        <el-option
                            v-for="item in catalogs['Ngành nghề']"
                            :key="item.id"
                            :label="item.name"
                            :value="item.id"
                        ></el-option>
                    </el-select>
                </el-col>
                <el-col :span="4">
                    <el-select
                        v-model="params.user"
                        size="medium"
                        clearable
                        placeholder="Chủ sở hữu"
                    >
                        <el-option
                            v-for="item in userOptions"
                            :key="item.id"
                            :label="item.name"
                            :value="item.id"
                        ></el-option>
                    </el-select>
                </el-col>
                <el-col :span="4">
                    <el-select
                        size="medium"
                        class="w-100"
                        v-model="params.interactive"
                        placeholder="Tương tác"
                        clearable
                    >
                        <el-option value="task" label="Không hoạt động"></el-option>
                        <el-option value="note" label="Không ghi chú"></el-option>
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
                    <el-date-picker
                        v-model="params.birthday"
                        class="w-100"
                        size="medium"
                        type="daterange"
                        start-placeholder="Sinh nhật từ"
                        end-placeholder="Sinh nhật đến"
                        format="dd/MM/yyyy"
                        value-format="yyyy-MM-dd"
                    ></el-date-picker>
                </el-col>
                <el-col :span="6">
                    <el-select
                        v-model="params.tags"
                        multiple
                        filterable
                        size="medium"
                        clearable
                        class="w-100"
                        remote
                        reserve-keyword
                        placeholder="Tag"
                        :remote-method="remoteMethod"
                        :loading="loading"
                    >
                        <el-option
                            v-for="item in options"
                            :key="item.id"
                            :label="item.name"
                            :value="item.id"
                        ></el-option>
                    </el-select>
                </el-col>
                <el-col :span="6">
                    <el-row>
                        <el-col :span="12">
                            <el-input
                                type="number"
                                v-model="params.scoreFrom"
                                placeholder="Điểm từ"
                                clearable
                                size="medium"
                            ></el-input>
                        </el-col>
                        <el-col :span="12">
                            <el-input
                                type="number"
                                v-model="params.scoreTo"
                                placeholder="Điểm đến"
                                size="medium"
                                clearable
                            ></el-input>
                        </el-col>
                    </el-row>
                </el-col>
            </el-row>
        </el-col>
        <el-col :span="2">
            <el-button
                size="medium"
                @click="$emit('handle-search')"
                class="fr"
                icon="el-icon-search"
                circle
                type="primary"
            ></el-button>
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
                "Ngành nghề": []
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
            this.getCatalog("Tiềm năng", "Nguồn"),
            this.getCatalog("Tiềm năng", "Ngành nghề"),
            this.getUsers()
        ]);
    }
};
</script>
<style lang="">
</style>