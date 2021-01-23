import Vue from 'vue'
import VueResource from 'vue-resource'

Vue.use(VueResource)

const actions = {
    getAllDiagnostics: {
        method: 'GET',
        url: `${API_URL}/diagnostics/{doctorId}`
    },
    deleteDiagnosticById: {
        method: 'DELETE',
        url: `${API_URL}/diagnostics/{id}`
    },
    saveDiagnostic: {
        method: 'POST',
        url: `${API_URL}/diagnostics/{doctorId}`
    }
}

const api = Vue.resource(API_URL, {}, actions)

export default {
    getAllDiagnostics(doctorId) {
        return api.getAllDiagnostics({
            doctorId
        })
    },
    deleteDiagnosticById(id) {
        return api.deleteDiagnosticById({
            id
        })
    },
    saveDiagnostic(doctorId, request) {
        return api.saveDiagnostic({ doctorId }, request)
    }
}