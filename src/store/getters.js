const isAuthenticated = state => !!state.token

const isDoctorRegisterSend = state => state.doctorRegister
const isPatientRegisterSend = state => state.patientRegister

const getLastIdDiagnostics = state => {
    if (state.consults.diagnostics.length > 0) {
        return state.consults.diagnostics[state.consults.diagnostics.length - 1].id + 1
    }
    return 0
}

const getLastIdTreatments = state => {
    if (state.consults.treatments.length > 0) {
        return state.consults.treatments[state.consults.treatments.length - 1].id + 1
    }
    return 0
}

const getPrintConfigTextColor = state => state.printConfig.textColor
const getPrintConfigBgPrimaryColor = state => state.printConfig.bgPrimaryColor
const getPrintConfigBgSecondaryColor = state => state.printConfig.bgSecondaryColor
const getPrintConfigLogoUrl = state => state.printConfig.logo.url

export default {
    isAuthenticated,
    isDoctorRegisterSend,
    isPatientRegisterSend,
    getLastIdDiagnostics,
    getLastIdTreatments,
    getPrintConfigTextColor,
    getPrintConfigBgPrimaryColor,
    getPrintConfigBgSecondaryColor,
    getPrintConfigLogoUrl
}