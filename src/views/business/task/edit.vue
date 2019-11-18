<template>
    <div class="app-container">
        <TaskDetail :is-edit="true" />
    </div>
</template>
<script>
import TaskDetail from "./components/TaskDetail";
export default {
    components: { TaskDetail }
};
</script>
<style>
</style>