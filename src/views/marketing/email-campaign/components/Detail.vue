<template>
    <el-row>
        <h3 class="title">
            Danh sách email gửi - {{ event.label }}
            <el-input
                size="small"
                placeholder="Tìm kiếm theo tên hoặc email"
                style="width:300px"
                v-model="params.search"
                clearable
                class="fr"
            >
                <el-button slot="append" @click="getData" icon="el-icon-search"></el-button>
            </el-input>
        </h3>
        <el-table height="400px" :data="tableData" v-loading="loading" style="width: 100%">
            <el-table-column width="200" prop="name" label="Tên"></el-table-column>
            <el-table-column width="150" prop="type" label="Loại"></el-table-column>
            <el-table-column width="220" prop="email" label="Email"></el-table-column>
            <el-table-column prop="delivered" align="center" label="Đã nhận">
                <template slot-scope="scope">
                    <i style="color:#2ecc71" class="el-icon-check" v-if="scope.row.delivered"></i>
                    <i style="color:#e74c3c" class="el-icon-close" v-else></i>
                </template>
            </el-table-column>
            <el-table-column prop="opened" align="center" label="Mở">
                <template slot-scope="scope">
                    <i style="color:#2ecc71" class="el-icon-check" v-if="scope.row.opened"></i>
                    <i style="color:#e74c3c" class="el-icon-close" v-else></i>
                </template>
            </el-table-column>
            <el-table-column prop="clicked" align="center" label="Click">
                <template slot-scope="scope">
                    <i style="color:#2ecc71" class="el-icon-check" v-if="scope.row.clicked"></i>
                    <i style="color:#e74c3c" class="el-icon-close" v-else></i>
                </template>
            </el-table-column>
            <el-table-column prop="failed" align="center" label="Trả lại">
                <template slot-scope="scope">
                    <i style="color:#2ecc71" class="el-icon-check" v-if="scope.row.failed"></i>
                    <i style="color:#e74c3c" class="el-icon-close" v-else></i>
                </template>
            </el-table-column>
            <el-table-column prop="unsubscribed" align="center" label="Bỏ theo dõi">
                <template slot-scope="scope">
                    <i style="color:#2ecc71" class="el-icon-check" v-if="scope.row.unsubscribed"></i>
                    <i style="color:#e74c3c" class="el-icon-close" v-else></i>
                </template>
            </el-table-column>
            <el-table-column prop="complained" align="center" label="Spam">
                <template slot-scope="scope">
                    <i style="color:#2ecc71" class="el-icon-check" v-if="!scope.row.complained"></i>
                    <i style="color:#e74c3c" class="el-icon-close" v-else></i>
                </template>
            </el-table-column>
        </el-table>
        <Pagination
            :pagination="pagination"
            @size-change="params.perPage=$event;params.page=1;getData()"
            @current-change="params.page=$event;getData()"
        />
    </el-row>
</template>
<script>
import { getListEmail } from "@/api/marketing/email-campaign";
import Pagination from "@/components/Pagination/index";
export default {
    props: ["mode", "success"],
    components: { Pagination },
    watch: {
        mode() {
            this.params.search = "";
            this.getData();
        }
    },
    computed: {
        event() {
            switch (this.mode) {
                case "total":
                    return {
                        label: "Tổng gửi",
                        value: ""
                    };
                    break;
                case "success":
                    return {
                        label: "Thành công",
                        value: ""
                    };
                    break;
                case "delivered":
                    return {
                        label: "Đã nhận",
                        value: "delivered"
                    };
                    break;
                case "opened":
                    return {
                        label: "Mở",
                        value: "opened"
                    };
                    break;
                case "clicked":
                    return {
                        label: "Click",
                        value: "clicked"
                    };
                    break;
                case "failed":
                    return {
                        label: "Trả lại",
                        value: "failed"
                    };
                    break;
                case "complained":
                    return {
                        label: "Đánh dấu spam",
                        value: "complained"
                    };
                    break;
                case "unsubscribed":
                    return {
                        label: "Bỏ theo dõi",
                        value: "unsubscribed"
                    };
                    break;
                default:
                    break;
            }
        }
    },
    data() {
        return {
            tableData: [],
            loading: false,
            pagination: {},
            params: {
                perPage: 10,
                page: 1,
                search: ""
            }
        };
    },
    methods: {
        async getData() {
            try {
                this.loading = true;
                const { data } = await getListEmail(
                    {
                        ...this.params,
                        event: this.event.value
                    },
                    this.$route.params.id
                );
                this.tableData =
                    !this.success && this.mode == "success" ? [] : data;
                this.loading = false;
            } catch (error) {
                this.loading = false;
            }
        }
    },
    created() {
        this.getData();
    }
};
</script>
<style lang="scss" scoped>
.title {
    margin-bottom: 10px;
    height: 32px;
}
</style>