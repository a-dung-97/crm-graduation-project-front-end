<template>
    <el-form :model="user" :rules="rules" ref="form">
        <el-form-item label="Họ tên" prop="name">
            <el-input v-model.lazy="user.name" />
        </el-form-item>
        <el-form-item label="Số điện thoại" prop="phone_number">
            <el-input v-model.trim="user.phone_number" />
        </el-form-item>
        <el-form-item label="Email">
            <el-input disabled :placeholder="user.email" />
        </el-form-item>
        <el-form-item>
            <el-button
                :loading="loading"
                type="primary"
                class="block mx-auto"
                @click="submit"
            >Cập nhật</el-button>
        </el-form-item>
    </el-form>
</template>

<script>
import { validateMobileNumber } from "@/utils/validate";
import { update } from "@/api/company/user";
export default {
    props: {
        user: {
            type: Object,
            default: () => {
                return {
                    id: "",
                    name: "",
                    email: "",
                    phone_number: ""
                };
            }
        }
    },
    data() {
        return {
            loading: false,
            rules: {
                name: [
                    {
                        required: true,
                        message: "Hãy nhập tên của bạn",
                        trigger: "blur"
                    }
                ],
                phone_number: [
                    {
                        validator: validateMobileNumber,
                        trigger: "blur"
                    }
                ]
            }
        };
    },
    methods: {
        submit() {
            this.$refs["form"].validate(valid => {
                if (valid) {
                    this.updateUser();
                } else {
                    return false;
                }
            });
        },
        async updateUser() {
            try {
                this.loading = true;
                await update(
                    {
                        name: this.user.name,
                        phone_number: this.user.phone_number
                    },
                    this.user.id
                );
                this.$store.commit("user/SET_NAME", this.user.name);
                this.$store.commit(
                    "user/SET_PHONE_NUMBER",
                    this.user.phone_number
                );
                this.loading = false;
                this.$message.success("Cập nhật thành công");
            } catch (error) {
                this.loading = false;
            }
        }
    }
};
</script>
