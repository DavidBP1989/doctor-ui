<template>
    <div v-if="consult != null">
        <b-row class="align-items-center">
            <b-col md="6" lg="8">
                <div class="mb-1">
                    <fa-icon class="mr-2" :icon="['fas', 'print']" size="lg" />
                    <b-link @click="print">Imprimir consulta</b-link>
                </div>
                <div>
                    <fa-icon class="mr-2" :icon="['fas', 'edit']" size="lg" />
                    <b-link @click="goToStudyReport">Editar reporte de estudios de gabinete y otros.</b-link>
                </div>
            </b-col>
            <b-col class="mt-2 mt-md-0" md="6" lg="4">
                <b-form-group class="mt-2 mt-md-0 nlegend" label="Buscar consulta">
                    <b-form-select v-model="selectedDate" :options="dates" @change="getConsult" />
                </b-form-group>
            </b-col>
        </b-row>
        <consult-view :consult="consult" />
    </div>
    <div class="p-4 text-center" v-else>
        <h5>No hay consultas previas por mostrar</h5>
    </div>
</template>

<script>
import api from '@/api/general-consult-service'
import { urlFileEmeci } from '@/helper/utilities'
import { windowPrint } from '@/helper/alerts'
import consultView from './consult.vue'
import $ from 'jquery'

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
            /*windowPrint({
                editPage: false,
                printConsult: true,
                printingType: 'general-consult',
                consultPreviousId: this.selectedDate
            })*/

            this.$store.commit('SET_HTML_PRINTCONFIG', $('.cprev').html())
            let routeData = this.$router.resolve({ name: 'imprimir', query: { data: 'hola'} })
            window.open(routeData.href, '_blank')
        }
    }
}
</script>