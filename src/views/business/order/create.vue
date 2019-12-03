<template>
    <div class="app-container">
        <OrderDetail :user="user" :is-edit="false" />
    </div>
</template>
<script>
import OrderDetail from "./components/OrderDetail";
export default {
    props: ["user"],

    components: { OrderDetail }
};
</script>
<style>
</style>