<template>
    <div class="app-container">
        <InvoiceDetail :ord="order" :is-edit="false" />
    </div>
</template>
<script>
import InvoiceDetail from "./components/InvoiceDetail";
export default {
    props: ["order"],
    components: { InvoiceDetail }
};
</script>
<style>
</style>