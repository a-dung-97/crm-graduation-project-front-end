<template>
    <main
        class="container"
        v-loading.fullscreen.lock="loading"
        element-loading-text="Xin vui lòng chờ"
        element-loading-background="rgba(0, 0, 0, 0.8)"
    >
        <div class="service">
            <div class="service-img">
                <img src="@/assets/images/customer/vector image 6.svg" alt />
            </div>
            <div class="service-name">Personal</div>
            <p class="service-description">
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Molestiae error
                repudiandae magnam facere hic ipsa nihil, similique tenetur, tempore voluptatem minima
            </p>
            <div class="service-price">$19.00</div>
            <button class="btn btn-action" @click="setupOrganization(1)">Choose plan</button>
        </div>
        <div class="service">
            <div class="service-img">
                <img src="@/assets/images/customer/vector image 7.svg" alt />
            </div>
            <div class="service-name">Team</div>
            <p class="service-description">
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Molestiae error
                repudiandae magnam facere hic ipsa nihil, similique tenetur, tempore voluptatem minima
            </p>
            <div class="service-price">$99.00</div>
            <button class="btn btn-action" @click="setupOrganization(2)">Choose plan</button>
        </div>
        <div class="service">
            <div class="service-img">
                <img src="@/assets/images/customer/vector image 8.svg" alt />
            </div>
            <div class="service-name">Corporate</div>
            <p class="service-description">
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Molestiae error
                repudiandae magnam facere hic ipsa nihil, similique tenetur, tempore voluptatem minima
            </p>
            <div class="service-price">$199.00</div>
            <button class="btn btn-action" @click="setupOrganization(3)">Choose plan</button>
        </div>
    </main>
</template>

<script>
import { setup, refreshToken } from "@/api/user";
import { getToken, setToken, removeToken } from "@/utils/auth";
export default {
    props: ["form"],
    created() {
        if (!this.form) {
            this.$router.push("/");
        } else this.$emit("header", "service");
    },
    // beforeRouteLeave(to, from, next) {
    //     this.$emit("header", false);
    // },
    data() {
        return {
            loading: false
        };
    },
    methods: {
        async setupOrganization($id) {
            this.loading = true;
            try {
                this.form["service_id"] = $id;
                await setup(this.form);
                let data = await refreshToken();
                removeToken();
                this.$store.commit("user/SET_TOKEN", data.access_token);
                setToken(data.access_token);
                this.loading = false;
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
