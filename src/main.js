import Vue from 'vue'
import Notifications from 'vue-notification'
import 'normalize.css/normalize.css' // A modern alternative to CSS resets
Vue.prototype.$bus = new Vue();
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import locale from 'element-ui/src/locale/lang/vi' // lang i18n

import '@/styles/index.scss' // global css

import App from './App'
import store from './store'
import router from './router'
import '@/icons' // icon
import '@/permission' // permission control
import FullScreenLoading from '@/mixins/fullscreen-loading'
import Catalog from '@/mixins/catalog'
// Use v-calendar, v-date-picker & v-popover components
Vue.filter('money', function (value) {
    return value.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,')
})

Vue.filter('date', function (value) {
    return new Date(value).toLocaleDateString('en-GB');
})

Vue.mixin(FullScreenLoading);
Vue.mixin(Catalog);

/**
 * If you don't want to use mock-server
 * you want to use MockJs for mock api
 * you can execute: mockXHR()
 *
 * Currently MockJs will be used in the production environment,
 * please remove it before going online! ! !
 */
import { mockXHR } from '../mock'
if (process.env.NODE_ENV === 'production') {
    mockXHR()
}

// set ElementUI lang to VI
Vue.use(ElementUI, { locale })
Vue.use(Notifications)

Vue.config.productionTip = false

new Vue({
    el: '#app',
    router,
    store,
    render: h => h(App)
})
