<template>
    <div class="app-container">
        <el-row class="mb-20" :gutter="20">
            <el-col :span="12">
                <RevenueReport />
            </el-col>
            <el-col :span="12">
                <EmailCampaignReport />
            </el-col>
        </el-row>
        <el-row class="mb-20" :gutter="20">
            <el-col :span="12">
                <ConvertedReport />
            </el-col>
            <el-col :span="12">
                <ProductReport />
            </el-col>
        </el-row>
        <el-row :gutter="20">
            <el-col :span="12">
                <TaskReport />
            </el-col>
            <el-col :span="12">
                <LeadReport />
            </el-col>
        </el-row>
    </div>
</template>

<script>
import TaskReport from "./components/TaskReport";
import LeadReport from "./components/LeadReport";
import ProductReport from "./components/ProductReport";
import RevenueReport from "./components/RevenueReport";
import EmailCampaignReport from "./components/EmailCampaignReport";
import ConvertedReport from "./components/ConvertedReport";
export default {
    name: "Dashboard",
    components: {
        TaskReport,
        LeadReport,
        ProductReport,
        RevenueReport,
        EmailCampaignReport,
        ConvertedReport
    },
    data() {
        return {};
    }
};
</script>

<style lang="scss" scoped>
.dashboard {
    &-container {
        margin: 30px;
    }
    &-text {
        font-size: 30px;
        line-height: 46px;
    }
}
.el-input__inner {
    border: none;
}
</style>