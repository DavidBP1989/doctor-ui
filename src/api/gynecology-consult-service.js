import Vue from 'vue'
import VueResource from 'vue-resource'

Vue.use(VueResource)

const actions = {
    getDatesPreviousConsult: {
        method: 'GET',
        url: `${API_URL}/gynecologyConsult/dates/{patientId}`
    },
    saveConsult: {
        method: 'POST',
        url: `${API_URL}/gynecologyConsult/{doctorId}`
    },
    getConsultById: {
        method: 'GET',
        url: `${API_URL}/gynecologyConsult/{consultId}`
    }
}

const api = Vue.resource(API_URL, {}, actions)
export default {
    getDatesPreviousConsult(patientId) {
        return api.getDatesPreviousConsult({
            patientId
        })
    },
    saveConsult(doctorId, request) {
        return api.saveConsult({ doctorId }, request)
    },
    getConsultById(consultId) {
        return api.getConsultById({
            consultId
        })
    }
}