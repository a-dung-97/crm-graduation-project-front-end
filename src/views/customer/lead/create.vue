<template>
    <div class="app-container">
        <LeadDetail :is-edit="false" />
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