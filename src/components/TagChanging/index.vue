<template>
    <span style="margin-left:10px">
        <el-dropdown
            @command="handleCommand"
            size="small"
            disabled
            split-button
            trigger="click"
            type="primary"
        >
            Tag
            <el-dropdown-menu slot="dropdown">
                <el-dropdown-item :disabled="objs.length==0" :command="true">Thêm tag</el-dropdown-item>
                <el-dropdown-item :disabled="objs.length==0" :command="false">Xóa tag</el-dropdown-item>
            </el-dropdown-menu>
        </el-dropdown>
        <el-dialog
            :title="isCreating ? 'Thêm tag' : 'Xóa tag'"
            :visible.sync="showDialog"
            :before-close="()=>tag=[]"
            width="30%"
        >
            <el-select
                v-model="tags"
                class="w-100"
                multiple
                filterable
                remote
                reserve-keyword
                :remote-method="remoteMethod"
                :allow-create="isCreating"
                placeholder="Chọn tag"
                :loading="loading"
            >
                <el-option
                    v-for="item in options"
                    :key="item.id"
                    :label="item.name"
                    :value="item.name"
                ></el-option>
            </el-select>
            <span slot="footer" class="dialog-footer">
                <el-button size="medium" @click="showDialog = false">Hủy</el-button>
                <el-button size="medium" v-if="isCreating" type="primary" @click="changeTags">Thêm</el-button>
                <el-button size="medium" v-else type="danger" @click="deleteTags">Xóa</el-button>
            </span>
        </el-dialog>
    </span>
</template>
<script>
import { deleteTags, changeTags, index } from "@/api/general/tag";
export default {
    props: ["type", "objs"],
    data() {
        return {
            tags: [],
            options: [],
            showDialog: false,
            title: "",
            loading: false,
            isCreating: true
        };
    },
    methods: {
        handleCommand(val) {
            this.isCreating = val;
            this.title = this.showDialog = true;
        },
        async remoteMethod(query) {
            if (query !== "") {
                this.loading = true;
                const { data } = await index(this.type, query);
                this.options = data;
                this.loading = false;
            } else {
                this.options = [];
            }
        },
        async deleteTags() {
            try {
                await this.$confirm("Bạn có muốn xóa các tag này");
                this.openFullScreen();
                await deleteTags(
                    {
                        tags: this.tags,
                        objects: this.objs.map(item => item.id)
                    },
                    this.type
                );
                this.showDialog = false;
                this.$message.success("Xóa tag thành công");
                this.closeFullScreen();
            } catch (error) {
                console.log(error);
                this.closeFullScreen();
            }
        },

        async changeTags() {
            try {
                this.openFullScreen();
                await changeTags(
                    {
                        tags: this.tags,
                        objects: this.objs.map(item => item.id)
                    },
                    this.type
                );
                this.closeFullScreen();
                this.showDialog = false;
                this.$message.success("Thêm tag thành công");
            } catch (error) {
                console.log(error);
                this.closeFullScreen();
            }
        }
    }
};
</script>