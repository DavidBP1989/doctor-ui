import Vue from 'vue'
import VueResource from 'vue-resource'

Vue.use(VueResource)

const actions = {
    getCabinetStudies: {
        method: 'GET',
        url: `${API_URL}/cabinet`
    }
}

const api = Vue.resource(API_URL, {}, actions)

export default {
    getCabinetStudies() {
        return api.getCabinetStudies()
    }
}