<template>
    <div>
        <el-tree :default-expand-all="true" :data="data" :props="defaultProps"></el-tree>
    </div>
</template>
<script>
export default {
    props: ["data"],
    data() {
        return {
            defaultProps: {
                children: "children_recursive",
                label: "name"
            }
        };
    },
    methods: {
        handleNodeClick(data) {
            console.log(data);
        }
    }
};
</script>
<style lang="">
</style>