<template>
    <div class="app-container">
        <CustomerDetail :is-edit="true" />
    </div>
</template>
<script>
import CustomerDetail from "./components/CustomerDetail";
export default {
    components: { CustomerDetail }
};
</script>
<style>
</style>