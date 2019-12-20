<template>
    <el-dialog
        :before-close="closeDialog"
        title="Menu"
        :visible.sync="showDialog"
        destroy-on-close
        width="30%"
        center
    >
        <el-tree
            v-if="showDialog"
            v-loading="loading"
            :data="menus"
            ref="tree"
            show-checkbox
            :default-checked-keys="defaultVal"
            node-key="id"
            :props="{children: 'children',label: 'name'}"
        ></el-tree>
        <span slot="footer" class="dialog-footer">
            <el-button @click="closeDialog">Hủy</el-button>
            <el-button :loading="btnLoading" @click="updateMenu" type="primary">Cập nhật</el-button>
        </span>
    </el-dialog>
</template>
<script>
import { getMenus } from "@/api/company/role";
import { updateMenu } from "@/api/company/role";
export default {
    props: ["showDialog", "menus", "id"],
    data() {
        return {
            loading: false,
            btnLoading: false,
            defaultVal: []
            // tmp: [...this.users]
        };
    },

    computed: {
        tmp() {
            return [...this.users];
        }
    },
    watch: {
        showDialog(val) {
            if (val) {
                this.getMenus();
            }
        }
    },
    methods: {
        closeDialog() {
            this.defaultVal = [];
            this.$emit("update:showDialog", false);
        },
        async getMenus() {
            try {
                this.loading = true;
                let request = await getMenus(this.id);
                this.defaultVal = request.data;
                this.loading = false;
            } catch (error) {
                this.loading = false;
                console.log(error);
            }
        },
        async updateMenu() {
            try {
                this.btnLoading = true;
                await updateMenu(
                    this.$refs["tree"]
                        .getCheckedNodes(false, true)
                        .map(item => item.id),
                    this.id
                );
                this.btnLoading = false;
                this.$message.success("Cập nhật thành công");
                this.closeDialog();
            } catch (error) {
                console.log(error);
                this.btnLoading = false;
            }
        }
    }
};
</script>
<style lang="">
</style>