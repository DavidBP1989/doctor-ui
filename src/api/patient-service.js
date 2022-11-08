import Vue from 'vue'
import VueResource from 'vue-resource'

Vue.use(VueResource)

const actions = {
    getPatientList: {
        method: 'GET',
        url: `${API_URL}/patient/{doctorId}{?page,itemsPerPage,columnName,textToSearch,orderby}`
    },
    getPatientListByAssociation: {
        method: 'GET',
        url: `${API_URL}/patient/assoc/{doctorId}{?filter}`
    },
    getLastEmeci: {
        method: 'GET',
        url: `${API_URL}/patient/{doctorId}/last`
    },
    newExistingPatient: {
        method: 'GET',
        url: `${API_URL}/patient/newpatient/{?Emeci,Coordinate,Value}`
    },
    saveNewPatient: {
        method: 'POST',
        url: `${API_URL}/patient/{doctorId}/`
    },
    getById: {
        method: 'GET',
        url: `${API_URL}/patient/byId/{patientId}`
    },
    saveNewPatientFromExternalRegister: {
        method: 'POST',
        url: `${API_URL}/wAuthority/patientregister/{doctorId}`
    }
}

const api = Vue.resource(API_URL, {}, actions)

export default {
    getPatientList(doctorId, page, itemsPerPage, columnName, textToSearch, orderby) {
        return api.getPatientList({
            doctorId,
            page,
            itemsPerPage,
            columnName,
            textToSearch,
            orderby
        })
    },
    getPatientListByAssociation(doctorId, filter) {
        return api.getPatientListByAssociation({ doctorId, filter})
    },
    getLastEmeci(doctorId) {
        return api.getLastEmeci({ doctorId })
    },
    newExistingPatient(doctorId, Emeci, Coordinate, Value) {
        return api.newExistingPatient({
            doctorId,
            Emeci,
            Coordinate,
            Value
        })
    },
    saveNewPatient(doctorId, request) {
        return api.saveNewPatient({ doctorId }, request)
    },
    getById(patientId) {
        return api.getById({
            patientId
        })
    },
    saveNewPatientFromExternalRegister(doctorId, request) {
        return api.saveNewPatientFromExternalRegister({ doctorId }, request)
    }
}