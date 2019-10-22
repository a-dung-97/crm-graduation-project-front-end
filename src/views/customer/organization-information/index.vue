<template>
    <main
        class="container"
        v-loading.fullscreen.lock="loading"
        element-loading-text="Xin vui lòng chờ"
        element-loading-background="rgba(0, 0, 0, 0.8)"
    >
        <aside>
            <img
                src="@/assets/images/customer/vector image 5.svg"
                style="width:490px;margin-top:50px"
                alt
            />
        </aside>
        <section class="organization-information" style="padding-top:218px">
            <form action>
                <div class="form-title">Thông tin công ty của bạn</div>
                <div class="form-description">Nhập thông tin về công ty của bạn</div>
                <div class="form-group">
                    <input
                        type="text"
                        class="form-control"
                        v-model="$v.form.name.$model"
                        placeholder="Nhập tên công ty"
                    />
                    <div class="form-feedback" v-if="$v.form.$dirty">
                        <span v-if="!$v.form.name.required">Bạn chưa nhập tên công ty</span>
                    </div>
                </div>

                <div class="form-group">
                    <input
                        type="text"
                        class="form-control"
                        v-model="$v.form.address.$model"
                        placeholder="Nhập địa chỉ công ty"
                    />
                    <div class="form-feedback" v-if="$v.form.$dirty">
                        <span v-if="!$v.form.address.required">Bạn chưa nhập địa chỉ công ty</span>
                    </div>
                </div>
                <div class="form-group">
                    <button class="btn btn-action" @click.prevent="submit">Bắt đầu ngay</button>
                </div>
            </form>
        </section>
    </main>
</template>

<script>
import { setup, refreshToken } from "@/api/user";
import { getToken, setToken, removeToken } from "@/utils/auth";
import { validationMixin } from "vuelidate";
import { required, minLength, maxLength } from "vuelidate/lib/validators";
export default {
    mixins: [validationMixin],
    validations: {
        form: {
            name: {
                required
            },
            address: {
                required
            }
        }
    },
    data() {
        return {
            form: {
                name: "",
                address: ""
            },
            loading: false
        };
    },
    created() {
        if (this.$store.getters.roles.length > 0) this.$router.push("/");
        else this.$emit("header", "name");
    },
    methods: {
        submit() {
            this.$v.form.$touch();
            if (this.$v.form.$anyError) {
                return;
            }
            this.setup();
        },
        async setup() {
            this.loading = true;
            try {
                await setup(this.form);
                let data = await refreshToken();
                removeToken();
                this.$store.commit("user/SET_TOKEN", data.access_token);
                setToken(data.access_token);
                this.loading = false;
                this.$emit("header", false);
                this.$router.push("/");
            } catch (error) {
                this.loading = false;
            }
        }
    }
};
</script>

<style>
</style>
