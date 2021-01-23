import api from '../api/doctor-service'

const getDoctorInformation = (context, payload) => {
    api.getBasicDoctorInformation(payload).then(response => {
        context.commit('SET_DOCTOR_INFORMATION', response.body)
    })
    .catch(e => {
        localStorage.removeItem('emecitoken')
    })
}

const logout = (context) => {
    return new Promise((resolve) => {
        context.commit('SET_LOGOUT')
        resolve()
    })
}

export default {
    getDoctorInformation,
    logout
}