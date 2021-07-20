import Vue from 'vue'
import VueResource from 'vue-resource'

Vue.use(VueResource)

const actions = {
    getConfiguration: {
        method: 'GET',
        url: `${API_URL}/print/{doctorId}`
    },
    saveConfiguration: {
        method: 'POST',
        url: `${API_URL}/print/{doctorId}`
    }
}

const api = Vue.resource(API_URL, {}, actions)

export default {
    getConfiguration(doctorId) {
        return api.getConfiguration({ doctorId })
    },
    saveConfiguration(doctorId, request) {
        return api.saveConfiguration({ doctorId }, request)
    }
}