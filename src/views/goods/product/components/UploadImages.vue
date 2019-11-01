<template>
    <vue-upload-multiple-image
        @upload-success="uploadImageSuccess"
        @before-remove="beforeRemove"
        @edit-image="editImage"
        @mark-is-primary="markIsPrimary"
        :data-images="images"
        idUpload="myIdUpload"
        editUpload="myIdEdit"
    ></vue-upload-multiple-image>
</template>

<script>
import VueUploadMultipleImage from "vue-upload-multiple-image";
import axios from "axios";
export default {
    props: ["images"],
    components: {
        VueUploadMultipleImage
    },
    methods: {
        uploadImageSuccess(formData, index, fileList) {
            this.$emit("handle-upload", fileList);
        },
        async beforeRemove(index, done, fileList) {
            await this.$confirm("Bạn có muốn xóa ảnh này?", "Cảnh báo", {
                confirmButtonText: "OK",
                cancelButtonText: "Cancel",
                type: "warning"
            });
            done();
            this.$emit("handle-upload", fileList);
        },
        editImage(formData, index, fileList) {
            this.$emit("handle-upload", fileList);
        },
        markIsPrimary(index, fileList) {
            this.$emit("handle-upload", fileList);
        }
    }
};
</script>

<style scoped>
#my-strictly-unique-vue-upload-multiple-image {
    font-family: "Avenir", Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    text-align: center;
    color: #2c3e50;
    margin-top: 60px;
}

h1,
h2 {
    font-weight: normal;
}

ul {
    list-style-type: none;
    padding: 0;
}

li {
    display: inline-block;
    margin: 0 10px;
}

a {
    color: #42b983;
}
</style>