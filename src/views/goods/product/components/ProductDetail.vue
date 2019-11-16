<template>
    <el-row
        v-loading.fullscreen.lock="loading"
        element-loading-text="Xin vui lòng chờ"
        element-loading-background="rgba(0, 0, 0, 0.8)"
    >
        <el-col :span="24">
            <el-row>
                <el-col :span="12">
                    <el-row v-if="isShow" :gutter="50">
                        <el-col v-for="image in form.images" :key="image.name" :span="4">
                            <el-avatar :fit="'fill'" :size="100" :src="image.path"></el-avatar>
                        </el-col>
                    </el-row>
                    <UploadImages
                        v-else
                        @handle-upload="form.images=[...$event]"
                        :images="form.images"
                    />
                </el-col>
                <el-col :offset="(form.images.length==0&&isShow)?12:0" :span="12">
                    <el-button
                        v-if="isEdit"
                        @click="updateProduct"
                        type="success"
                        class="fr"
                    >Sửa sản phẩm</el-button>
                    <el-button
                        v-else-if="isShow"
                        @click="$router.push(`/goods/product/edit/${form.id}`)"
                        type="primary"
                        class="fr"
                    >Sửa sản phẩm</el-button>
                    <el-button v-else @click="createProduct" type="primary" class="fr">Thêm sản phẩm</el-button>
                </el-col>
            </el-row>
        </el-col>
        <el-form
            :disabled="isShow"
            :model="form"
            :rules="rules"
            ref="form"
            label-position="left"
            label-width="120px"
        >
            <el-col style="margin-top:20px" :span="24">
                <el-card>
                    <div slot="header">
                        <span>Thông tin sản phẩm</span>
                    </div>
                    <el-row :gutter="30">
                        <el-col :span="24">
                            <el-form-item label="Loại">
                                <el-switch
                                    v-model="form.type"
                                    active-value="product"
                                    inactive-value="service"
                                    active-text="Hàng hóa"
                                    inactive-text="Dịch vụ"
                                ></el-switch>
                            </el-form-item>
                        </el-col>
                        <el-col :span="12">
                            <el-form-item label="Tên" prop="name">
                                <el-input v-model="form.name"></el-input>
                            </el-form-item>
                            <el-form-item label="Mã" prop="code">
                                <el-input v-model="form.code"></el-input>
                            </el-form-item>
                            <el-form-item label="Đơn vị">
                                <el-input v-model="form.unit"></el-input>
                            </el-form-item>
                        </el-col>
                        <el-col :span="12">
                            <el-form-item label="Nhà sản xuất">
                                <el-input v-model="form.manufacturer"></el-input>
                            </el-form-item>
                            <el-form-item label="Nhãn hiệu">
                                <el-input v-model="form.brand"></el-input>
                            </el-form-item>
                            <el-form-item label="Mã vạch">
                                <el-input v-model="form.barcode"></el-input>
                            </el-form-item>
                        </el-col>
                    </el-row>
                </el-card>
            </el-col>
            <el-col style="margin-top:20px" :span="24">
                <el-card>
                    <div slot="header">
                        <span>Thông tin giá</span>
                    </div>
                    <el-row :gutter="30">
                        <el-col :span="12">
                            <el-form-item label="Giá mua">
                                <el-input-number
                                    style="width:100%"
                                    :min="0"
                                    v-model="form.perchase_price"
                                ></el-input-number>
                            </el-form-item>
                            <el-form-item label="Thuế">
                                <el-input-number style="width:100%" :min="0" v-model="form.tax"></el-input-number>
                            </el-form-item>
                            <el-form-item label="Chi tiết mua">
                                <el-input v-model="form.perchase_detail"></el-input>
                            </el-form-item>
                        </el-col>
                        <el-col :span="12">
                            <el-form-item label="Giá bán">
                                <el-input-number
                                    style="width:100%"
                                    :min="0"
                                    v-model="form.sale_price"
                                ></el-input-number>
                            </el-form-item>
                            <el-form-item label="Nhà phân phối">
                                <el-input v-model="form.distributor"></el-input>
                            </el-form-item>
                            <el-form-item label="Chi tiết bán">
                                <el-input v-model="form.sale_detail"></el-input>
                            </el-form-item>
                        </el-col>
                    </el-row>
                </el-card>
            </el-col>
        </el-form>
    </el-row>
</template>
<script>
import UploadImages from "./UploadImages";
import { store, show, update } from "@/api/goods/product";
export default {
    components: { UploadImages },
    props: ["isEdit", "isShow"],
    data() {
        return {
            form: {
                id: "",
                type: "product",
                name: "",
                code: "",
                unit: "",
                manufacturer: "",
                brand: "",
                barcode: "",
                perchase_price: 0,
                tax: "",
                perchase_detail: "",
                sale_price: "",
                distributor: "",
                sale_detail: "",
                images: []
            },
            loading: "",
            rules: {
                name: [
                    {
                        required: true,
                        message: "Hãy nhập tên sản phẩm",
                        trigger: "blur"
                    }
                ],
                code: [
                    {
                        required: true,
                        message: "Hãy nhập mã sản phẩm",
                        trigger: "blur"
                    }
                ]
            }
        };
    },
    methods: {
        async createProduct() {
            try {
                await this.$refs["form"].validate();
                this.loading = true;
                const { data } = await store(this.form);
                this.loading = false;
                this.$router.push(`/goods/product/show/${data.id}`);
            } catch (error) {
                console.log(error);
                this.loading = false;
            }
        },
        async getProduct() {
            try {
                this.loading = true;
                const { data } = await show(this.$route.params.id, {
                    edit: true
                });
                for (let field in this.form) {
                    this.form[field] = data[field];
                }
                this.loading = false;
            } catch (error) {
                console.log(error);
                this.loading = false;
            }
        },
        async updateProduct() {
            try {
                this.loading = true;
                await this.$refs["form"].validate();
                let data = await update(this.form, this.$route.params.id);
                this.loading = false;
                this.$router.push(
                    `/goods/product/show/${this.$route.params.id}`
                );
            } catch (error) {
                console.log(error);
                this.loading = false;
            }
        }
    },
    created() {
        if (this.isEdit || this.isShow) this.getProduct();
    }
};
</script>
