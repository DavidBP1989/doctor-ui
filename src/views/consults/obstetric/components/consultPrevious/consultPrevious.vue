<template>
    <div v-if="consult !== null">
        <b-row class="align-items-center">
            <b-col md="6" lg="8">
                <div class="mb-1">
                    <fa-icon class="mr-2" :icon="['fas', 'print']" size="lg" />
                    <b-link @click="print">Imprimir consulta</b-link>
                </div>
            </b-col>
            <b-col class="mt-2 mt-md-0" md="6" lg="4">
                <b-form-group class="nlegend" label="Buscar consulta">
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
import consultView from './consult.vue'
import api from '@/api/obstetric-consult-service'
import { windowPrint } from '@/helper/alerts'

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
        consultView
    },
    data() {
        return {
            dates: this.consultationDates,
            selectedDate: null,
            consult: null
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
        print() {
            windowPrint({
                editPage: false,
                printConsult: true,
                printingType: 'obstetric-consult',
                consultPreviousId: this.selectedDate
            })
        }
    }
}
</script>