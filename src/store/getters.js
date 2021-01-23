const isAuthenticated = state => !!state.token

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

export default {
    isAuthenticated,
    getLastIdDiagnostics,
    getLastIdTreatments
}