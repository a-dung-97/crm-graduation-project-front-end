<template>
    <el-card>
        <div slot="header" style="height:32px;line-height:32px">
            <span>Công việc hiện tại</span>
            <el-select
                class="fr"
                size="small"
                v-model="params.status"
                placeholder="Trạng thái"
                @change="getData"
                @clear="getData"
                clearable
            >
                <el-option value="1" label="Chưa thực hiện"></el-option>
                <el-option value="2" label="Đang thực hiện"></el-option>
                <el-option value="3" label="Đã giải quyết"></el-option>
            </el-select>
        </div>
        <el-table height="260px" :data="tableData" v-loading="loading">
            <el-table-column width="200" label="Tiêu đề">
                <template slot-scope="scope">
                    <router-link
                        tag="a"
                        class="link"
                        :to="`/business/task/show/${scope.row.id}`"
                    >{{ scope.row.title }}</router-link>
                </template>
            </el-table-column>
            <el-table-column width="150" label="Liên hệ">
                <template v-if="scope.row.contact" slot-scope="scope">
                    <router-link
                        tag="a"
                        class="link"
                        :to="`/customer/contact/show/${scope.row.contact.id}`"
                    >{{ scope.row.contact.name }}</router-link>
                </template>
            </el-table-column>
            <el-table-column width="150" label="Đối tượng">
                <template v-if="scope.row.taskable" slot-scope="scope">
                    <router-link
                        tag="a"
                        class="link"
                        :to="scope.row.type=='App\\Lead'?`/customer/lead/show/${scope.row.taskable.id}`:`/customer/customer/show/${scope.row.taskable.id}`"
                    >{{ scope.row.taskable.name }}</router-link>
                </template>
            </el-table-column>
            <el-table-column width="150" label="Cơ hội">
                <template v-if="scope.row.opportunity" slot-scope="scope">
                    <router-link
                        tag="a"
                        class="link"
                        :to="`/business/opportunity/show/${scope.row.opportunity.id}`"
                    >{{ scope.row.opportunity.name }}</router-link>
                </template>
            </el-table-column>
            <el-table-column width="140" label="Ngày bắt đầu">
                <template slot-scope="scope">{{ scope.row.start_date|date }}</template>
            </el-table-column>
            <el-table-column width="140" label="Ngày hết hạn">
                <template slot-scope="scope">{{ scope.row.expiration_date|date }}</template>
            </el-table-column>
            <el-table-column prop="priority" width="150" label="Mức ưu tiên"></el-table-column>
            <el-table-column prop="status" width="150" label="Trạng thái"></el-table-column>
        </el-table>

        <Pagination
            :pagination="pagination"
            @size-change="params.perPage=$event;params.page=1;getData()"
            @current-change="params.page=$event;getData()"
        />
    </el-card>
</template>
<script>
import { getTaskReport } from "@/api/report/report";
import Pagination from "@/components/Pagination/index";
export default {
    components: { Pagination },
    data() {
        return {
            loading: false,
            pagination: {},
            params: {
                status: "",
                page: 1,
                perPage: 10
            },
            tableData: []
        };
    },
    methods: {
        async getData() {
            try {
                this.loading = true;
                const { data, meta } = await getTaskReport(this.params);
                this.tableData = data;
                this.pagination = meta;
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
<style lang="">
</style>