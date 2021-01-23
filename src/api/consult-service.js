import Vue from 'vue'
import VueResource from 'vue-resource'

Vue.use(VueResource)

const actions = {
    getConsultationDates: {
        method: 'GET',
        url: `${API_URL}/consults/general/dates//{pacientId}`
    }
}

const api = Vue.resource(API_URL, {}, actions)

export default {
    getConsultationDates(pacientId) {
        return api.getConsultationDates({
            pacientId
        })
    }
}