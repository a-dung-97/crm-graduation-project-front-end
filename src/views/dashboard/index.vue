<template>
    <div class="dashboard-container"></div>
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