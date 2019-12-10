<template>
    <div
        v-loading.fullscreen.lock="fullscreenLoading"
        class="main-article"
        element-loading-text="Efforts to generate PDF"
    >
        <div v-html="content" />
    </div>
</template>

<script>
export default {
    props: ["content"],
    data() {
        return {
            article: "",
            fullscreenLoading: false
        };
    },
    created() {
        //if (!this.content) this.$router.push("/404");
    },
    methods: {
        // fetchData() {
        //     import("./content.js").then(data => {
        //         const { title } = data.default;
        //         document.title = title;
        //         this.article = data.default;
        //         setTimeout(() => {
        //             this.fullscreenLoading = false;
        //             this.$nextTick(() => {
        //                 window.print();
        //             });
        //         }, 3000);
        //     });
        // }
    }
};
</script>

<style lang="scss">
</style>