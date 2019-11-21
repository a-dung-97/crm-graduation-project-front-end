<template>
    <div class="app-container">
        <ContactDetail :is-edit="false" />
    </div>
</template>
<script>
import ContactDetail from "./components/ContactDetail";
export default {
    components: { ContactDetail }
};
</script>
<style>
</style>