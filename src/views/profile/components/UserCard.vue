<template>
    <el-card style="margin-bottom:20px;">
        <div slot="header" class="clearfix text-center">
            <span>Thông tin tài khoản</span>
        </div>
        <!-- <iframe
            width="450px"
            height="600px"
            src="https://crmviet.net/webform/generated/241/9e25a7c4-f549-11e9-8cea-02aa8ad70798"
        ></iframe>-->
        <div class="user-profile">
            <div class="box-center avatar">
                <el-avatar
                    :src="user.avatar||`https://ui-avatars.com/api/?name=${$store.getters.name}`"
                    icon="el-icon-user-solid"
                    :size="150"
                ></el-avatar>
                <el-button
                    class="btn-avatar btn-hidden"
                    type="primary"
                    icon="el-icon-edit"
                    @click="handleUpload"
                    circle
                ></el-button>
                <el-button
                    v-if="isSelectedImage"
                    :loading="loading"
                    class="btn-avatar btn-submit"
                    type="success"
                    icon="el-icon-check"
                    @click="changeAvatar"
                    circle
                ></el-button>
                <input
                    ref="upload-image"
                    @change="onImageChange($event)"
                    class="upload-image"
                    type="file"
                />
            </div>
            <div class="box-center">
                <div class="user-name text-center">{{ user.name }}</div>
            </div>
        </div>

        <div class="user-bio">
            <div class="user-bio-section">
                <div class="user-bio-section-header">
                    <svg-icon icon-class="education" />
                    <span>{{ user.position }}</span>
                </div>
            </div>
            <div class="user-bio-section">
                <div class="user-bio-section-header">
                    <svg-icon icon-class="education" />
                    <span>{{ user.role|uppercaseFirst }}</span>
                </div>
            </div>
            <div class="user-bio-section">
                <div class="user-bio-section-header">
                    <svg-icon icon-class="skill" />
                    <span>{{ user.department||'Công ty' }}</span>
                </div>
            </div>
        </div>
    </el-card>
</template>

<script>
import { changeAvatar } from "@/api/company/user";
export default {
    filters: {
        uppercaseFirst(string) {
            return string.charAt(0).toUpperCase() + string.slice(1);
        }
    },
    props: {
        user: {
            type: Object,
            default: () => {
                return {
                    name: "",
                    position: "",
                    department: "",
                    roles: "",
                    avatar: ""
                };
            }
        }
    },
    data() {
        return {
            loading: false,
            isSelectedImage: false
        };
    },
    methods: {
        handleUpload() {
            this.$refs["upload-image"].click();
        },
        onImageChange(e) {
            this.isSelectedImage = true;
            let files = e.target.files || e.dataTransfer.files;
            if (!files.length) {
                this.isSelectedImage = false;
                return;
            }
            if (!/\.(png|jpg)$/.test(files[0].name)) {
                this.$message.error("Hãy upload file jpg hoặc png");
                this.isSelectedImage = false;
                return;
            }
            this.createImage(files[0]);
        },
        createImage(file) {
            let reader = new FileReader();
            let vm = this;
            reader.onload = e => {
                vm.user.avatar = e.target.result;
            };
            reader.readAsDataURL(file);
        },
        async changeAvatar() {
            try {
                this.loading = true;
                let newAvatar = await changeAvatar({
                    avatar: this.user.avatar
                });
                this.isSelectedImage = false;
                this.loading = false;
                this.$store.commit("user/SET_AVATAR", newAvatar.data.avatar);
                this.$message.success("Cập nhật avatar thành công!");
            } catch (error) {
                this.loading = false;
            }
        }
    }
};
</script>

<style lang="scss" scoped>
.box-center {
    margin: 0 auto;
    display: table;
}

.text-muted {
    color: #777;
}

.user-profile {
    .user-name {
        font-weight: bold;
    }

    .box-center {
        padding-top: 10px;
    }

    .user-role {
        padding-top: 10px;
        font-weight: 400;
        font-size: 14px;
    }

    .box-social {
        padding-top: 30px;

        .el-table {
            border-top: 1px solid #dfe6ec;
        }
    }

    .user-follow {
        padding-top: 20px;
    }
}

.user-bio {
    margin-top: 20px;
    color: #606266;

    span {
        padding-left: 4px;
    }

    .user-bio-section {
        font-size: 14px;
        // padding: 5px 0;

        .user-bio-section-header {
            // border-bottom: 1px solid #dfe6ec;
            padding-bottom: 10px;
            margin-bottom: 10px;
            font-weight: bold;
        }
    }
}
.avatar {
    position: relative;
    &:hover {
        .btn-hidden {
            visibility: visible;
            opacity: 1;
        }
    }
    .btn-avatar {
        position: absolute;
        top: 66px;
        left: 56px;
    }
    .btn-hidden {
        visibility: hidden;
        transition: 0.2s linear;
        opacity: 0;
    }
    .btn-submit {
        top: 114px;
        left: 46px;
    }
}
.upload-image {
    display: none;
    z-index: -9999;
}
</style>
