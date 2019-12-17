import Vue from 'vue'
import Notifications from 'vue-notification'
import 'normalize.css/normalize.css' // A modern alternative to CSS resets
Vue.prototype.bus = new Vue();
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import locale from 'element-ui/src/locale/lang/vi' // lang i18n
import VueHtmlToPaper from 'vue-html-to-paper';
import '@/styles/index.scss' // global css
import App from './App'
import store from './store'
import router from './router'
import '@/icons' // icon
import '@/permission' // permission control
import FullScreenLoading from '@/mixins/fullscreen-loading'
import Catalog from '@/mixins/catalog'
// Use v-calendar, v-date-picker & v-popover components
Vue.use(VueHtmlToPaper);
Vue.filter('money', function (value) {
    if (value != null)
        return value.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,')
})

Vue.filter('date', function (value) {
    if (value)
        return new Date(value).toLocaleDateString('en-GB');
    else return null
})
Vue.filter('datetime', function (value) {
    if (value)
        return new Date(value).toLocaleDateString('en-GB') + ' ' + new Date(value).toLocaleTimeString('en-GB');
    else return null
})
Vue.mixin(FullScreenLoading);
Vue.mixin(Catalog);

Vue.use(ElementUI, { locale })
Vue.use(Notifications)

Vue.config.productionTip = false




new Vue({
    el: '#app',
    router,
    store,
    render: h => h(App)
})
