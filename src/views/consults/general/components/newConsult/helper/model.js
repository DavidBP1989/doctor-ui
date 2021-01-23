export default class model {
    constructor(form) {
        this.__$ = {
            PatientId: patientId,
            Weight: form.weight,
            Size: form.size,
            Temperature: form.temperature,
            BloodPressure_A: form.bloodPressure_a,
            BloodPressure_B: form.bloodPressure_b,
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
            Prognostic: form.prognostic,
            //datos del paciente
            Allergies: patient.allergies,
            Reserved: patient.reserved,
            RelevantPathologies: patient.relevantPathologies
        }
    }
}