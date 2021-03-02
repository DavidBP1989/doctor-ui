import Vue from 'vue'
import VueResource from 'vue-resource'

Vue.use(VueResource)

const actions = {
    getDatesPreviousConsult: {
        method: 'GET',
        url: `${API_URL}/generalConsult/dates/{patientId}`
    },
    saveConsult: {
        method: 'POST',
        url: `${API_URL}/generalConsult/{doctorId}`
    },
    getConsultById: {
        method: 'GET',
        url: `${API_URL}/generalConsult/{consultId}`
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