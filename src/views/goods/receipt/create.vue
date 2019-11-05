<template>
    <div class="app-container">
        <ReceiptDetail :is-edit="false" />
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