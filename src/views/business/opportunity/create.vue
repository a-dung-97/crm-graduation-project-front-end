<template>
    <div class="app-container">
        <OpportunityDetail :user="user" :is-edit="false" />
    </div>
</template>
<script>
import OpportunityDetail from "./components/OpportunityDetail";
export default {
    props: ["user"],

    components: { OpportunityDetail }
};
</script>
<style>
</style>