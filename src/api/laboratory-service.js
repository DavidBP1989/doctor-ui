import Vue from 'vue'
import VueResource from 'vue-resource'

Vue.use(VueResource)

const actions = {
    getLabStudies: {
        method: 'GET',
        url: `${API_URL}/laboratory`
    }
}

const api = Vue.resource(API_URL, {}, actions)

export default {
    getLabStudies() {
        return api.getLabStudies()
    }
}