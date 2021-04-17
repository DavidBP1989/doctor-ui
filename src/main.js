import Vue from 'vue'
import store from './store/store'
import './icons'
import { BootstrapVue } from 'bootstrap-vue'
import './api/interceptor'
import { router } from './router/router'
import moment from 'moment'
import VueMoment from 'vue-moment'
import loading from 'vue-loading-overlay'
import 'vue-loading-overlay/dist/vue-loading.css'
import VueSweetalert2 from 'vue-sweetalert2'
import VCalendar from 'v-calendar'
import './scss/app.scss'
import 'sweetalert2/dist/sweetalert2.min.css'
import view from './main.vue'

moment.locale('es')

Vue.use(BootstrapVue)
Vue.use(VueMoment, { moment })
Vue.use(VueSweetalert2)
Vue.use(loading)
Vue.use(VCalendar)

new Vue({
    store,
    router,
    mounted: () => {
        try {
            Function("() => {};");
            console.log('ES6')
            //soporta ES6
        } catch (e) {
            window.location.href = 'https://google.com'
        }
    },
    render: h => h(view)
}).$mount('#app')

Vue.config.devtools = true