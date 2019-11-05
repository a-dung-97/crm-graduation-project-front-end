<template>
    <div class="app-container">
        <IssueDetail :is-edit="true" />
    </div>
</template>
<script>
import IssueDetail from "./components/IssueDetail";
export default {
    components: { IssueDetail }
};
</script>
<style>
</style>