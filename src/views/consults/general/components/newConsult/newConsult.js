let currentLoader = null
import { onlyNumber } from '@/helper/utilities'
import { loader } from '@/helper/loader'
import api from '@/api/general-consult-service'
import diagnostics from './components/diagnostics.vue'
import treatments from './components/treatments.vue'
import addedItems from './shared/addedItems.vue'
import laboratory from './components/laboratory.vue'
import cabinet from './components/cabinet.vue'
import prognostic from './components/prognostics.vue'
import reqResources from './helper/reqResources'
import map from './helper/map'
import model from './helper/model'
import { saved } from '@/helper/alerts'
import eventBus from '@/helper/event-bus'
import iFrame from '@/shared/i-frame.vue'

export default {
    created() {
        this.getNecessaryResources()
        eventBus.$on('save', () => this.saveConsult())
    },
    components: {
        diagnostics,
        treatments,
        addedItems,
        laboratory,
        cabinet,
        prognostic,
        iFrame
    },
    data() {
        return {
            doctorId: this.$store.state.doctor.id,
            form: {
                weight: null,
                size: null,
                temperature: null,
                bloodPressure_a: null,
                bloodPressure_b: null,
                headCircuference: null,
                heartRate: null,
                breathingFrecuency: null,
                reasonForConsultation: null,
                physicalExploration: null,
                preventiveMeasures: null,
                observations: null,
                diagnostics: [],
                treatments: [],
                laboratory: [],
                cabinet: [],
                prognostic: []
            },
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
            .catch(_error => {
                currentLoader.hide()
                saved('Error al confirmar la consulta', false)
            })
            .finally(() => {
                if (success) {
                    this.clear()
                    eventBus.$emit('putInPreviewConsult')
                }
            })
        },
        clear() {
            this.form.weight = null
            this.form.size = null
            this.form.temperature = null
            this.form.bloodPressure_a = null
            this.form.bloodPressure_b = null
            this.form.headCircuference = null
            this.form.heartRate = null
            this.form.breathingFrecuency = null
            this.form.reasonForConsultation = null
            this.form.physicalExploration = null
            this.form.preventiveMeasures = null
            this.form.observations = null
            this.form.diagnostics = []
            this.form.treatments = []
            this.form.laboratory = []
            this.form.cabinet = []
            this.form.prognostic = []
        }
    }
}