<template>
    <div class="app-container">
        <OpportunityDetail :is-edit="true" />
    </div>
</template>
<script>
import OpportunityDetail from "./components/OpportunityDetail";
export default {
    components: { OpportunityDetail }
};
</script>
<style>
</style>