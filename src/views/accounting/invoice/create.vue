<template>
    <div class="app-container">
        <InvoiceDetail :is-edit="false" />
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