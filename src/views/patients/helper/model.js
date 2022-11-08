import Vue from 'vue'

export default class model {
    constructor(form) {
        this.__$ = {
            Name: form.name,
            LastName: form.lastName,
            MothersName: form.mothersName,
            FathersName: form.fathersName,
            Phone: form.phone,
            Sex: form.sex,
            Emails: form.email,
            BirthDate: Vue.moment(form.birthDate).format('YYYY-MM-DD'),
            Allergy: form.allergy,
            ContagiousDiseases: form.contagiousDiseases,
            Surgeries: form.surgeries,
            Trauma: form.trauma,
            Other: form.other,
            Alcohol: form.alcohol,
            Tobacco: form.tobacco,
            Drugs: form.drugs,
            Password: form.password,
            ExternalRegister: form.externalRegister
        }
    }
}