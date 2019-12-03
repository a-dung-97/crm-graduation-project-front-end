<template>
    <div class="app-container">
        <QuoteDetail :user="user" :is-edit="false" />
    </div>
</template>
<script>
import QuoteDetail from "./components/QuoteDetail";
export default {
    props: ["user"],
    components: { QuoteDetail }
};
</script>
<style>
</style>