let currentLoader = null
import { onlyNumber } from '@/helper/utilities'
import { loader } from '@/helper/loader'
import api from '@/api/consult-service'
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
        eventBus.$on('save', () => this.save())
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
            reqResources.getAllDiagnostics(this.doctorId).then(response =>
                this.diagnostics = map.mapForDiagnosticsAndTreatments(response)
            )
            reqResources.getAllTreatments(this.doctorId).then(response => 
                this.treatments = map.mapForDiagnosticsAndTreatments(response)
            )
            reqResources.getLabStudies().then(response => 
                this.laboratory = map.mapForLabAndCabinet(response)
            )
            reqResources.getCabinetStudies().then(response => 
                this.cabinet = map.mapForLabAndCabinet(response)
            )
        },
        onlyDecimals(evt) {
            onlyNumber(evt, true)
        },
        save() {
            const req = new model(this.form)
            currentLoader = loader()

            api.saveConsult(this.doctorId, req.__$).then(response => {
                currentLoader.hide()
                saved('Consulta agregada', true)
                this.clear()
                eventBus.$emit('putInPreviewConsult')
            })
            .catch(_error => {
                currentLoader.hide()
            })
        },
        clear() {
            form.weight = null
            form.size = null
            form.temperature = null
            form.bloodPressure_a = null
            form.bloodPressure_b = null
            form.headCircuference = null
            form.heartRate = null
            form.breathingFrecuency = null
            form.reasonForConsultation = null
            form.physicalExploration = null
            form.preventiveMeasures = null
            form.observations = null
            form.diagnostics = []
            form.treatments = []
            form.laboratory = []
            form.cabinet = []
            form.prognostic = []
        }
    }
}