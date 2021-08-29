import store from '@/store/store'
import format from '../../../../helper/format'

export default class model {
    constructor(form) {
        this.__$ = {
            BasicConsult: {
                Weight: form.weight,
                Size: form.size,
                Temperature: form.temperature,
                BloodPressure_A: form.bloodPressure_a,
                BloodPressure_B: form.bloodPressure_b,
                ReasonForConsultation: form.reasonForConsultation,
                PhysicalExploration: form.physicalExploration,
                PreventiveMeasures: form.preventiveMeasures,
                Observations: form.observations,
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
            Diagnostics: format.getArrayFormatToDiagnosticsAndTreatments(form.diagnostics),
            Treatments: format.getArrayFormatToDiagnosticsAndTreatments(form.treatments),
            CabinetStudies: format.getArrayFormatToCabinetAndLaboratory(form.cabinet),
            LaboratoryStudies: format.getArrayFormatToCabinetAndLaboratory(form.laboratory),
            Prognostic: form.prognostic
        }
    }
}