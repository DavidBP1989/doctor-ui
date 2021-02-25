import Vue from 'vue'
import VueResource from 'vue-resource'

Vue.use(VueResource)

const actions = {
    getConsultationDates: {
        method: 'GET',
        url: `${API_URL}/consults/general/dates/{pacientId}`
    },
    saveConsult: {
        method: 'POST',
        url: `${API_URL}/consults/general/{doctorId}`
    },
    getConsultById: {
        method: 'GET',
        url: `${API_URL}/consults/general/{consultId}`
    },
    getObstetricConsultationDates: {
        method: 'GET',
        url: `${API_URL}/consults/obstetric/dates/{pacientId}`
    },
    saveConsultObstetric: {
        method: 'POST',
        url: `${API_URL}/consults/obstetric/{doctorId}`
    }
}

const api = Vue.resource(API_URL, {}, actions)

export default {
    getConsultationDates(pacientId) {
        return api.getConsultationDates({
            pacientId
        })
    },
    saveConsult(doctorId, request) {
        return api.saveConsult({ doctorId }, request)
    },
    getConsultById(consultId) {
        return api.getConsultById({
            consultId
        })
    },
    getObstetricConsultationDates(pacientId) {
        return api.getObstetricConsultationDates({
            pacientId
        })
    },
    saveConsultObstetric(doctorId, request) {
        return api.saveConsultObstetric({ doctorId }, request)
    }
}