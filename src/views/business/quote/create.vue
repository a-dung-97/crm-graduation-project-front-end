<template>
    <div class="app-container">
        <QuoteDetail :oppor="opportunity" :cus="cus" :is-edit="false" />
    </div>
</template>
<script>
import QuoteDetail from "./components/QuoteDetail";
export default {
    props: ["cus", "opportunity"],
    components: { QuoteDetail }
};
</script>
<style>
</style>