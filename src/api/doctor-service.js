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
        url: `${API_URL}/wAuthority/forgotpwd/{emeci}`
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
    }
}

const api = Vue.resource(API_URL, {}, actions)

export default {
    getBasicDoctorInformation(doctorId) {
        return api.getBasicDoctorInformation({ doctorId })
    },
    forgotPwd(emeci) {
        return api.forgotPwd({ emeci })
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
    }
}
