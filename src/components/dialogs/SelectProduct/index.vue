<template>
    <el-dialog
        title="Chọn sản phẩm"
        :visible.sync="showDialog "
        :before-close="closeDialog"
        width="75%"
        center
    >
        <el-input
            prefix-icon="el-icon-search"
            v-model="params.name"
            style="width:25%"
            size="small"
            placeholder="Tìm kiếm theo tên"
        >
            <el-button @click="params.page=1;getData()" slot="append" icon="el-icon-search"></el-button>
        </el-input>
        <el-table
            ref="singleTable"
            highlight-current-row
            @current-change="handleCurrentChange"
            :data="tableData"
            v-loading="loading"
            style="width: 100%"
        >
            <el-table-column width="250" label="Hình ảnh">
                <template slot-scope="scope">
                    <el-avatar
                        :fit="'fill'"
                        v-if="scope.row.image"
                        :size="50"
                        :src="scope.row.image.path"
                    ></el-avatar>
                </template>
            </el-table-column>
            <el-table-column prop="name" width="300" label="Tên"></el-table-column>
            <el-table-column prop="code" label="Mã"></el-table-column>
            <el-table-column prop="price" label="Giá bán(đ)">
                <template slot-scope="scope">{{ scope.row.sale_price|money }}</template>
            </el-table-column>
        </el-table>
        <Pagination
            :pagination="pagination"
            @size-change="params.perPage=$event;params.page=1;getData()"
            @current-change="params.page=$event;getData()"
        />
    </el-dialog>
</template>

<script>
import { index } from "@/api/goods/product";
import Pagination from "@/components/Pagination/index";
export default {
    props: ["showDialog"],
    components: { Pagination },
    watch: {
        showDialog(val) {
            if (val) this.getData();
        }
    },
    data() {
        return {
            tableData: [],
            loading: false,
            pagination: {},
            name: "",
            params: {
                name: "",
                perPage: 10,
                page: ""
            }
        };
    },
    methods: {
        closeDialog() {
            this.$emit("update:showDialog", false);
        },
        async getData() {
            try {
                this.loading = true;
                const { data, meta } = await index(this.params);
                this.tableData = data;
                this.pagination = meta;
                this.loading = false;
            } catch (error) {
                console.log(error);
                this.loading = false;
            }
        },
        handleCurrentChange(val) {
            if (val) {
                this.$emit("select-product", val);
                this.closeDialog();
            }
        }
    }
};
</script>

<style scoped>
</style>