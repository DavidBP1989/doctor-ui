import api from '@/api/obstetric-consult-service'
import map from './helper/map'
import pregnancies from './components/pregnancies.vue'
import pregnancyControl from './components/pregnancyControl.vue'

export default {
    mounted() {
        this.$watch('consultationDates', newDate => {
            this.dates = newDate
            this.init()
        })
    },
    props: {
        consultationDates: {
            required: true,
            type: Array
        }
    },
    components: {
        pregnancies,
        pregnancyControl
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
            this.consult.BasicConsult.Mass.toFixed(2) : this.consult.BasicConsult.Mass
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
        getDateFormat(date) {
            if (date !== null)
                return this.$moment(date).format('D MMMM YYYY')
            else return '---'
        },
        getParturitionType(type) {
            return map.getParturitionType(type)
        },
        getDistociaType(type) {
            return map.getDistociaType(type)
        },
        getDistociaReason(type) {
            return map.getDistociaReason(type)
        }
    }
}