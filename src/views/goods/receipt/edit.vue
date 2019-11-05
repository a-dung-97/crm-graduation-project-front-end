<template>
    <div class="app-container">
        <ReceiptDetail :is-edit="true" />
    </div>
</template>
<script>
import ReceiptDetail from "./components/ReceiptDetail";
export default {
    components: { ReceiptDetail }
};
</script>
<style>
</style>