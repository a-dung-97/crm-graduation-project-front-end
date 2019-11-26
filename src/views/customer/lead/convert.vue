<template>
    <div class="app-container">
        <el-card style="height:75vh">
            <div style="height:35.6px" slot="header">
                <span style="line-height:35.6px">Chuyển đổi tiềm năng</span>
                <el-button class="fr" @click="convert" size="medium" type="primary">Lưu</el-button>
            </div>
            <p>Thêm mới khách hàng: {{ name }}</p>
            <p>Thêm mới liên hệ: {{ name }}</p>
            <el-row style="margin-bottom:30px">
                <el-col :span="3">Thêm mới cơ hội</el-col>
                <el-col :span="3">
                    <el-switch v-model="opportunity"></el-switch>
                </el-col>
            </el-row>
            <transition
                name="custom-classes-transition"
                enter-active-class="animated fadeInRight faster"
                leave-active-class="animated fadeOutLeft faster"
            >
                <el-row v-if="opportunity" :gutter="30">
                    <el-form
                        :model="form"
                        :rules="rules"
                        ref="form"
                        label-position="left"
                        label-width="160px"
                    >
                        <el-col :md="12" :sm="24">
                            <el-form-item label="Chủ sở hữu" prop="ownerable_id">
                                <el-row>
                                    <el-col :span="6">
                                        <el-select
                                            v-model="form.ownerable_type"
                                            @change="form.ownerable_id=''"
                                        >
                                            <el-option value="App\User" label="Nhân viên"></el-option>
                                            <el-option value="App\Group" label="Nhóm"></el-option>
                                        </el-select>
                                    </el-col>
                                    <el-col :span="18">
                                        <el-select
                                            class="w-100"
                                            v-model="form.ownerable_id"
                                            filterable
                                            placeholder="Chọn chủ sở hữu"
                                        >
                                            <template v-if="form.ownerable_type=='App\\User'">
                                                <el-option
                                                    style="max-height:100%"
                                                    v-for="item in userOptions"
                                                    :key="item.id"
                                                    :label="item.name"
                                                    :value="item.id"
                                                >
                                                    <span style="float: left">{{ item.name }}</span>
                                                    <span
                                                        style="float: right; color: #8492a6; font-size: 13px"
                                                    >{{ item.email }}</span>
                                                </el-option>
                                            </template>
                                            <template v-else>
                                                <el-option
                                                    style="max-height:100%"
                                                    v-for="item in groupOptions"
                                                    :key="item.id"
                                                    :disabled="item.count==0"
                                                    :label="item.name"
                                                    :value="item.id"
                                                >
                                                    <span style="float: left">{{ item.name }}</span>
                                                    <span
                                                        style="float: right; color: #8492a6; font-size: 13px"
                                                    >{{ item.count+' nhân viên' }}</span>
                                                </el-option>
                                            </template>
                                        </el-select>
                                    </el-col>
                                </el-row>
                            </el-form-item>
                            <el-form-item label="Tên" prop="name">
                                <el-input placeholder="Nhập tên" v-model="form.name"></el-input>
                            </el-form-item>
                            <el-form-item label="Kiểu">
                                <el-select
                                    style="width:100%"
                                    v-model="form.type_id"
                                    placeholder="Chọn kiểu"
                                >
                                    <el-option
                                        v-for="item in catalogs['Kiểu']"
                                        :key="item.id"
                                        :label="item.name"
                                        :value="item.id"
                                    ></el-option>
                                </el-select>
                            </el-form-item>
                            <el-form-item label="Bước tiếp theo">
                                <el-input
                                    placeholder="Nhập bước tiếp theo"
                                    v-model="form.next_step"
                                ></el-input>
                            </el-form-item>
                            <el-form-item label="Trạng thái">
                                <el-select
                                    style="width:100%"
                                    v-model="form.status_id"
                                    placeholder="Chọn trạng thái"
                                >
                                    <el-option
                                        v-for="item in catalogs['Trạng thái']"
                                        :key="item.id"
                                        :label="item.name"
                                        :value="item.id"
                                    ></el-option>
                                </el-select>
                            </el-form-item>
                        </el-col>
                        <el-col :span="12">
                            <el-form-item label="Ngày kết thúc" prop="end_date">
                                <el-date-picker
                                    class="w-100"
                                    v-model="form.end_date"
                                    type="date"
                                    placeholder="Chọn ngày kết thúc"
                                    format="dd/MM/yyyy"
                                    value-format="yyyy-MM-dd"
                                ></el-date-picker>
                            </el-form-item>
                            <el-form-item label="Nguồn">
                                <el-select
                                    style="width:100%"
                                    v-model="form.source_id"
                                    placeholder="Chọn nguồn"
                                >
                                    <el-option
                                        v-for="item in catalogs['Nguồn']"
                                        :key="item.id"
                                        :label="item.name"
                                        :value="item.id"
                                    ></el-option>
                                </el-select>
                            </el-form-item>
                            <el-form-item label="Xác suất thành công">
                                <el-input-number
                                    class="w-100"
                                    placeholder="Nhập xác suất thành công"
                                    v-model="form.probability_of_success"
                                    :precision="2"
                                    :step="1"
                                    :max="100"
                                    controls-position="right"
                                ></el-input-number>
                            </el-form-item>
                            <el-form-item label="Giá trị">
                                <el-input
                                    type="number"
                                    placeholder="Nhập giá trị"
                                    v-model="form.value"
                                ></el-input>
                            </el-form-item>
                            <el-form-item label="Doanh số kì vọng">
                                <el-input
                                    type="number"
                                    placeholder="Nhập doanh số kì vọng"
                                    v-model="form.expected_sales"
                                ></el-input>
                            </el-form-item>
                        </el-col>
                    </el-form>
                </el-row>
            </transition>
        </el-card>
    </div>
