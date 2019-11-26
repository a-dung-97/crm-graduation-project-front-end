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
@import "~animate.css";

::-webkit-scrollbar-track {
    //box-shadow: inset 0 0 6px rgba(0, 0, 0, 0.3);
    background-color: white;
    // border-radius: 10px;
    z-index: 9999;
}
::-webkit-scrollbar {
    z-index: 9999;
    width: 0px;
    height: 17px;
    //background-color: white;
}

::-webkit-scrollbar-thumb {
    // border-radius: 10px;
    z-index: 9999;

    background-image: -webkit-gradient(
        linear,
        left bottom,
        left top,
        color-stop(0.44, rgb(122, 153, 217)),
        color-stop(0.72, rgb(73, 125, 189)),
        color-stop(0.86, rgb(28, 58, 148))
    );
}
</style>