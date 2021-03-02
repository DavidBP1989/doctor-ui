import store from '@/store/store'

export default class model {
    constructor(form) {
        this.__$ = {
            BasicConsult: {
                Weight: form.weight,
                Size: form.size,
                Temperature: form.temperature,
                BloodPressure_A: form.bloodPressure_a,
                BloodPressure_B: form.bloodPressure_b
            },
            PatientConsult: {
                PatientId: store.state.patient.id,
                Allergies: store.state.patient.allergies,
                Reserved: store.state.patient.reserved,
                RelevantPathologies: store.state.patient.relevantPathologies
            },
            HeadCircuference: form.headCircuference,
            HeartRate: form.heartRate,
            BreathingFrecuency: form.breathingFrecuency,
            ReasonForConsultation: form.reasonForConsultation,
            PhysicalExploration: form.physicalExploration,
            PreventiveMeasures: form.preventiveMeasures,
            Observations: form.observations,
            Diagnostics: this.getArrayFormat(form.diagnostics, true),
            Treatments: this.getArrayFormat(form.treatments, true),
            CabinetStudies: this.getArrayFormat(form.cabinet, false),
            LaboratoryStudies: this.getArrayFormat(form.laboratory, false),
            Prognostic: form.prognostic
        }
    }

    getArrayFormat(array, isDiagnosticOrTreatment) {
        return array.map((x) => {
            return isDiagnosticOrTreatment ? x.text : x.name
        })
    }
}