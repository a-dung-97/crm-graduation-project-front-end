<template>
    <div class="app-container">
        <ReceiptDetail :is-show="true" />
    </div>
</template>
<script>
import ReceiptDetail from "./components/ReceiptDetail";
export default {
    components: { ReceiptDetail }
};
</script>
<style lang="">
</style>