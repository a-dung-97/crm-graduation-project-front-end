<template>
    <div class="dashboard-container">
        <a
            href="https://drive.google.com/file/d/1dJHzHLnC0yEJw52hYBazctkT5PZF3awZ/view?usp=sharing"
        >Link báo cáo</a>
    </div>
</template>

<script>
import { test } from "@/api/test";
import { mapGetters } from "vuex";
export default {
    name: "Dashboard",
    data() {
        return {};
    },

    computed: {
        ...mapGetters(["name"])
    }
};
</script>

<style lang="scss" scoped>
.dashboard {
    &-container {
        margin: 30px;
    }
    &-text {
        font-size: 30px;
        line-height: 46px;
    }
}
.el-input__inner {
    border: none;
}
</style>