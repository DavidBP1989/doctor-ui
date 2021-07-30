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
            Diagnostics: this.getArrayFormatToDiagnosticsAndTreatments(form.diagnostics),
            Treatments: this.getArrayFormatToDiagnosticsAndTreatments(form.treatments),
            CabinetStudies: this.getArrayFormatToCabinetAndLaboratory(form.cabinet),
            LaboratoryStudies: this.getArrayFormatToCabinetAndLaboratory(form.laboratory),
            Prognostic: form.prognostic
        }
    }

    getArrayFormatToCabinetAndLaboratory(array) {
        return array.map(x => {
            return {
                Name: x.name,
                Studies: x.studies.map(s => {
                    return s.name
                })
            }
        })
    }

    getArrayFormatToDiagnosticsAndTreatments(array) {
        var studies = array.map(x => {
            return x.text
        })
        return studies.length > 0 ? [
            {
                Name: '',
                Studies: studies
            }
            
        ] : []
    }
}