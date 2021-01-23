import Vue from 'vue'
import { router } from '../router/router'
import store from '../store/store'

Vue.http.interceptors.push((request) => {
    const url = request.url
    const isAuthUrl = url.includes('/authentication')

    if (!isAuthUrl) {
        if (store.state.token !== null)
            request.headers.set('Authorization', `Bearer ${store.state.token}`)
    }

    return (response) => {
        if (response.status === 200) {
            if (isAuthUrl) {
                localStorage.setItem('emecitoken', response.body.access_token)
                store.commit('SET_AUTHENTICATION', response.headers.map['did'][0])
            }
        }

        if (response.status === 401 || response.status === 404) {
            /**
             * cierra cualquier ventana que siga abierta
             * si la sesion ya termino
             */
            Vue.swal.close()
            store.dispatch('logout').then(() => {
                router.push('/auth')
            })
        }
    }
})