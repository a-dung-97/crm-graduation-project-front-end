<template>
    <el-card>
        <el-row>
            <el-col :span="18">
                <TagArea type="contact" />
            </el-col>
            <el-col :span="6">
                <el-button
                    class="fr"
                    @click="$router.push(`/customer/contact/edit/${$route.params.id}`)"
                    type="primary"
                    size="small"
                >Sửa</el-button>
            </el-col>
        </el-row>
        <h3 class="title">Thông tin liên hệ</h3>
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
                        <p class="my-label">Họ tên</p>
                    </el-col>
                    <el-col :span="14">
                        <p class="content">{{ data.name}}</p>
                    </el-col>
                </el-row>
                <el-row class="item">
                    <el-col :span="10">
                        <p class="my-label">Email</p>
                    </el-col>
                    <el-col :span="14">
                        <p class="content">{{ data.email }}</p>
                    </el-col>
                </el-row>
                <el-row class="item">
                    <el-col :span="10">
                        <p class="my-label">Sinh nhật</p>
                    </el-col>
                    <el-col :span="14">
                        <p class="content">{{ data.birthday|date }}</p>
                    </el-col>
                </el-row>
                <el-row class="item">
                    <el-col :span="10">
                        <p class="my-label">Giới tính</p>
                    </el-col>
                    <el-col :span="14">
                        <p class="content">{{ data.gender?'Nam':'Nữ' }}</p>
                    </el-col>
                </el-row>

                <el-row class="item">
                    <el-col :span="10">
                        <p class="my-label">Chức vụ</p>
                    </el-col>
                    <el-col :span="14">
                        <p class="content">{{ data.position }}</p>
                    </el-col>
                </el-row>
                <el-row class="item">
                    <el-col :span="10">
                        <p class="my-label">Phòng ban</p>
                    </el-col>
                    <el-col :span="14">
                        <p class="content">{{ data.department }}</p>
                    </el-col>
                </el-row>
                <el-row class="item">
                    <el-col :span="10">
                        <p class="my-label">Ngày tạo</p>
                    </el-col>
                    <el-col :span="14">
                        <p class="content">{{ data.created_at|datetime }}</p>
                    </el-col>
                </el-row>
                <el-row class="item">
                    <el-col :span="10">
                        <p class="my-label">Người tạo</p>
                    </el-col>
                    <el-col :span="14">
                        <p class="content">{{ data.created_by }}</p>
                    </el-col>
                </el-row>
            </el-col>
            <el-col :span="12">
                <el-row class="item">
                    <el-col :span="10">
                        <p class="my-label">Số điện thoại</p>
                    </el-col>
                    <el-col :span="14">
                        <p class="content">{{ data.phone_number }}</p>
                    </el-col>
                </el-row>
                <el-row class="item">
                    <el-col :span="10">
                        <p class="my-label">Số di động</p>
                    </el-col>
                    <el-col :span="14">
                        <p class="content">{{ data.mobile_number }}</p>
                    </el-col>
                </el-row>
                <el-row class="item">
                    <el-col :span="10">
                        <p class="my-label">Fax</p>
                    </el-col>
                    <el-col :span="14">
                        <p class="content">{{ data.fax }}</p>
                    </el-col>
                </el-row>
                <el-row class="item">
                    <el-col :span="10">
                        <p class="my-label">Facebook</p>
                    </el-col>
                    <el-col :span="14">
                        <p class="content">{{ data.facebook }}</p>
                    </el-col>
                </el-row>
                <el-row class="item">
                    <el-col :span="10">
                        <p class="my-label">Skype</p>
                    </el-col>
                    <el-col :span="14">
                        <p class="content">{{ data.skype }}</p>
                    </el-col>
                </el-row>
                <el-row class="item">
                    <el-col :span="10">
                        <p class="my-label">Địa chỉ văn phòng</p>
                    </el-col>
                    <el-col :span="14">
                        <p class="content">{{ data.office_address }}</p>
                    </el-col>
                </el-row>
                <el-row class="item">
                    <el-col :span="10">
                        <p class="my-label">Liên hệ chính</p>
                    </el-col>
                    <el-col :span="14">
                        <p class="content">
                            <i v-if="data.primary" style="color:#34910db" class="el-icon-check"></i>
                        </p>
                    </el-col>
                </el-row>

                <el-row class="item">
                    <el-col :span="10">
                        <p class="my-label">Cập nhật lần cuối lúc</p>
                    </el-col>
                    <el-col :span="14">
                        <p class="content">{{ data.updated_at|datetime }}</p>
                    </el-col>
                </el-row>
                <el-row class="item">
                    <el-col :span="10">
                        <p class="my-label">Người cập nhật</p>
                    </el-col>
                    <el-col :span="14">
                        <p class="content">{{ data.updated_by }}</p>
                    </el-col>
                </el-row>
            </el-col>
        </el-row>
        <h3 class="title">Mô tả</h3>
        <el-row>
            <el-col :span="24">
                <p class="content">{{ data.description }}</p>
            </el-col>
        </el-row>
    </el-card>
</template>
<script>
import TagArea from "@/components/TagArea/index";
import { show } from "@/api/customer/contact";
export default {
    components: { TagArea },
    data() {
        return {
            data: ""
        };
    },
    methods: {
        async getCustomer() {
            try {
                this.openFullScreen();
                const { data } = await show(this.$route.params.id);
                this.data = data;
                this.closeFullScreen();
            } catch (error) {
                console.log(error);
                this.closeFullScreen();
            }
        }
    },
    created() {
        this.getCustomer();
    }
};
</script>
<style lang="css" scoped>
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