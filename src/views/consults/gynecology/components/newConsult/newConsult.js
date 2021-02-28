let currentLoader = null
import { loader } from '@/helper/loader'
import { onlyNumber } from '@/helper/utilities'
import partner from './components/partner.vue'
import model from './helper/model'
import api from '@/api/gynecology-consult-service'
import { saved } from '@/helper/alerts'
import eventBus from '@/helper/event-bus'

export default {
    components: {
        partner
    },
    data() {
        return {
            doctorId: this.$store.state.doctor.id,
            form: {
                weight: null,
                size: null,
                temperature: null,
                menarcaAge: null,
                bloodPressure_A: null,
                bloodPressure_B: null,
                lastMenstruationDate: null,
                gestas: 0,
                paragestas: 0,
                cesareans: 0,
                abortions: 0,
                newlyBorn: 0,
                stillbirth: 0,
                ageOfOnsetOfActiveSexualLife: null,
                menacma: null,
                options: [
                    { text: 'Oligomenorrea', value: false },
                    { text: 'Proiomenorrea', value: false },
                    { text: 'Hipermenorrea', value: false },
                    { text: 'Dismenorrea', value: false },
                    { text: 'Dispareunia', value: false },
                    { text: 'Leucorrea', value: false },
                    { text: 'Lactorrea', value: false },
                    { text: 'Amenorrea', value: false },
                    { text: 'Metrorragia', value: false },
                    { text: 'Otros', value: false }
                ],
                specifyOthers: null,
                partner: {
                    hasAPartner: false,
                    name: null,
                    sex: 'M',
                    maritalStatus: 0,
                    groupRH: null,
                    birthDate: null,
                    age: null,
                    occupation: null,
                    phone: null
                },
                reasonForConsultation: null
            }
        }
    },
    computed: {
        mass() {
            if (!isNaN(this.form.weight) && !isNaN(this.form.size)) {
                const size = parseFloat(this.form.size)
                const weight = parseFloat(this.form.weight)
                if (size > 0 && weight > 0) {
                    return (weight / (size * size)).toFixed(2)
                }
            }
            return ''
        }
    },
    methods: {
        onlyDecimals(evt) {
            onlyNumber(evt, true)
        },
        numberFormat(evt) {
            onlyNumber(evt, false)
        },
        saveConsult() {
            const req = new model(this.form)
            currentLoader = loader()

            let success = false
            api.saveConsult(this.doctorId, req.__$).then((response) => {
                success = response.body.IsSuccess
                currentLoader.hide()
                const title = success ? 'Consulta agregada' : 'Error al confirmar la consulta'
                saved(title, success)
            })
            .catch(() => {
                currentLoader.hide()
                saved('Error al confirmar la consulta', false)
            })
            .finally(() => {
                if (success) {
                    this.clear()
                    eventBus.$emit('putInPreviewObstetricConsult')
                }
            })
        },
        clear() {
            this.form.weight = null
            this.form.size = null
            this.form.temperature = null
            this.form.menarcaAge = null
            this.form.bloodPressure_A = null
            this.form.bloodPressure_B = null
            this.form.lastMenstruationDate = null
            this.form.gestas = 0
            this.form.paragestas = 0
            this.form.cesareans = 0
            this.form.abortions = 0
            this.form.newlyBorn = 0
            this.form.stillbirth = 0
            this.form.ageOfOnsetOfActiveSexualLife = null
            this.form.menacma = null
            
            this.form.options.forEach(x => {
                x.value = false
            })

            this.form.specifyOthers = null
            this.form.partner.hasAPartner = false
            this.form.partner.name = null
            this.form.partner.sex = 'M'
            this.form.partner.maritalStatus = 0
            this.form.partner.groupRH = null
            this.form.partner.birthDate = null
            this.form.partner.age = null
            this.form.partner.occupation = null
            this.form.partner.phone = null
            this.form.reasonForConsultation = null
        }
    }
}