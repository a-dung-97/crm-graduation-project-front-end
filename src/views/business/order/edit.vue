<template>
    <div class="app-container">
        <OrderDetail :is-edit="true" />
    </div>
</template>
<script>
import OrderDetail from "./components/OrderDetail";
export default {
    components: { OrderDetail }
};
</script>
<style>
</style>