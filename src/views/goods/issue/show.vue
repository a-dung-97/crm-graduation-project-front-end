<template>
    <div class="app-container">
        <IssueDetail :is-show="true" />
    </div>
</template>
<script>
import IssueDetail from "./components/IssueDetail";
export default {
    components: { IssueDetail }
};
</script>
<style lang="">
</style>