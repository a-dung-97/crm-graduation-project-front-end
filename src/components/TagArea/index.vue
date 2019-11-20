<template>
    <div>
        <i v-if="dynamicTags.length==0" class="el-icon-price-tag tag-icon"></i>
        <el-tag
            :key="tag"
            v-for="tag in dynamicTags"
            closable
            :disable-transitions="false"
            @close="handleClose(tag)"
        >{{tag}}</el-tag>
        <el-button
            icon="el-icon-plus"
            style="margin-left:10px"
            v-if="!inputVisible"
            type="primary"
            size="small"
            @click="inputVisible=true"
            circle
        ></el-button>
        <template v-else>
            <el-select
                v-model="inputValue"
                size="small"
                class="input-new-tag"
                multiple
                filterable
                remote
                reserve-keyword
                :remote-method="remoteMethod"
                allow-create
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
            <el-button
                style="margin-left:10px"
                icon="el-icon-check"
                size="small"
                type="success"
                circle
                @click="changeTags"
            ></el-button>
            <el-button icon="el-icon-close" @click="resetInput" size="small" type="danger" circle></el-button>
        </template>
    </div>
</template>
<script>
import { deleteTag, changeTags, index, getTags } from "@/api/general/tag";
export default {
    props: ["type"],
    data() {
        return {
            options: [],
            dynamicTags: [],
            inputVisible: false,
            inputValue: "",
            loading: false
        };
    },
    methods: {
        async getTags() {
            try {
                const { data } = await getTags(
                    this.type,
                    this.$route.params.id
                );
                this.dynamicTags = data.map(item => item.name);
            } catch (error) {
                console.log(error);
            }
        },
        async handleClose(tag) {
            try {
                await this.$confirm("Bạn có muốn xóa tag này", "Xác nhận xóa");
                this.openFullScreen();
                await deleteTag(tag, this.type, this.$route.params.id);
                this.dynamicTags.splice(this.dynamicTags.indexOf(tag), 1);
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
                    this.inputValue,
                    this.type,
                    this.$route.params.id
                );
                await this.getTags();
                this.closeFullScreen();
                this.resetInput();
                this.$message.success("Thêm tag thành công");
            } catch (error) {
                console.log(error);
            }
        },
        resetInput() {
            this.inputVisible = false;
            this.inputValue = [];
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
        }
    },
    created() {
        this.getTags();
    }
};
</script>
<style>
.el-tag + .el-tag {
    margin-left: 10px;
}
.tag-icon {
    font-size: 17px;
    color: #3498db;
}
.button-new-tag {
    margin-left: 10px;
    height: 32px;
    line-height: 30px;
    padding-top: 0;
    padding-bottom: 0;
}
.input-new-tag {
    margin-left: 10px;
    width: 250px;
    vertical-align: bottom;
}
</style>