<template>
    <div class="app-container">
        <OrderDetail :oppor="opportunity" :cus="cus" :quo="quote" :is-edit="false" />
    </div>
</template>
<script>
import OrderDetail from "./components/OrderDetail";
export default {
    props: ["cus", "opportunity", "quote"],

    components: { OrderDetail }
};
</script>
<style>
</style>