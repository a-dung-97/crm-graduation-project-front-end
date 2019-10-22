<template>
    <div class="customer-body">
        <Header>
            <div class="breadcrumb" v-if="header.name">
                Setup Account >
                <a>Thông tin công ty</a>
            </div>
        </Header>
        <router-view @header="setHeader($event)"></router-view>
        <Footer />
    </div>
</template>

<script>
import Header from "./Header";
import Footer from "./Footer";
export default {
    components: { Header, Footer },
    data() {
        return {
            header: {
                name: false,
                service: false
            }
        };
    },
    methods: {
        setHeader($event) {
            if ($event == "name") {
                this.header.name = true;
                this.header.service = false;
            } else if ($event == "service") {
                this.header.service = true;
                this.header.name = false;
            } else {
                this.header.service = false;
                this.header.name = false;
            }
        }
    }
};
</script>

<style lang="scss" >
@import "~@/styles/customer/app.scss";
</style>
<style lang="css">
body {
    background: #ffffff;
    margin: 0;
    padding: 0;
    max-width: 100%;
}
</style>

