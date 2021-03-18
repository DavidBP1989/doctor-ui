const SET_DOCTOR_INFORMATION = (state, payload) => {
    state.doctor.emeci = payload.EMECI
    state.doctor.name = payload.Name
}

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
    state.patient.expirationDate = payload.ExpirationDate
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

const SET_DOCTOR_REGISTER_POST = (state, payload) => {
    state.doctorRegister = payload
}

const SET_PATIENT_REGISTER_POST = (state, payload) => {
    state.patientRegister = payload
}

export default {
    SET_DOCTOR_INFORMATION,
    SET_PATIENT_INFORMATION,
    SET_PATIENT_ALLERGIES,
    SET_PATIENT_RESERVED,
    SET_PATIENT_RELEVENTPATHOLOGIES,
    SET_AUTHENTICATION,
    SET_LOGOUT,
    SET_DOCTOR_REGISTER_POST,
    SET_PATIENT_REGISTER_POST
}