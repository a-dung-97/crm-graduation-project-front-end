<template>
    <el-dialog
        width="30%"
        center
        title="Tải lên"
        :before-close="closeDialog"
        :visible.sync="showDialog"
    >
        <el-upload
            style="text-align:center"
            :headers="{Authorization:'Bearer '+$store.getters.token}"
            ref="upload"
            drag
            :auto-upload="false"
            :on-change="handleChange"
            :action="action"
            :file-list="fileList"
            multiple
        >
            <i class="el-icon-upload"></i>
            <div class="el-upload__text">
                Kéo tệp vào đây hoặc
                <em>ấn để upload</em>
            </div>
            <!-- <div class="el-upload__tip" slot="tip">jpg/png files with a size less than 500kb</div> -->
        </el-upload>
        <span slot="footer" class="dialog-footer">
            <el-button @click="closeDialog">Hủy</el-button>
            <el-button type="primary" :loading="loading" @click="submitUpload">Cập nhật</el-button>
        </span>
    </el-dialog>
</template>
<script>
export default {
    props: ["showDialog", "type"],
    data() {
        return {
            loading: false,
            fileList: [],
            addDataFunc: "",
            action: ""
        };
    },
    methods: {
        closeDialog() {
            this.$emit("update:showDialog", false);
            this.fileList = [];
        },
        addFileByType() {
            this.action = `${process.env.VUE_APP_BASE_API}files/${this.type}/${this.$route.params.id}`;
        },
        async createData() {
            try {
                await this.$refs["form"].validate();
                this.loading = true;
                await this.addDataFunc(this.form, this.$route.params.id);
                this.reload();
            } catch (error) {
                this.loading = false;
            }
        },
        reload() {
            this.loading = false;
            this.$message.success("Tải file lên thành công");
            this.closeDialog();
            this.$emit("reload");
        },
        handleChange(file, fileList) {
            if (fileList.findIndex(file => file.status == "ready") == -1)
                this.reload();
        },
        submitUpload() {
            this.loading = true;
            this.$refs.upload.submit();
        }
    },
    created() {
        this.addFileByType();
    }
};
</script>
<style lang="">
</style>