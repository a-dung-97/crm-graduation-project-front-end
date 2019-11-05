<template>
    <div class="app-container">
        <IssueDetail :is-edit="false" />
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