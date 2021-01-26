//#region doctor
const SET_DOCTOR_INFORMATION = (state, payload) => {
    state.doctor.emeci = payload.EMECI
    state.doctor.name = payload.Name
}
//#endregion


//#region patient
const SET_PATIENT_INFORMATION = (state, payload) => {
    state.patient.allergies = payload.Allergies
    state.patient.reserved = payload.Reserved
    state.patient.relevantPathologies = payload.RelevantPathologies
    state.patient.name = `${payload.Name} ${payload.LastName}`
    state.patient.emeci = payload.EMECI
    state.patient.id = payload.Id
    state.patient.ageInMonths = payload.AgeInMonths
    state.patient.coordinate = payload.RandomCoordinate
    state.patient.coordinateValue = payload.RandomCoordinateValue
    state.patient.groupRH = payload.GroupRH
    state.patient.birthDate = payload.BirthDate
    state.patient.sex = payload.Sex
}

const SET_PATIENT_ALLERGIES = (state, payload) => {
    state.patient.allergies = payload
}

const SET_PATIENT_RESERVED = (state, payload) => {
    state.patient.reserved = payload
}

const SET_PATIENT_RELEVENTPATHOLOGIES = (state, payload) => {
    state.patient.relevantPathologies = payload
}
//#endregion


//#region consults
const SET_CONSULTS_DIAGNOSTICS = (state, payload) => {
    state.consults.diagnostics = payload
}

const SET_CONSULTS_DIAGNOSTICS_DISABLESTATUS = (state, { id, status}) => {
    state.consults.diagnostics[id].disabled = status
}

const SET_CONSULTS_DIAGNOSTICS_ENABLE = state => {
    state.consults.diagnostics.forEach(x => x.disabled = false)
}

const ADD_CONSULTS_DIAGNOSTICS = (state, obj) => {
    state.consults.diagnostics.unshift(obj)
}

const DELETE_CONSULTS_DIAGNOSTICS_BYID = (state, id) => {
    const index = state.consults.diagnostics.findIndex(x => x.id === id)
    state.consults.diagnostics.splice(index, 1)
}
//--
const SET_CONSULTS_TREATMENTS = (state, payload) => {
    state.consults.treatments = payload
}

const SET_CONSULTS_TREATMENTS_DISABLESTATUS = (state, {id, status}) => {
    state.consults.treatments[id].disabled = status
}

const SET_CONSULTS_TREATMENTS_ENABLE = state => {
    state.consults.treatments.forEach(x => x.disabled = false)
}

const ADD_CONSULTS_TREATMENTS = (state, obj) => {
    state.consults.treatments.unshift(obj)
}

const DELETE_CONSULTS_TREATMENTS_BYID = (state, id) => {
    const index = state.consults.treatments.findIndex(x => x.id === id)
    state.consults.treatments.splice(index, 1)
}
//#endregion


//#region authentication
const SET_AUTHENTICATION = (state, payload) => {
    state.doctor.id = payload
    state.token = localStorage.getItem('emecitoken')
}

const SET_LOGOUT = state => {
    state.doctor.id = null
    state.doctor.emeci = null
    state.doctor.name = null
    state.patient.allergies = null
    state.patient.reserved = null
    state.patient.relevantPathologies = null
    state.patient.name = null
    state.patient.emeci = null
    state.patient.id = null
    state.patient.ageInMonths = 0
    state.patient.coordinate = null
    state.patient.coordinateValue = null
    state.patient.groupRH = null
    state.patient.birthDate = null
    state.token = null
    localStorage.removeItem('emecitoken')
}
//#endregion


export default {
    SET_DOCTOR_INFORMATION,
    SET_PATIENT_INFORMATION,
    SET_PATIENT_ALLERGIES,
    SET_PATIENT_RESERVED,
    SET_PATIENT_RELEVENTPATHOLOGIES,
    SET_CONSULTS_DIAGNOSTICS,
    SET_CONSULTS_DIAGNOSTICS_DISABLESTATUS,
    SET_CONSULTS_DIAGNOSTICS_ENABLE,
    ADD_CONSULTS_DIAGNOSTICS,
    DELETE_CONSULTS_DIAGNOSTICS_BYID,
    SET_CONSULTS_TREATMENTS,
    SET_CONSULTS_TREATMENTS_DISABLESTATUS,
    SET_CONSULTS_TREATMENTS_ENABLE,
    ADD_CONSULTS_TREATMENTS,
    DELETE_CONSULTS_TREATMENTS_BYID,
    SET_AUTHENTICATION,
    SET_LOGOUT
}