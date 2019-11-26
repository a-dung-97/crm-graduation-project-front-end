<template>
    <div class="app-container">
        <QuoteDetail :is-edit="true" />
    </div>
</template>
<script>
import QuoteDetail from "./components/QuoteDetail";
export default {
    components: { QuoteDetail }
};
</script>
<style>
</style>