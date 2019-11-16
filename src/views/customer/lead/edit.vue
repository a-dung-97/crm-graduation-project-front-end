<template>
    <div class="app-container">
        <LeadDetail :is-edit="true" />
    </div>
</template>
<script>
import LeadDetail from "./components/LeadDetail";
export default {
    components: { LeadDetail }
};
</script>
<style>
</style>