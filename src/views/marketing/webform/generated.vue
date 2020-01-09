<template>
    <div>
        <p v-if="error">Bạn không có quyền sử dụng webform này</p>
        <Webform v-if="field" :field="field" :demo="false" :name="name" />
    </div>
</template>
<script>
import { getWebformFromIframe } from "@/api/marketing/webform";
import Webform from "@/components/Webform/index";
export default {
    components: { Webform },
    data() {
        return {
            url: "",
            error: false,
            field: "",
            name: ""
        };
    },
    methods: {
        async getWebform() {
            try {
                if (!this.$route.query.id) return;
                this.openFullScreen();

                const { data } = await getWebformFromIframe(
                    this.$route.query.id
                );
                this.closeFullScreen();
                if (new URL(data.url).hostname != new URL(this.url).hostname) {
                    this.error = true;
                    return;
                }
                this.field = data.field;
                this.name = data.name;
            } catch (error) {
                console.log(error);
                this.closeFullScreen();
            }
        }
    },
    created() {
        if (window.location == window.parent.location) {
            this.$router.push("/404");
        } else this.url = document.referrer;
        this.getWebform();
    }
};
</script>
<style lang="scss">
</style>