<template>
    <div class="dashboard-container">
        <el-select class="abc">
            <el-select style="width:100px;" slot="prefix"></el-select>
        </el-select>
    </div>
</template>

<script>
import { test } from "@/api/test";
import { mapGetters } from "vuex";
export default {
    name: "Dashboard",
    data() {
        return {
            select: "",
            options: [
                {
                    id: 1,
                    type: "user",
                    name: "AD"
                }
            ]
        };
    },
    methods: {
        async test() {
            console.log(this.select);
            const data = await test({ options: this.select });
            console.log(data);
        }
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