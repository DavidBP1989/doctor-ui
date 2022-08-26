import Vue from 'vue'
import VueResource from 'vue-resource'

Vue.use(VueResource)

const actions = {
    getBasicDoctorInformation: {
        method: 'GET',
        url: `${API_URL}/doctor/{doctorId}`
    },
    forgotPwd: {
        method: 'GET',
        url: `${API_URL}/wAuthority/forgotpwd/{email}`
    },
    getStates: {
        method: 'GET',
        url: `${API_URL}/wAuthority/states`
    },
    getCities: {
        method: 'GET',
        url: `${API_URL}/wAuthority/cities/{stateId}`
    },
    getRegister: {
        method: 'GET',
        url: `${API_URL}/doctor/{doctorId}/registerInfo`
    },
    register: {
        method: 'POST',
        url: `${API_URL}/wAuthority/doctorregister`
    },
    updateRegisterInfo: {
        method: 'PUT',
        url: `${API_URL}/doctor/{doctorId}`
    },
    changePwd: {
        method: 'PUT',
        url: `${API_URL}/doctor/{doctorId}/changePwd`
    },
    getListOfDoctorByAssociation: {
        method: 'GET',
        url: `${API_URL}/wAuthority/doctorsByAssociation/{associationId}`
    },
    getMedicalSpecialties: {
        method: 'GET',
        url: `${API_URL}/wAuthority/medicalSpecialties`
    },
    getSubmedicalSpecialties: {
        method: 'GET',
        url: `${API_URL}/wAuthority/submedicalSpecialties/{medicalSpecialityId}`
    }
}

const api = Vue.resource(API_URL, {}, actions)

export default {
    getBasicDoctorInformation(doctorId) {
        return api.getBasicDoctorInformation({ doctorId })
    },
    forgotPwd(email) {
        return api.forgotPwd({ email })
    },
    getStates() {
        return api.getStates()
    },
    getCities(stateId) {
        return api.getCities({ stateId })
    },
    getRegister(doctorId) {
        return api.getRegister({ doctorId })
    },
    register(request) {
        return api.register({ }, request)
    },
    updateRegisterInfo(doctorId, request) {
        return api.updateRegisterInfo({ doctorId }, request)
    },
    changePwd(doctorId, request) {
        return api.changePwd({ doctorId }, request)
    },
    getListOfDoctorByAssociation(associationId) {
        return api.getListOfDoctorByAssociation({ associationId })
    },
    getMedicalSpecialties() {
        return api.getMedicalSpecialties()
    },
    getSubmedicalSpecialties(medicalSpecialityId) {
        return api.getSubmedicalSpecialties({ medicalSpecialityId })
    }
}

