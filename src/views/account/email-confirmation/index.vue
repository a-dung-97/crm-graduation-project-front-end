<template>
    <div>
        <main
            class="container"
            v-loading.fullscreen.lock="loading"
            element-loading-text="Xin vui lòng chờ"
            element-loading-background="rgba(0, 0, 0, 0.8)"
        >
            <aside>
                <img src="@/assets/images/account/vector image 4.svg" style="width:410px" alt />
                <p>Xác nhận địa chỉ email của bạn!</p>
            </aside>
            <section class="email-confirmation">
                <form action>
                    <div class="form-title">Xác nhận email</div>
                    <div
                        class="form-description"
                    >Vui lòng kiểm tra email và click vào link để xác nhận tài khoản của bạn!</div>

                    <div class="form-group">
                        <button class="btn btn-action" @click.prevent="resend">Gửi lại email</button>
                    </div>
                    <div class="form-group">
                        <button class="btn btn-action" @click.prevent="$router.push('/')">Đăng nhập</button>
                    </div>
                    <div class="form-group">
                        <button class="btn btn-social">
                            <span>Liên hệ hỗ trợ</span>
                        </button>
                    </div>
                </form>
            </section>
        </main>
    </div>
</template>

<script>
import { resendEmail } from "@/api/company/user";
export default {
    props: ["user_id"],
    data() {
        return {
            loading: false
        };
    },
    created() {
        if (!this.user_id) this.$router.push("/");
    },
    methods: {
        async resend() {
            this.loading = true;
            try {
                await resendEmail(this.user_id);
                this.loading = false;
                this.$message({
                    message: "Gửi lại email xác nhận thành công",
                    type: "success"
                });
            } catch (error) {
                console.log(error.response.data);
                this.loading = false;
            }
        }
    }
};
</script>

<style>
</style>
