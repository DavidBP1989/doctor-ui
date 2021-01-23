import Vue from 'vue'
import VueResource from 'vue-resource'

Vue.use(VueResource)

const actions = {
    getAllTreatments: {
        method: 'GET',
        url: `${API_URL}/treatments/{doctorId}`
    },
    deleteTreatmentById: {
        method: 'DELETE',
        url: `${API_URL}/treatments/{id}`
    },
    saveTreatment: {
        method: 'POST',
        url: `${API_URL}/treatments/{doctorId}`
    }
}

const api = Vue.resource(API_URL, {}, actions)

export default {
    getAllTreatments(doctorId) {
        return api.getAllTreatments({
            doctorId
        })
    },
    deleteTreatmentById(id) {
        return api.deleteTreatmentById({
            id
        })
    },
    saveTreatment(doctorId, request) {
        return api.saveTreatment({ doctorId }, request)
    }
}