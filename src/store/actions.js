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

const setDefaultPrintColors = (context, payload) => {
    context.commit('SET_TEXTCOLOR_PRINTCONFIG', payload.TextColor || '#ffffff')
    context.commit('SET_BGPRIMARYCOLOR_PRINTCONFIG', payload.BgPrimaryColor || '#ffffff')
    context.commit('SET_BGSECONDARYCOLOR_PRINTCONFIG', payload.BgSecondaryColor || '#418AE0')
    context.commit('SET_LOGOURL_PRINTCONFIG', payload.UrlImage)
    context.commit('SET_LOGOBASE64_PRINTCONFIG', null)
    context.commit('SET_LOGOTITLE_PRINTCONFIG', null)
}

export default {
    getDoctorInformation,
    logout,
    setDefaultPrintColors
}