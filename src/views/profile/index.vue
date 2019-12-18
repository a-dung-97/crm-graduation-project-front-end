<template>
    <div class="app-container">
        <div v-if="user">
            <el-row :gutter="20">
                <el-col :span="6" :xs="24">
                    <user-card :user="user" />
                </el-col>

                <el-col :span="18" :xs="24">
                    <el-card>
                        <el-tabs v-model="activeTab">
                            <el-tab-pane label="Tài khoản" name="account">
                                <account :user="user" />
                            </el-tab-pane>
                            <el-tab-pane label="Email" name="email">
                                <Email />
                            </el-tab-pane>
                        </el-tabs>
                    </el-card>
                </el-col>
            </el-row>
        </div>
    </div>
</template>

<script>
import { mapGetters } from "vuex";
import UserCard from "./components/UserCard";
import Company from "./components/Company";
import Account from "./components/Account";
import Email from "./components/Email";

export default {
    name: "Profile",
    components: { Company, Account, UserCard, Email },
    data() {
        return {
            user: {},
            activeTab: "account"
        };
    },
    computed: {
        ...mapGetters([
            "id",
            "name",
            "avatar",
            "roles",
            "position",
            "department",
            "phone_number",
            "email"
        ])
    },
    created() {
        this.getUser();
    },
    methods: {
        getUser() {
            this.user = {
                id: this.id,
                name: this.name,
                role: this.roles.join(" | "),
                email: this.email,
                avatar: this.avatar,
                phone_number: this.phone_number,
                position: this.position,
                department: this.department
            };
        }
    }
};
</script>
