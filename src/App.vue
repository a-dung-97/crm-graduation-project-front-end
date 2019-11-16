<template>
    <div id="app">
        <notifications group="foo" />
        <router-view />
    </div>
</template>

<script>
export default {
    name: "App"
};
</script>
<style lang="scss">
// ::-webkit-scrollbar-track {
//     box-shadow: inset 0 0 6px rgba(0, 0, 0, 0.3);
//     background-color: #f5f5f5;
//     border-radius: 10px;
// }

::-webkit-scrollbar {
    display: none;
    // background-color: #f5f5f5;
}

// ::-webkit-scrollbar-thumb {
//     border-radius: 0;
//     background-image: -webkit-gradient(
//         linear,
//         left bottom,
//         left top,
//         color-stop(0.44, rgb(122, 153, 217)),
//         color-stop(0.72, rgb(73, 125, 189)),
//         color-stop(0.86, rgb(28, 58, 148))
//     );
// }
</style>