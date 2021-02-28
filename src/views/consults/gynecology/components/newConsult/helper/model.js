import store from '@/store/store'
import Vue from 'vue'

export default class model {
    constructor(form) {
        this.__$ = {
            BasicConsult: {
                Weight: form.weight,
                Size: form.size,
                Temperature: form.temperature,
                BloodPressure_A: form.bloodPressure_A,
                BloodPressure_B: form.bloodPressure_B,
                ReasonForConsultation: form.reasonForConsultation
            },
            PatientConsult: {
                PatientId: store.state.patient.id,
                Allergies: store.state.patient.allergies,
                Reserved: store.state.patient.reserved,
                RelevantPathologies: store.state.patient.relevantPathologies
            },
            MenarcaAge: form.menarcaAge,
            LastMenstruationDate: form.lastMenstruationDate !== null
            ? Vue.moment(form.lastMenstruationDate).format('YYYY-MM-DD') : null,        
            Gestas: form.gestas,
            Paragestas: form.paragestas,
            Cesareans: form.cesareans,
            Abortions: form.abortions,
            NewlyBorn: form.newlyBorn,
            Stillbirth: form.stillbirth,
            AgeOfOnsetOfActiveSexualLife: form.ageOfOnsetOfActiveSexualLife,
            Menacma: form.menacma,
            Checkbox: {
                Oligomenorrea: form.options[0].value,
                Proiomenorrea: form.options[1].value,
                Hipermenorrea: form.options[2].value,
                Dismenorrea: form.options[3].value,
                Dispareunia: form.options[4].value,
                Leucorrea: form.options[5].value,
                Lactorrea: form.options[6].value,
                Amenorrea: form.options[7].value,
                Metrorragia: form.options[8].value,
                Others: form.options[9].value
            },
            SpecifyOthers: form.specifyOthers,
            Partner: {
                HasAPartner: form.partner.hasAPartner,
                Name: form.partner.name,
                Sex: form.partner.sex,
                MaritalStatus: form.partner.maritalStatus,
                GroupRH: form.partner.groupRH,
                BirthDate: form.partner.birthDate !== null
                ? Vue.moment(form.partner.birthDate).format('YYYY-MM-DD') : null,
                Age: form.partner.age,
                Occupation: form.partner.occupation,
                Phone: form.partner.phone
            }
        }
    }
}