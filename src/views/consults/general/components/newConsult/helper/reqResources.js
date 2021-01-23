import api_diagnostics from '@/api/diagnostic-service'
import api_treatments from '@/api/treatment-service'
import api_laboratory from '@/api/laboratory-service'
import api_cabinet from '@/api/cabinet-service'

function getAllDiagnostics(doctorId) {
    return api_diagnostics.getAllDiagnostics(doctorId).then(response => response.body)
}

function getAllTreatments(doctorId) {
    return api_treatments.getAllTreatments(doctorId).then(response => response.body)
}

function getLabStudies() {
    return api_laboratory.getLabStudies().then(response => response.body)
}

function getCabinetStudies() {
    return api_cabinet.getCabinetStudies().then(response => response.body)
}

function deleteDiagnosticById(id) {
    return api_diagnostic.deleteDiagnosticById(id).then(response => response.status)
}

function deleteTreatmentById(id) {
    return api_treatments.deleteTreatmentById(id).then(response => response.status)
}

function saveDiagnostic(doctorId, request) {
    return api_diagnostics.saveDiagnostic(doctorId, request).then(response => response.body)
}

function saveTreatment(doctorId, request) {
    return api_treatments.saveTreatment(doctorId, request).then(response => response.body)
}

export default {
    getAllDiagnostics,
    getAllTreatments,
    getLabStudies,
    getCabinetStudies,
    deleteDiagnosticById,
    deleteTreatmentById,
    saveDiagnostic,
    saveTreatment
}