</template>
<script>
import { show, convert } from "@/api/customer/lead";
export default {
    data() {
        return {
            name: "",
            opportunity: false,
            form: {
                id: "",
                ownerable_type: "App\\User",
                ownerable_id: "",
                name: "",
                type_id: "",
                next_step: "",
                end_date: "",
                status_id: "",
                source_id: "",
                probability_of_success: null,
                value: "",
                expected_sales: "",
                description: ""
            },
            rules: {
                ownerable_id: [
                    {
                        required: true,
                        message: "Hãy chọn chủ sở hữu",
                        trigger: "blur"
                    }
                ],
                name: [
                    {
                        required: true,
                        message: "Hãy nhập tên cơ hội",
                        trigger: "blur"
                    }
                ],
                end_date: [
                    {
                        required: true,
                        message: "Hãy chọn ngày kết thúc",
                        trigger: "blur"
                    }
                ]
            },
            catalogs: {
                Kiểu: [],
                Nguồn: [],
                "Trạng thái": []
            }
        };
    },
    methods: {
        async getName() {
            try {
                this.openFullScreen();
                const { data } = await show(this.$route.params.id, {
                    getName: true
                });
                this.name = data.name;
                this.closeFullScreen();
            } catch (error) {
                this.closeFullScreen();
            }
        },
        async convert() {
            try {
                await this.$refs["form"].validate();
                this.loading = true;
                const { data } = await convert(
                    { opportunity: this.opportunity, data: this.form },
                    this.$route.params.id
                );
                this.loading = false;
                this.$router.push(`/customer/customer/show/${data.id}`);
            } catch (error) {
                console.log(error);
                this.loading = false;
            }
        }
    },

    created() {
        Promise.all([
            this.getCatalog("Cơ hội", "Kiểu"),
            this.getCatalog("Cơ hội", "Nguồn"),
            this.getCatalog("Cơ hội", "Trạng thái"),
            this.getUsers(),
            this.getGroups(),
            this.getName()
        ]);
    }
};
</script>
<style lang="css">
</style>