<template>
    <div class="app-container">
        <ContactDetail :user="user" :is-edit="false" />
    </div>
</template>
<script>
import ContactDetail from "./components/ContactDetail";
export default {
    props: ["user"],
    components: { ContactDetail },
    created() {
        console.log(this.user);
    }
};
</script>
<style>
</style>