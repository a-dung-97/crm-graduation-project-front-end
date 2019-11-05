<template>
    <main
        class="container"
        v-loading.fullscreen.lock="loading"
        element-loading-text="Xin vui lòng chờ"
        element-loading-background="rgba(0, 0, 0, 0.8)"
    >
        <aside>
            <img src="@/assets/images/customer/vector image 7.svg" alt />
            <p>Quản lý và chăm sóc khách hàng toàn diện!</p>
        </aside>
        <section class="register">
            <form action>
                <div class="form-title">Đăng ký</div>
                <div
                    class="form-description"
                >Miễn phí trải nghiệm việc quản lý khách hàng trở nên dễ dàng hơn</div>
                <div class="form-group">
                    <label for>
                        Email
                        <span class="required-field">(*)</span>
                    </label>
                    <input
                        type="email"
                        class="form-control"
                        v-model="$v.form.email.$model"
                        placeholder="Nhập Email của bạn"
                    />
                    <div class="form-feedback" v-if="$v.form.$dirty">
                        <span v-if="!$v.form.email.required">Bạn chưa nhập email</span>
                        <span v-if="!$v.form.email.email">Bạn hãy nhập một địa chỉ email</span>
                    </div>
                </div>
                <div class="form-group">
                    <label for>
                        Mật khẩu
                        <span class="required-field">(*)</span>
                    </label>
                    <input
                        type="password"
                        class="form-control"
                        placeholder="Nhập mật khẩu"
                        v-model="$v.form.password.$model"
                    />
                    <div class="form-feedback" v-if="$v.form.$dirty">
                        <span v-if="!$v.form.password.required">Bạn chưa nhập mật khẩu</span>
                        <span
                            v-if="!$v.form.password.minLength"
                        >Mật khẩu phải có độ dài tối thiểu 8 kí tự</span>
                    </div>
                </div>
                <div class="form-group">
                    <label for>
                        Họ và tên
                        <span class="required-field">(*)</span>
                    </label>

                    <input
                        type="email"
                        class="form-control"
                        v-model="form.name"
                        placeholder="Nhập họ tên của bạn"
                    />
                    <div class="form-feedback" v-if="$v.form.$dirty">
                        <span v-if="!$v.form.name.required">Bạn chưa nhập họ tên</span>
                    </div>
                </div>
                <div class="form-group">
                    <label for>Số điện thoại</label>
                    <input
                        type="email"
                        class="form-control"
                        v-model="form.phone_number"
                        placeholder="Nhập Email của bạn"
                    />
                </div>
                <div class="form-group">
                    <button class="btn btn-action" @click.prevent="submit">Tạo tài khoản</button>
                </div>
                <div
                    class="form-feedback"
                    style="text-align:center;margin-top:5px"
                    v-if="errorEmail"
                >Địa chỉ email đã tồn tại</div>
                <div class="divider">
                    <hr />
                    <span>Hoặc</span>
                </div>
                <div class="form-group">
                    <button class="btn btn-social btn-fb">
                        <img src="@/assets/images/customer/icon-fb.png" alt />
                        <span>Đăng kí bằng tài khoản Facebook</span>
                    </button>
                </div>
                <div class="form-group">
                    <button class="btn btn-social btn-gg">
                        <img src="@/assets/images/customer/icon-gg.png" alt />
                        <span>Đăng kí bằng tài khoản Google</span>
                    </button>
                </div>
                <div class="register-link">
                    Bạn đã có tài khoản?
                    <router-link to="/customer/login">Đăng nhập</router-link>
                </div>
            </form>
        </section>
    </main>
</template>

<script>
import { register } from "@/api/company/user";
import { validationMixin } from "vuelidate";
import { required, email, minLength } from "vuelidate/lib/validators";

export default {
    mixins: [validationMixin],
    validations: {
        form: {
            email: {
                required,
                email
            },
            password: {
                required,
                minLength: minLength(8)
            },
            name: {
                required
            }
        }
    },

    data() {
        return {
            loading: false,
            form: {
                email: "",
                password: "",
                name: "",
                phone_number: ""
            },
            errorEmail: false,
            loading: false
        };
    },
    methods: {
        submit() {
            this.$v.form.$touch();
            if (this.$v.form.$anyError) {
                return;
            }
            this.register();
        },
        async register() {
            this.loading = true;
            try {
                let registerInfo = await register(this.form);
                this.loading = false;
                this.$router.push({
                    name: "email-confirmation",
                    params: { user_id: registerInfo.data.user_id }
                });
            } catch (error) {
                this.loading = false;
            }
        }
    }
};
</script>

<style>
</style>
