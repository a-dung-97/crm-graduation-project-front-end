<template>
    <el-row class="mb-20" :gutter="20">
        <el-col :span="24">
            <el-row class="mb-10" :gutter="10">
                <el-col :span="8">
                    <el-input v-model="params.title" size="medium" placeholder="Tiêu đề" clearable></el-input>
                </el-col>
                <el-col :span="8">
                    <el-input
                        v-model="params.content"
                        size="medium"
                        placeholder="Nội dung"
                        clearable
                    ></el-input>
                </el-col>
                <el-col :span="8">
                    <el-select
                        style="width:100%"
                        size="medium"
                        v-model="params.type"
                        clearable
                        placeholder="Loại"
                    >
                        <el-option label="Tiềm năng" value="App\Lead"></el-option>
                        <el-option label="Khách hàng" value="App\Customer"></el-option>
                        <el-option label="Liên hệ" value="App\Contact"></el-option>
                        <el-option label="Sản phẩm" value="App\Product"></el-option>
                        <el-option label="Cơ hội" value="App\Opportunity"></el-option>
                    </el-select>
                </el-col>
            </el-row>
            <el-row :gutter="10">
                <el-col :span="12">
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
                <el-col :span="12">
                    <el-select
                        class="w-100"
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
        Promise.all([this.getUsers()]);
    }
};
</script>
<style lang="">
</style>