import api from '@/api/general-consult-service'
import { urlFileEmeci } from '@/helper/utilities'
import { windowPrint } from '@/helper/alerts'
import consultView from './consult.vue'

export default {
    mounted() {
        this.$watch('consultationDates', newDate => {
            this.dates = newDate
            this.init()
        })
    },
    created() {
        if (this.dates.length > 0) this.init()
    },
    props: {
        consultationDates: {
            type: Array,
            required: true
        }
    },
    components: {
        consultView
    },
    data() {
        return {
            dates: this.consultationDates,
            selectedDate: null,
            consult: null
        }
    },
    computed: {
        mass() {
            return this.consult.BasicConsult.Mass > 0 ? 
            this.consult.BasicConsult.Mass.toFixed(2) :
            this.consult.BasicConsult.Mass
        }
    },
    methods: {
        init() {
            if (this.dates.length > 0) {
                this.selectedDate = this.dates[0].value
                this.getConsult()
            }
        },
        getConsult() {
            api.getConsultById(this.selectedDate).then(response => {
                this.consult = response.body
            })
        },
        goToStudyReport() {
            window.open(`${urlFileEmeci}?opt=EST&emeci=${this.$store.state.patient.emeci}&posicion=${this.$store.state.patient.coordinate}&dato=${this.$store.state.patient.coordinateValue}`)
        },
        print() {
            windowPrint({
                editPage: false,
                printConsult: true,
                consultPreviousId: this.selectedDate
            })
        }
    }
}