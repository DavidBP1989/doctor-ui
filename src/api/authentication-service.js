import Vue from 'vue'
import VueResource from 'vue-resource'

Vue.use(VueResource)
Vue.http.options.emulateJSON = true

const actions = {
    getToken: {
        method: 'POST',
        url: `${API_URL_AUTHENTICATION}/authentication`
    }
}

const api = Vue.resource(API_URL_AUTHENTICATION, {}, actions)

export default {
    getToken(req) {
        req.grant_type = 'password'
        return api.getToken({ }, req)
    }
}