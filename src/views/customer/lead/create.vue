<template>
    <div class="app-container">
        <ProductDetail :is-edit="false" />
    </div>
</template>
<script>
import ProductDetail from "./components/ProductDetail";
export default {
    components: { ProductDetail }
};
</script>
<style>
</style>