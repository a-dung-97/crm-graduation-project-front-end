<template>
    <div class="app-container">
        <CustomerDetail :is-edit="false" />
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