let currentLoader = null
import { loader } from '@/helper/loader'
import { onlyNumber } from '@/helper/utilities'
import model from './helper/model'
import distocias from './components/distocias.vue'
import pregnancies from './components/pregnancies.vue'
import pregnancyControl from './components/pregnancyControl.vue'
import api from '@/api/obstetric-consult-service'
import { saved } from '@/helper/alerts'
import eventBus from '@/helper/event-bus'
import operations from '../../helper/operations'
import diagnostics from '../../../shared/components/diagnostics.vue'
import treatments from '../../../shared/components/treatments.vue'
import addedItems from '../../../shared/addedItems.vue'
import laboratory from '../../../shared/components/laboratory.vue'
import cabinet from '../../../shared/components/cabinet.vue'
import reqResources from '../../../helper/reqResources'
import map from '../../../helper/map'

export default {
    created() {
        this.getNecessaryResources()
    },
    components: {
        distocias,
        pregnancies,
        pregnancyControl,
        diagnostics,
        treatments,
        addedItems,
        laboratory,
        cabinet
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
                    gestationWeek: null,
                    estimatedDueDate: null
                },
                reasonForConsultation: null,
                physicalExploration: null,
                preventiveMeasures: null,
                observations: null,
                diagnostics: [],
                treatments: [],
                laboratory: [],
                cabinet: []
            },
            parturitionOptions: [
                { text: 'Eutócico', value: '0' },
                { text: 'Distocico', value: '1' }
            ],
            diagnostics: [],
            treatments: [],
            laboratory: [],
            cabinet: []
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
        getNecessaryResources() {
            currentLoader = loader()
            Promise.all([
                reqResources.getAllDiagnostics(this.doctorId).then(response =>
                    this.diagnostics = map.mapForDiagnosticsAndTreatments(response)
                ),
                reqResources.getAllTreatments(this.doctorId).then(response => 
                    this.treatments = map.mapForDiagnosticsAndTreatments(response)
                ),
                reqResources.getLabStudies().then(response => 
                    this.laboratory = map.mapForLabAndCabinet(response)
                ),
                reqResources.getCabinetStudies().then(response => 
                    this.cabinet = map.mapForLabAndCabinet(response)
                )
            ]).then(() => {
                currentLoader.hide()
            }).catch(() => {
                currentLoader.hide()
            })
        },
        onlyDecimals(evt) {
            onlyNumber(evt, true)
        },
        numberFormat(evt) {
            onlyNumber(evt, false)
        },
        firstDayMenstruationSelected() {
            if (this.form.firstDayMenstruation !== null) {
                this.form.pregnancyControl.gestationWeek = operations.calculeGestationWeek(this.form.firstDayMenstruation)
                this.form.pregnancyControl.estimatedDueDate = operations.estimatedDueDate(this.form.firstDayMenstruation)
            }   
        },
        calculeMothersWeight() {
            this.form.pregnancyControl.mothersWeight = null
            this.form.pregnancyControl.mothersWeight = operations.calculeMothersWeight(
                this.form.weight,
                this.form.pregnancyControl.weight
            )
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
            this.form.reasonForConsultation = null
            this.form.physicalExploration = null,
            this.form.preventiveMeasures = null,
            this.form.observations = null,
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
            this.form.exploration = null
            this.form.diagnostics = []
            this.form.treatments = []
            this.form.laboratory = []
            this.form.cabinet = []
        }
    }
}