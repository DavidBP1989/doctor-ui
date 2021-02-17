let currentLoader = null
import { loader } from '@/helper/loader'
import { onlyNumber } from '@/helper/utilities'
import model from './helper/model'
import distocias from './components/distocias.vue'
import pregnancies from './components/pregnancies.vue'
import pregnancyControl from './components/pregnancyControl.vue'
import api from '@/api/consult-service'
import { saved } from '@/helper/alerts'
import eventBus from '@/helper/event-bus'

export default {
    created() {
        eventBus.$on('_calculeMothersWeight', () => this.calculeMothersWeight())
    },
    components: {
        distocias,
        pregnancies,
        pregnancyControl
    },
    data() {
        return {
            doctorId: this.$store.state.doctor.id,
            form: {
                weight: null,
                size: null,
                temperature: null,
                sexuallyActive: false,
                pregnancyNumber: 0,
                abortions: 0,
                bloodPressure_A: null,
                bloodPressure_B: null,
                lastParturitionDate: null,
                firstDayMenstruation: null,
                toxemias: false,
                specifyToxemias: null,
                parturition: 0,
                dystocia: {
                    type: 0,
                    specifyTpe: null,
                    reason: 0,
                    specifyReason: null
                },
                cesarean: 0,
                forceps: 0,
                stillbirths: 0,
                newBornAlive: 0,
                _pregnancies: {
                    ectopic: false,
                    specifyEctopic: null,
                    previous: false,
                    specifyPrevious: null,
                    perinatal: false,
                    specifyPerinatal: null,
                    abnormal: false,
                    specifyAbnormal: null
                },
                observations: null,
                pregnancyControl: {
                    fu: 0,
                    fcf: 0,
                    cc: 0,
                    ca: 0,
                    lf: 0,
                    dbp: 0,
                    position: null,
                    presentation: null,
                    situtation: null,
                    attitude: null,
                    fetalMovements: null,
                    weight: 0,
                    mothersWeight: null,
                    ta: 0,
                    fcm: 0,
                    edema: null,
                    madeUf: false,
                    ultrasound: null,
                    gestationWeek: null
                },
                reasonForConsultation: null,
                exploration: null
            },
            parturitionOptions: [
                { text: 'Eutócico', value: '0' },
                { text: 'Distocico', value: '1' }
            ]
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
        calculeGestationWeek() {
            if (this.form.firstDayMenstruation !== null) {

                const diffDays = this.$moment(new Date()).diff(this.form.firstDayMenstruation, 'days')

                if (diffDays > 0) {
                    const weeks = Math.floor(diffDays / 7)
                    const days = diffDays % 7
                    let s = ''
                    if (weeks > 0 && days > 0) s = `${weeks} semana(s) / ${days} día(s)`
                    else if (weeks > 0 && days <= 0) s = `${weeks} semana(s)`
                    else if (weeks <= 0 && days > 0) s = `${days} día(s)`

                    this.form.pregnancyControl.gestationWeek = s
                } else this.form.pregnancyControl.gestationWeek = null
            }
        },
        calculeMothersWeight() {
            this.form.pregnancyControl.mothersWeight = null

            if (!isNaN(this.form.weight) && !isNaN(this.form.pregnancyControl.weight)) {
                const weight = parseFloat(this.form.weight)
                const productWeight = parseFloat(this.form.pregnancyControl.weight)
                if (weight > 0 && productWeight > 0) {
                    this.form.pregnancyControl.mothersWeight = (weight - productWeight).toFixed(2)
                }
            }
        },
        saveConsult() {
            const req = new model(this.form)
            currentLoader = loader()

            let success = false
            api.saveConsultObstetric(this.doctorId, req.__$).then(() => {
                success = true
                currentLoader.hide()
                saved('Consulta agregada', true)
            })
            .catch(() => {
                currentLoader.hide()
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
            this.form.sexuallyActive = false
            this.form.pregnancyNumber = 0
            this.form.abortions = 0
            this.form.bloodPressure_A = null
            this.form.bloodPressure_B = null
            this.form.lastParturitionDate = null
            this.form.firstDayMenstruation = null
            this.form.toxemias = false
            this.form.specifyToxemias = null
            this.form.parturition = 0
            this.form.dystocia.type = 0
            this.form.dystocia.specifyTpe = null
            this.form.dystocia.reason = 0
            this.form.dystocia.specifyReason = null
            this.form.cesarean = 0
            this.form.forceps = 0
            this.form.stillbirths = 0
            this.form.newBornAlive = 0
            this.form._pregnancies.ectopic = false
            this.form._pregnancies.specifyEctopic = null
            this.form._pregnancies.previous = false
            this.form._pregnancies.specifyPrevious = null
            this.form._pregnancies.perinatal = false
            this.form._pregnancies.specifyPerinatal = null
            this.form._pregnancies.abnormal = false
            this.form._pregnancies.specifyAbnormal = null
            this.form.observations = null
            this.form.pregnancyControl.fu = 0
            this.form.pregnancyControl.fcf = 0
            this.form.pregnancyControl.cc = 0
            this.form.pregnancyControl.ca = 0
            this.form.pregnancyControl.lf = 0
            this.form.pregnancyControl.dbp = 0
            this.form.pregnancyControl.position = null
            this.form.pregnancyControl.presentation = null
            this.form.pregnancyControl.situtation = null
            this.form.pregnancyControl.attitude = null
            this.form.pregnancyControl.fetalMovements = null
            this.form.pregnancyControl.weight = 0
            this.form.pregnancyControl.mothersWeight = null
            this.form.pregnancyControl.ta = 0
            this.form.pregnancyControl.fcm = 0
            this.form.pregnancyControl.edema = null
            this.form.pregnancyControl.madeUf = false
            this.form.pregnancyControl.ultrasound = null
            this.form.pregnancyControl.gestationWeek = null
            this.form.reasonForConsultation = null
            this.form.exploration = null
        }
    }
}