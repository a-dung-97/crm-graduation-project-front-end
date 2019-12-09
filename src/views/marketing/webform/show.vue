<template>
    <div class="app-container">
        <el-card>
            <h3 class="title">
                Thông tin webform
                <el-button
                    class="fr"
                    @click="$router.push('/marketing/webform/edit/'+$route.params.id)"
                    type="primary"
                    size="small"
                    icon="el-icon-edit"
                    circle
                ></el-button>
            </h3>
            <el-row>
                <el-col :span="12">
                    <el-row class="item">
                        <el-col :span="10">
                            <p class="my-label">Chủ sở hữu</p>
                        </el-col>
                        <el-col :span="14">
                            <p class="content">{{ data.owner }}</p>
                        </el-col>
                    </el-row>
                    <el-row class="item">
                        <el-col :span="10">
                            <p class="my-label">Tên</p>
                        </el-col>
                        <el-col :span="14">
                            <p class="content">{{ data.name}}</p>
                        </el-col>
                    </el-row>
                    <el-row class="item">
                        <el-col :span="10">
                            <p class="my-label">Chiến dịch</p>
                        </el-col>
                        <el-col :span="14">
                            <p class="content">{{ data.campaign }}</p>
                        </el-col>
                    </el-row>
                    <el-row class="item">
                        <el-col :span="10">
                            <p class="my-label">Ngôn ngữ</p>
                        </el-col>
                        <el-col :span="14">
                            <p class="content">{{ data.language==1?'Tiếng Việt':'English' }}</p>
                        </el-col>
                    </el-row>
                    <el-row class="item">
                        <el-col :span="10">
                            <p class="my-label">Tên miền</p>
                        </el-col>
                        <el-col :span="14">
                            <p class="content">{{ data.url }}</p>
                        </el-col>
                    </el-row>
                    <el-row class="item">
                        <el-col :span="10">
                            <p class="my-label">URL điều hướng</p>
                        </el-col>
                        <el-col :span="14">
                            <p class="content">{{ data.redirect_url }}</p>
                        </el-col>
                    </el-row>
                    <el-row class="item">
                        <el-col :span="10">
                            <p class="my-label">Chiều rộng</p>
                        </el-col>
                        <el-col :span="14">
                            <p class="content">{{ data.width }}</p>
                        </el-col>
                    </el-row>
                    <el-row class="item">
                        <el-col :span="10">
                            <p class="my-label">Chiều cao</p>
                        </el-col>
                        <el-col :span="14">
                            <p class="content">{{ data.height }}</p>
                        </el-col>
                    </el-row>
                </el-col>
                <el-col :span="12">
                    <Webform v-if="data" :field="data.field" :name="data.name" :demo="true" />
                </el-col>
            </el-row>
            <h3 class="title">
                Mã nhúng
                <el-button
                    class="fr"
                    @click="copy(code,$event)"
                    type="primary"
                    size="small"
                    icon="el-icon-document-copy"
                    circle
                ></el-button>
            </h3>
            <el-row>
                <el-input v-model="code" disabled type="textarea"></el-input>
            </el-row>
        </el-card>
    </div>
</template>
<script>
import { show } from "@/api/marketing/webform";
import Webform from "@/components/Webform/index";
import copy from "@/utils/clipboard";

export default {
    components: { Webform },
    data() {
        return {
            data: "",
            code: ""
        };
    },
    methods: {
        copy(text, event) {
            copy(text, event);
        },
        async getWebform() {
            try {
                this.openFullScreen();
                const { data } = await show(this.$route.params.id);
                this.data = data;
                this.code = `<iframe src="${process.env.VUE_APP_BASE}webform/${data.id}" width="${data.width}" height="${data.height}" frameborder="0"></iframe>`;
                this.closeFullScreen();
            } catch (error) {
                console.log(error);
                this.closeFullScreen();
            }
        }
    },
    created() {
        this.getWebform();
    }
};
</script>
<style lang="scss">
.my-label {
    color: gray;
}
.content,
.my-label {
    margin-top: 13px;
    margin-bottom: 13px;
}
.item {
    border-bottom: 1px solid #ecf0f1;
}
.title {
    margin-bottom: 10px;
    height: 32px;
}
.infomation {
    margin-top: 10px;
    font-size: 14px;
    color: #7f10c10d;
}
.infomation i {
    padding-right: 5px;
}
</style>