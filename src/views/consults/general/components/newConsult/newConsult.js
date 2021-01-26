import { onlyNumber } from '@/helper/utilities'
import api from '@/api/consult-service'
import diagnostics from './components/diagnostics.vue'
import treatments from './components/treatments.vue'
import laboratory from './components/laboratory.vue'
import cabinet from './components/cabinet.vue'
import reqResources from './helper/reqResources'
import map from './helper/map'

export default {
    created() {
        this.getNecessaryResources()
    },
    components: {
        diagnostics,
        treatments,
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
                this.$store.commit('SET_CONSULTS_DIAGNOSTICS', map.mapForDiagnosticsAndTreatments(response))
            )
            reqResources.getAllTreatments(this.doctorId).then(response => 
                this.$store.commit('SET_CONSULTS_TREATMENTS', map.mapForDiagnosticsAndTreatments(response))
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

        }
    }
}