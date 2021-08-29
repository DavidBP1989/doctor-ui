import store from '@/store/store'
import Vue from 'vue'
import format from '../../../../helper/format'

export default class model {
    constructor(form) {
        this.__$ = {
            PregnancyNumber: form.pregnancyNumber,
            SexuallyActive: form.sexuallyActive,
            Abortions: form.abortions,
            LastParturitionDate: form.lastParturitionDate !== null
            ? Vue.moment(form.lastParturitionDate).format('YYYY-MM-DD') : null,
            FirstDayOfLastMenstruation: form.firstDayMenstruation !== null
            ? Vue.moment(form.firstDayMenstruation).format('YYYY-MM-DD') : null,
            PreviousToxemias: form.toxemias,
            SpecifyToxemias: form.specifyToxemias,
            Parturition: form.parturition,
            DystociaType: form.dystocia.type,
            SpecifyDystociaType: form.dystocia.specifyTpe,
            DystociaReason: form.dystocia.reason,
            SpecifyDystociaReason: form.dystocia.specifyReason,
            PreviousCesarean: form.cesarean,
            Forceps: form.forceps,
            Stillbirths: form.stillbirths,
            NewbornAlive: form.newBornAlive,
            EctopicPregnancies: form._pregnancies.ectopic,
            SpecifyEctopicPregnancies: form._pregnancies.specifyEctopic,
            PreviousPregnacyComplications: form._pregnancies.previous,
            SpecifyPreviousPregnacyComplications: form._pregnancies.specifyPrevious,
            PerinatalComplications: form._pregnancies.perinatal,
            SpecifyPerinatalComplications: form._pregnancies.specifyPerinatal,
            AbnormalPregnancies: form._pregnancies.abnormal,
            SpecifyAbnormalPregnancies: form._pregnancies.specifyAbnormal,
            //Observations: form.observations,
            PregnancyControl: {
                FU: form.pregnancyControl.fu,
                FCF: form.pregnancyControl.fcf,
                CC: form.pregnancyControl.cc,
                CA: form.pregnancyControl.ca,
                LF: form.pregnancyControl.lf,
                DBP: form.pregnancyControl.dbp,
                Position: form.pregnancyControl.position,
                Presentation: form.pregnancyControl.presentation,
                Situtation: form.pregnancyControl.situtation,
                Attitude: form.pregnancyControl.attitude,
                FetalMovements: form.pregnancyControl.fetalMovements,
                ApproximateProductWeight: form.pregnancyControl.weight,
                TA: form.pregnancyControl.ta,
                FCM: form.pregnancyControl.fcm,
                Edema: form.pregnancyControl.edema,
                MadeUf: form.pregnancyControl.madeUf,
                Ultrasound: form.pregnancyControl.ultrasound,
                PhysicalExploration: form.exploration
            },
            BasicConsult: {
                Weight: form.weight,
                Size: form.size,
                Temperature: form.temperature,
                BloodPressure_A: form.bloodPressure_A,
                BloodPressure_B: form.bloodPressure_B,
                ReasonForConsultation: form.reasonForConsultation,
                PhysicalExploration: form.physicalExploration,
                PreventiveMeasures: form.preventiveMeasures,
                Observations: form.observations
            },
            PatientConsult: {
                PatientId: store.state.patient.id,
                Allergies: store.state.patient.allergies,
                Reserved: store.state.patient.reserved,
                RelevantPathologies: store.state.patient.relevantPathologies
            },
            Diagnostics: format.getArrayFormatToDiagnosticsAndTreatments(form.diagnostics),
            Treatments: format.getArrayFormatToDiagnosticsAndTreatments(form.treatments),
            CabinetStudies: format.getArrayFormatToCabinetAndLaboratory(form.cabinet),
            LaboratoryStudies: format.getArrayFormatToCabinetAndLaboratory(form.laboratory)
        }
    }
}