const SET_DOCTOR_INFORMATION = (state, payload) => {
    state.doctor.emeci = payload.EMECI
    state.doctor.name = payload.Name + payload.LastName
    state.doctor.phone = payload.OfficePhone
    state.doctor.colony = payload.OfficeAddress,
    state.doctor.email = payload.Email,
    state.doctor.city = payload.CityName,
    state.doctor.state = payload.StateName,
    state.doctor.medicalSpeciality = payload.MedicalSpecialityName,
    state.doctor.subMedicalSpeciality = payload.SubmedicalSpeciality,
    state.doctor.hospital = payload.ProfessionalResidenceHospital,
    state.doctor.sep = payload.NoSEP_ProfessionalCertificate,
    state.doctor.university = payload.UniversitySpecialty,
    state.doctor.certificate = payload.SpecialtyCertificate,
    state.doctor.ssa = payload.NoSSA,
    state.doctor.cmcp = payload.NoCertification_CMCP,
    state.doctor.isAssociation = payload.IsAssociation
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

const SET_TEXTCOLOR_PRINTCONFIG = (state, payload) => {
    state.printConfig.textColor = payload
}

const SET_BGPRIMARYCOLOR_PRINTCONFIG = (state, payload) => {
    state.printConfig.bgPrimaryColor = payload
}

const SET_BGSECONDARYCOLOR_PRINTCONFIG = (state, payload) => {
    state.printConfig.bgSecondaryColor = payload
}

const SET_LOGOURL_PRINTCONFIG = (state, payload) => {
    state.printConfig.logo.url = payload
}

const SET_LOGOBASE64_PRINTCONFIG = (state, payload) => {
    state.printConfig.logo.base64 = payload
}

const SET_LOGOTITLE_PRINTCONFIG = (state, payload) => {
    state.printConfig.logo.title = payload
}

const SET_HTML_PRINTCONFIG = (state, payload) => {
    state.printConfig.html = payload
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
    SET_PATIENT_REGISTER_POST,
    SET_TEXTCOLOR_PRINTCONFIG,
    SET_BGPRIMARYCOLOR_PRINTCONFIG,
    SET_BGSECONDARYCOLOR_PRINTCONFIG,
    SET_LOGOURL_PRINTCONFIG,
    SET_LOGOBASE64_PRINTCONFIG,
    SET_LOGOTITLE_PRINTCONFIG,
    SET_HTML_PRINTCONFIG
}