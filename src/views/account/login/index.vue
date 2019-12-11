<template>
    <main
        class="container"
        v-loading.fullscreen.lock="loading"
        element-loading-text="Xin vui lòng chờ"
        element-loading-background="rgba(0, 0, 0, 0.8)"
    >
        <aside>
            <img src="@/assets/images/account/vector image 7.svg" alt />
            <p>Quản lý và chăm sóc khách hàng toàn diện!</p>
        </aside>
        <section class="login">
            <form action>
                <div class="form-title">Đăng nhập</div>
                <div class="form-description">Vui lòng đăng nhập để sử dụng dịch vụ</div>
                <div class="form-group">
                    <label for>Email</label>
                    <input
                        type="email"
                        class="form-control"
                        placeholder="Nhập Email của bạn"
                        v-model="$v.form.email.$model"
                    />
                    <div class="form-feedback" v-if="$v.form.$dirty">
                        <span v-if="!$v.form.email.required">Bạn chưa nhập email</span>
                        <span v-if="!$v.form.email.email">Bạn hãy nhập một địa chỉ email</span>
                    </div>
                </div>
                <div class="form-group">
                    <label for>
                        <div>
                            Mật khẩu
                            <a @click="showDialog=true">Quên mật khẩu?</a>
                        </div>
                    </label>
                    <input
                        type="password"
                        class="form-control"
                        placeholder="Nhập mật khẩu"
                        v-model="$v.form.password.$model"
                    />
                    <div class="form-feedback" v-if="$v.form.$dirty">
                        <span v-if="!$v.form.password.required">Bạn chưa nhập mật khẩu</span>
                    </div>
                </div>
                <div class="form-group">
                    <button class="btn btn-action" @click.prevent="submit">Đăng nhập</button>
                </div>
                <div
                    class="form-feedback"
                    style="text-align:center;margin-top:5px"
                    v-if="error"
                >Sai địa chỉ email hoặc mật khẩu</div>
                <div class="divider">
                    <hr />
                    <span>Hoặc</span>
                </div>
                <div class="form-group">
                    <button class="btn btn-social btn-fb">
                        <img src="@/assets/images/account/icon-fb.png" alt />
                        <span>Đăng nhập bằng tài khoản Facebook</span>
                    </button>
                </div>
                <div class="form-group">
                    <button class="btn btn-social btn-gg">
                        <img src="@/assets/images/account/icon-gg.png" alt />
                        <span>Đăng nhập bằng tài khoản Google</span>
                    </button>
                </div>
                <div class="register-link">
                    Bạn không có tài khoản?
                    <router-link to="/account/register">Đăng kí tài khoản</router-link>
                </div>
            </form>
        </section>
        <ResetPassword :show-dialog.sync="showDialog" />
    </main>
</template>

<script>
import { validationMixin } from "vuelidate";
import { required, email } from "vuelidate/lib/validators";
import ResetPassword from "./components/ResetPassword";
export default {
    mixins: [validationMixin],
    validations: {
        form: {
            email: {
                required,
                email
            },
            password: {
                required
            }
        }
    },
    components: { ResetPassword },
    data() {
        return {
            loading: false,
            showDialog: false,
            form: {
                email: "dungnknd97@gmail.com",
                password: "12345678"
            },
            error: false
        };
    },
    methods: {
        async sendEmailPasswordReset() {
            await this.$refs["form"].validate();
        },
        submit() {
            this.$v.form.$touch();
            if (this.$v.form.$anyError) {
                return;
            }
            this.loading = true;
            this.login();
        },
        login() {
            this.$store
                .dispatch("user/login", this.form)
                .then(() => {
                    this.$router.push({
                        path: this.redirect || "/",
                        query: this.otherQuery
                    });
                    this.loading = false;
                })
                .catch(error => {
                    if (error.response.status === 401) {
                        this.loading = false;
                        this.$message.error("Sai tài khoản hoặc mật khẩu");
                    } else
                        this.$router.push({
                            name: "email-confirmation",
                            params: {
                                user_id: error.response.data.data.user_id
                            }
                        });
                });
        }
    },
    created() {
        if (process.env.NODE_ENV == "production") {
            this.form.email = "";
            this.form.password = "";
        }
    }
};
</script>

<style lang="scss">
</style>
