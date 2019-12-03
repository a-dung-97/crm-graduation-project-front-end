<template>
    <div class="app-container">
        <InvoiceDetail :is-edit="true" />
    </div>
</template>
<script>
import InvoiceDetail from "./components/InvoiceDetail";
export default {
    components: { InvoiceDetail }
};
</script>
<style>
</style>